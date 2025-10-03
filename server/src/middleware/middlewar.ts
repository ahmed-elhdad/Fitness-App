import { Response, Request } from "express";
import jwt from "jsonwebtoken";

// Express middleware to require a valid JWT for protected routes
// Looks for a token in the Authorization header (Bearer) or a 'token' cookie
export default function requireAuth(
  req: Request,
  res: Response,
  next: Function
) {
  try {
    const authHeader = req.headers?.authorization || "";
    const bearerPrefix = "Bearer ";

    let token = null;
    if (authHeader.startsWith(bearerPrefix)) {
      token = authHeader.slice(bearerPrefix.length).trim();
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: "Authentication token missing" });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res
        .status(500)
        .json({ message: "Server misconfiguration: JWT secret not set" });
    }

    const decoded = jwt.verify(token, jwtSecret);
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
