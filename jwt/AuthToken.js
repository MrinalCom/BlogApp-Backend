import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const createTokenAndSaveCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: isProduction, // Secure only in production
    sameSite: isProduction ? "none" : "lax", // Required for cross-origin HTTPS
    path: "/",
  });
  await User.findByIdAndUpdate(userId, { token });
  return token;
};

export default createTokenAndSaveCookies;
