import mongoose from "mongoose";
import Joi from "joi";

const userChalangeSchema = new mongoose.Schema({
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
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});
export default mongoose.model("UserChalange", userChalangeSchema);
export const userChalangeValidation = Joi.object({
  title: Joi.string().trim().min(2).max(200).required(),
  description: Joi.string().trim().max(1000).optional(),
  target: Joi.number().min(0).optional(),
  startDate: Joi.date().required(),
  endDate: Joi.date().min(Joi.ref("startDate")).required(),
});
