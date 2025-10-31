import { Request, Response } from "express";
import User, { userValidation } from "../models/user";
import bcrypt from "bcryptjs";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { JWT, OAuth2Client } from "google-auth-library";
import nodemailer from "nodemailer";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const verifyEmail = async (req:Request,res:Response) => {
  // sendEmail(`Your code is ${randomNumber} do n't share with`, "verify");
}
export const sendEmail = async (txt: string, type: string,to:string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // أو تقدر تستخدم host و port بدلاً من service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // أو App Password لو Gmail
    },
  });
  let html = "";
  if (type == "warning") {
    html = `
<div style="max-width: 500px; margin: auto; padding: 20px; background-color: #f9f9f9; 
            border: 1px solid #ddd; border-radius: 10px; font-family: Arial, sans-serif; 
            color: #333; text-align: center;">

  <h2 style="color: #4CAF50; font-size: 24px; margin-bottom: 15px;">
    Fitness Tracker
  </h2>

  <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
    ${txt}
  </p>

  <button style="background-color: #4CAF50; color: white; padding: 10px 20px; 
                 border: none; border-radius: 6px; cursor: pointer; font-size: 16px;">
    arenot you
  </button>

  <span style="display: block; margin-top: 20px; font-size: 13px; color: #777;">
    This message has been sent to check if you know about this operation.
  </span>
</div>
`;

}if(type=="verify-email"){
    const code = Math.floor(1000 + Math.random() * 9000);
    html = `<div><h2>Fitness Tracker</h2><p>${txt}</p><center>${code}</center><button>arenot you</button><span>if you don't know about this operation <a href=''>change password</a></span></div>`;
  }
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: "Fitness Tracker",
    text: txt,
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error: ", error);
    } else {
      console.log("send Successfully:", info.response);
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
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);
    const created = await User.create({ ...value, password: hashedPassword });
     const token = jwt.sign(
       { email: value.email, password: value.password },
       process.env.JWT_SECRET,
       { expiresIn: "1h" }
     );
    return res.status(201).json({ user: created,jwt:token });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Failed to register", error: err.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    verifyEmail;
    const allUsers = await User.find({});
    return res.status(200).json({ users: allUsers });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};
export const logIn = async (req: Request, res: Response) => {
  const {email,password} = await req.body
  if (email == ''){
    res.status(501).json({error:"Valid Name"})
    return
  }
  const exit = User.findOne({email:email})
  if (!exit) {
    res.status(404).json({error:"User not exit try to sign up"})
    return
  }
  if (password == "") {
    res.status(404).json({message:"valid Password"})
    return
  }
  const checkPassword=bcrypt.compare(password,(await exit).password)
  if (!await checkPassword){
    res.status(400).json({message:"Valid data Error"})
    return
  }
  const token = jwt.sign(
      {email: email, password: password },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  res.status(202).json({ message: "Login implemented",jwt:token });
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
