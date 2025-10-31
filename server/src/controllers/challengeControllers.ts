import { Request, Response } from "express";
import Challenge, { IChallenge, challengeValidation } from "../models/Chalenge";
import User from "../models/user";
import mongoose, { Document } from "mongoose";
import Joi from "joi";
import Chalenge from "../models/Chalenge";

export const createChalenge = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const { error, value } = challengeValidation.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        status: "error",
        errors: error.details.map((err) => err.message),
      });
    }

    // Check for existing challenge
    const existing = await Challenge.findOne({ title: value.title });
    if (existing) {
      return res.status(409).json({ message: "Challenge already exists" });
    }

    // Create new challenge
    const newChallenge = new Challenge(value);
    await newChallenge.save();

    return res.status(201).json({
      message: "Challenge created",
      data: newChallenge,
    });
  } catch (err: any) {
    console.error("createChallenge error:", err);
    return res.status(500).json({
      message: "Server error",
      error: err?.message ?? err,
    });
  }
};
export const getChalenges = async (req: Request, res: Response) => {
  try {
    const challenges = await Challenge.find({});
    return res.status(200).json({
      message: "Challenges retrieved successfully",
      data: challenges,
    });
  } catch (err: any) {
    console.error("getChalenges error:", err);
    return res.status(500).json({
      message: "Server error",
      error: err?.message ?? err,
    });
  }
};

export const joinChalenge = async (req: Request, res: Response) => {
  try {
    const { challengeId, userId } = req.body;

    // Validate request body
    if (!challengeId || !userId) {
      return res.status(400).json({
        message: "challengeId and userId are required",
      });
    }

    // Validate ObjectId format
    const isValidChallengeId = mongoose.Types.ObjectId.isValid(challengeId);
    const isValidUserId = mongoose.Types.ObjectId.isValid(userId);
    if (!isValidChallengeId || !isValidUserId) {
      return res.status(400).json({
        message: "Invalid challengeId or userId format",
      });
    }

    // Check if challenge exists
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({
        message: "Challenge not found",
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check if user already joined this challenge
    const isAlreadyJoined = user.chalenges?.some(
      (c: any) => c.toString() === challengeId
    );

    if (isAlreadyJoined) {
      return res.status(409).json({
        message: "User has already joined this challenge",
      });
    }

    // Add challenge to user's challenges array
    user.chalenges.push(challengeId as any);
    await user.save();

    return res.status(200).json({
      message: "Successfully joined challenge",
      data: {
        challenge,
        userChallenges: user.chalenges,
      },
    });
  } catch (err: any) {
    console.error("joinChalenge error:", err);
    return res.status(500).json({
      message: "Server error",
      error: err?.message ?? err,
    });
  }
};
export const deleteChalenge=async(req:Request,res:Response) => {
  try {
    const {challengeId,userPassword} = req.body
    const isValidChallengeId = mongoose.Types.ObjectId.isValid(challengeId)
    if (!isValidChallengeId) {
      res.json({message:"Chellnge not found"})
      return
    }
    if (userPassword != 'ahmedhasaccount'){
      res.json({message:"you are not the leader"})
      return
    }
    const existing = await Chalenge.findByIdAndDelete(challengeId)
    if (!existing) {
      res.json({message:"Can not delete that"})
      return
    }
    res.status(201).json({messsage:"Chellenge deleted successfully"})
  } catch (err) {
    
  }
}