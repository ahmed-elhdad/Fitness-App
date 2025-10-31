import express from "express";
import {
  createChalenge,
  getChalenges,
  joinChalenge,
  deleteChalenge
} from "../controllers/challengeControllers";
const router = express.Router();
router.post("/createChalenge", createChalenge);
router.get("/chalenges", getChalenges);
router.post("/joinChalenge", joinChalenge);
router.delete("/deleteChalenge", deleteChalenge);
export default router;
