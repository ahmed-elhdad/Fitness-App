import connectDB from "./config/db";
import express, { Request, Response } from "express";
// Enable Swagger JS
import { swaggerUi, swaggerSpec } from "./swagger.js";
import { google } from "googleapis";
import authRoutes from "./routes/authRoutes";
import chalengeRoutes from "./routes/chalengeRoutes";
const app = express();
import dotenv from "dotenv";
dotenv.config({path:".env.local"});
const PORT = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript Backend 🚀");
});
// Setup Swagger JS

dotenv.config();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger Docs متاحة على http://localhost:5000/api-docs");
}

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.BASE_URL}/api/auth/callback`
);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/chalenges", chalengeRoutes);
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




