import { Request, Response } from "express";
import User, { userValidation } from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import nodemailer from "nodemailer";
 
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const sendEmail = async () => {
  const email = "ahalhdad2023@gmail.com";
  const password = "ahmed#$secur";
  const transporter = nodemailer.createTransport({
    service: "gmail", // أو تقدر تستخدم host و port بدلاً من service
    auth: {
      user: email,
      pass: password, // أو App Password لو Gmail
    },
  });

  const mailOptions = {
    from: email,
    to: email,
    subject: "مرحبا من Nodemailer 🚀",
    text: "دي رسالة تجريبية من Nodemailer.",
    html: "<h2>دي رسالة تجريبية <b>بـ HTML</b></h2>",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("حدث خطأ:", error);
    } else {
      console.log("تم إرسال الرسالة:", info.response);
    }
  });
};
export const register = async (req: Request, res: Response) => {
  try {
    const { error, value } = userValidation.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e: any) => e.message) });
    }

    const existing = await User.findOne({ email: value.email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);
    const created = await User.create({ ...value, password: hashedPassword });
    return res.status(201).json({ user: created });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Failed to register", error: err.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    sendEmail()
    const allUsers = await User.find({});
    return res.status(200).json({ users: allUsers });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

export const logIn = async (req: Request, res: Response) => {
  // Implement login logic here
  res.status(501).json({ message: "Login not implemented yet" });
};

// Google:
export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).json({ error: "Invalid Google token payload" });
    }
    const { sub, email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        googleId: sub,
        name,
        email,
        avatar: picture,
      });
    }

    // You need to implement generateToken or use jwt.sign directly
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Google login successful",
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: "Invalid Google token" });
  }
};

export const googleAuth = async (req: Request, res: Response) => {
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
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );
    return res.status(200).json({ token, user });
  } catch (err: any) {
    return res
      .status(401)
      .json({ message: "Google authentication failed", error: err.message });
  }
};
