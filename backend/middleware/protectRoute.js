import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized person" });
    }

    // Verify the token and get the decoded payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // If there's no valid decoded token, return an error (This part isn't needed as jwt.verify will throw an error if the token is invalid)
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized person" });
    }

    // Find the user by ID from the decoded token
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach the user to the request object for use in other middleware/routes
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
