
import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check for a Bearer token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication token required",
      });
    }

    // Extract the actual JWT
    const tok = authHeader.split(" ")[1];

    // Verify signature and expiration
    const decoded = jwt.verify(tok, process.env.JWT_SECRET);

    // Make the authenticated user's ID available to controllers
    req.userId = decoded.userId;

    return next();
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default isAuth;
