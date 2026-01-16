const ApiError = require("../utils/apiError");
const { verifyToken } = require("../utils/jwt");

module.exports = (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
      throw new ApiError(401, "Missing or invalid Authorization header");
    }

    const decoded = verifyToken(token);
    // decoded should contain { user_id, role, iat, exp }
    req.user = { user_id: decoded.user_id, role: decoded.role };

    return next();
  } catch (err) {
    return next(new ApiError(401, "Invalid or expired token"));
  }
};
