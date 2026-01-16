const bcrypt = require("bcrypt");
const crypto = require("crypto");
const prisma = require("../config/prisma");
const ApiError = require("../utils/apiError");
const { hashPassword } = require("../utils/password");
const mailer = require("../utils/mailer");
const { isValidRole } = require("../utils/roles");

const parseMinutes = (value, fallback) => {
  const minutes = parseInt(value, 10);
  return Number.isFinite(minutes) && minutes > 0 ? minutes : fallback;
};

const OTP_TTL_MIN = parseMinutes(process.env.RESET_OTP_TTL_MIN, 5);
const RESET_LINK_TTL_MIN = parseMinutes(process.env.RESET_LINK_TTL_MIN, 10);
const APP_BASE_URL = process.env.APP_BASE_URL;
const RESET_PATH = process.env.RESET_PATH || "/reset-password";
const RESET_TOKEN_SECRET = process.env.RESET_TOKEN_SECRET || "";

const GENERIC_MESSAGE =
  "If the account exists, you will receive an email with further instructions.";

const now = () => new Date();

const buildResetUrl = (token) => {
  if (!APP_BASE_URL) {
    throw new ApiError(500, "APP_BASE_URL is not configured");
  }

  const normalizedPath = RESET_PATH.startsWith("/")
    ? RESET_PATH
    : `/${RESET_PATH}`;

  return `${APP_BASE_URL}${normalizedPath}?token=${token}`;
};

const hashResetToken = (token) =>
  crypto.createHash("sha256").update(`${token}${RESET_TOKEN_SECRET}`).digest("hex");

const validateRolePayload = (role) => {
  if (!role) {
    throw new ApiError(400, "role is required");
  }
  if (!isValidRole(role)) {
    throw new ApiError(400, "Invalid role. Use Doctor, Patient, or Admin");
  }
};

exports.requestPasswordReset = async ({ email, role }) => {
  if (!email) {
    throw new ApiError(400, "email is required");
  }
  validateRolePayload(role);

  const user = await prisma.userCredentials.findFirst({
    where: { email, role },
  });

  if (!user) {
    return { message: GENERIC_MESSAGE };
  }

  const otp = crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");
  const otp_hash = await bcrypt.hash(otp, 10);
  const otp_expires_at = new Date(now().getTime() + OTP_TTL_MIN * 60 * 1000);

  await prisma.passwordReset.create({
    data: {
      user_id: user.user_id,
      otp_hash,
      otp_expires_at,
    },
  });

  await mailer.sendMail({
    to: user.email,
    subject: "Your RehabEdge password reset code",
    text: `Use the following OTP to reset your password: ${otp}\n\nThis code expires in ${OTP_TTL_MIN} minutes.`,
  });

  return { message: GENERIC_MESSAGE };
};

exports.verifyOtp = async ({ email, role, otp }) => {
  if (!email || !otp) {
    throw new ApiError(400, "email and otp are required");
  }
  validateRolePayload(role);

  const user = await prisma.userCredentials.findFirst({
    where: { email, role },
  });

  if (!user) {
    return { message: GENERIC_MESSAGE };
  }

  const resetRecord = await prisma.passwordReset.findFirst({
    where: { user_id: user.user_id },
    orderBy: { created_at: "desc" },
  });

  if (!resetRecord) {
    return { message: GENERIC_MESSAGE };
  }

  if (resetRecord.otp_verified_at || resetRecord.reset_token_hash) {
    return { message: GENERIC_MESSAGE };
  }

  const currentTime = now();

  if (resetRecord.otp_attempts >= 5 || resetRecord.otp_expires_at <= currentTime) {
    return { message: GENERIC_MESSAGE };
  }

  const otpMatch = await bcrypt.compare(otp, resetRecord.otp_hash);

  if (!otpMatch) {
    await prisma.passwordReset.update({
      where: { id: resetRecord.id },
      data: { otp_attempts: { increment: 1 } },
    });
    return { message: GENERIC_MESSAGE };
  }

  const token = crypto.randomBytes(48).toString("hex");
  const reset_token_hash = hashResetToken(token);
  const reset_expires_at = new Date(
    currentTime.getTime() + RESET_LINK_TTL_MIN * 60 * 1000
  );

  await prisma.passwordReset.update({
    where: { id: resetRecord.id },
    data: {
      otp_verified_at: currentTime,
      reset_token_hash,
      reset_expires_at,
    },
  });

  const resetUrl = buildResetUrl(token);

  await mailer.sendMail({
    to: user.email,
    subject: "Reset your RehabEdge password",
    text: `Use the following link to reset your password: ${resetUrl}\n\nThis link expires in ${RESET_LINK_TTL_MIN} minutes.`,
  });

  return { message: GENERIC_MESSAGE };
};

exports.resetPassword = async ({ token, newPassword }) => {
  if (!token || !newPassword) {
    throw new ApiError(400, "token and newPassword are required");
  }
  if (newPassword.length < 8) {
    throw new ApiError(400, "Password must be at least 8 characters");
  }

  const hashedToken = hashResetToken(token);

  const resetRecord = await prisma.passwordReset.findFirst({
    where: { reset_token_hash: hashedToken },
  });

  if (
    !resetRecord ||
    !resetRecord.reset_expires_at ||
    resetRecord.reset_expires_at <= now() ||
    !resetRecord.otp_verified_at
  ) {
    throw new ApiError(400, "Invalid or expired reset token");
  }

  const password_hash = await hashPassword(newPassword);

  await prisma.$transaction([
    prisma.userCredentials.update({
      where: { user_id: resetRecord.user_id },
      data: { password_hash },
    }),
    prisma.passwordReset.update({
      where: { id: resetRecord.id },
      data: {
        reset_token_hash: null,
        reset_expires_at: null,
      },
    }),
  ]);

  return { message: "Password has been reset successfully." };
};
