import connectDB from "./config/db";
import express, { Request, Response } from "express";
import { google } from "googleapis";
import authRoutes from "./routes/authRoutes";
import chalengeRoutes from "./routes/chalengeRoutes";
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript Backend 🚀");
});
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/api/auth/callback"
);
app.use("/api/auth", authRoutes);
// app.use("/api/users", freindsRoutes);
// app.use("/api/chalenges", chalengeRoutes);
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
