const jwt = require("jsonwebtoken");
const { ERROR_MESSAGES } = require("../constants/errors");

const requireAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ message: ERROR_MESSAGES.NOT_AUTHETICATED });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: ERROR_MESSAGES.INVALID_TOKEN });
  }
};

module.exports = requireAuth;
