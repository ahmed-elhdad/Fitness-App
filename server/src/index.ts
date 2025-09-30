import express, { Request, Response } from "express";
import { google } from "googleapis";

const app = express();
const PORT = 5000;
import connectDb from "./config/db"
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript Backend 🚀");
});

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/api/auth/callback" // Redirect URI
);

// ✅ 1- جلب بيانات المستخدم من Google Fit
app.post("/api/fit-data", async (req, res) => {
  try {
    const { token } = req.body; // الـ token اللي هيجيلك من الـ frontend
    oauth2Client.setCredentials({ access_token: token });

    const fitness = google.fitness({ version: "v1", auth: oauth2Client });

    // مثال: قراءة خطوات المستخدم
    const steps = await fitness.users.dataset.aggregate({
      userId: "me",
      requestBody: {
        aggregateBy: [
          {
            dataTypeName: "com.google.step_count.delta",
            dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
          }
        ],
        bucketByTime: { durationMillis: 86400000 }, // يوم واحد
        startTimeMillis: Date.now() - 7 * 24 * 60 * 60 * 1000, // آخر أسبوع
        endTimeMillis: Date.now()
      }
    });

    res.json(steps.data);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


connectDb()
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
