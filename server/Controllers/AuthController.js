import User from "../Models/userModel.js";
import { gettoken } from "../token.js";

export const GoogleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email });
    }

    const token = gettoken(user._id);

    return res.status(200).json({
      message: "Successful",
      token,
      user:user.toObject()
    });
  } catch (e) {
    console.error("GoogleAuth error:", e);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};