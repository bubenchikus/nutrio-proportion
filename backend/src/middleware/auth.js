import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  const token = (req.headers.authentication || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
      next();
    } catch (err) {
      return res.status(403).json({ msg: "No access (verification failed)!" });
    }
  } else {
    return res.status(403).json({ msg: "No access!" });
  }
};
