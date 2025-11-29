import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// ✅ SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, profession } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const defaultPic =
      "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profession,
      profilePic: defaultPic,
    });

    res.json({
      message: "Signup successful",
      user: {
        name: user.name,
        email: user.email,
        profession: user.profession,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        profession: user.profession,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// ✅ DELETE ALL USERS (for testing purposes) and also temporary

router.delete("/delete-all-users", async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: "All users deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;