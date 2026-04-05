// JWT token verification
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Verify JWT token
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized. No token." });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found." });
    if (user.status === "pending") {
      return res
        .status(403)
        .json({ message: "Account pending admin approval." });
    }
    if (user.status === "suspended") {
      return res.status(403).json({ message: "Account suspended." });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalid or expired." });
  }
};

// Role check middleware — use after protect
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Required role: ${roles.join(" or ")}`,
      });
    }
    next();
  };
};
