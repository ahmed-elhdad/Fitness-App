// ...existing code...
import mongoose from "mongoose";
import Joi from "joi";

export const ChalengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  target: {
    type: Number,
  },
  unit: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

export interface IChallenge {
  title: string;
  description?: string;
  target?: number;
  unit: string;
  startDate: Date;
  endDate: Date;
}

// provide proper model generics for typing when using the model elsewhere
export default mongoose.model<IChallenge & mongoose.Document>(
  "Chalenge",
  ChalengeSchema
);

// Validation schema for Challenge creation
export const challengeValidation = Joi.object({
  title: Joi.string().trim().min(2).max(200).required(),
  description: Joi.string().trim().max(1000).optional(),
  target: Joi.number().min(0).optional(),
  unit: Joi.string().trim().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().min(Joi.ref("startDate")).required(),
});
