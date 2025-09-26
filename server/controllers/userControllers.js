import User, { userValidation } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import user from "../models/user.js";
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = async (req, res) => {
  try {
    const { error, value } = userValidation.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    const existing = await User.findOne({ email: value.email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);
    const created = await User.create({ ...value, password: hashedPassword });
    return res.status(201).json({ user: created });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to register", error: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    return res.status(200).json({ users: allUsers });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};
export const logIn = async (req, res) => {};
// Google:
export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    // تحقق من التوكن
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      // لو المستخدم مش موجود → اعمله حساب جديد
      user = await User.create({
        googleId: sub,
        name,
        email,
        avatar: picture,
      });
    }

    const jwtToken = generateToken(user);

    res.json({
      message: "Google login successful",
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid Google token" });
  }
};
export const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ message: "idToken is required" });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload?.email;
    const name = payload?.name || email?.split("@")[0] || "Google User";
    if (!email) {
      return res
        .status(400)
        .json({ message: "Email not found in Google token" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      const hashedPassword = await bcrypt.hash(`${email}-${Date.now()}`, 10);
      user = await User.create({ name, email, password: hashedPassword });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return res.status(200).json({ token, user });
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Google authentication failed", error: err.message });
  }
};
// Aplle:
export const appleLogIn = async (req, res) => {};
export const appleAuth = async (req, res) => {
  try {
  } catch (error) {}
};
