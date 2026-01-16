const authService = require("../services/auth.service");
const passwordResetService = require("../services/passwordReset.service");

exports.register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const result = await passwordResetService.requestPasswordReset(req.body);
    res.status(200).json({ success: true, message: result.message });
  } catch (err) {
    next(err);
  }
};

exports.verifyOtp = async (req, res, next) => {
  try {
    const result = await passwordResetService.verifyOtp(req.body);
    res.status(200).json({ success: true, message: result.message });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const result = await passwordResetService.resetPassword(req.body);
    res.status(200).json({ success: true, message: result.message });
  } catch (err) {
    next(err);
  }
};

