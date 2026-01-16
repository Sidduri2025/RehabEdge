
const prisma = require("../config/prisma");
const ApiError = require("../utils/apiError");
const { hashPassword, verifyPassword } = require("../utils/password");
const { signToken } = require("../utils/jwt");
const { isValidRole } = require("../utils/roles");

exports.register = async (payload) => {
  const { email, password, role, profile } = payload;

  if (!email || !password || !role) {
    throw new ApiError(400, "email, password, role are required");
  }
  if (!isValidRole(role)) {
    throw new ApiError(400, "Invalid role. Use Doctor, Patient, or Admin");
  }
  if (password.length < 8) {
    throw new ApiError(400, "Password must be at least 8 characters");
  }

  const existing = await prisma.userCredentials.findUnique({ where: { email } });
  if (existing) throw new ApiError(409, "Email already exists");

  const password_hash = await hashPassword(password);

  // Create user
  const user = await prisma.userCredentials.create({
    data: {
      email,
      password_hash,
      role,
      mfa_enabled: role === "Doctor" || role === "Admin"
    },
  });

  // Create role profile (Doctor or Patient)
  if (role === "Doctor") {
    if (!profile?.name || !profile?.specialization || profile?.experience_years == null || !profile?.availability) {
      throw new ApiError(400, "Doctor profile fields required: name, specialization, experience_years, availability");
    }
    await prisma.doctor.create({
      data: {
        user_id: user.user_id,
        name: profile.name,
        specialization: profile.specialization,
        experience_years: profile.experience_years,
        availability: profile.availability,
      },
    });
  }

  if (role === "Patient") {
    if (!profile?.name || !profile?.date_of_birth) {
      throw new ApiError(
        400,
        "Patient profile fields required: name, date_of_birth"
      );
    }

    await prisma.patient.create({
      data: {
        user_id: user.user_id,
        name: profile.name,
        date_of_birth: new Date(profile.date_of_birth),
        contact: profile.contact || null,
        assigned_doctor_id: null, // explicitly unassigned
        reminder_preference: profile.reminder_preference || "Daily",
      },
    });
  }


  // Token payload
  const token = signToken({ user_id: user.user_id, role: user.role });

  return { user_id: user.user_id, email: user.email, role: user.role, token };
};

exports.login = async ({ email, password, role }) => {
  if (!email || !password || !role) {
    throw new ApiError(400, "email, password, and role are required");
  }

  const user = await prisma.userCredentials.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  // ROLE CHECK
  if (user.role !== role) {
    throw new ApiError(
      403,
      `Access denied for role ${role}`
    );
  }

  const ok = await verifyPassword(password, user.password_hash);
  if (!ok) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = signToken({
    user_id: user.user_id,
    role: user.role,
  });

  return {
    user_id: user.user_id,
    email: user.email,
    role: user.role,
    token,
  };
};

'
