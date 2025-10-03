import mongoose from "mongoose";
import Joi, { required } from "joi";
const date = new Date();
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  height: {
    type: Number,
  },
  gender: {
    type: String,
  },
  friends: [],
  createdAt: {
    type: Date,
    default: date.getDay(),
  },
});
export default mongoose.model("User", userSchema);
export const userValidation = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().min(6).max(128).required(),
  age: Joi.number().integer().min(0).max(130).optional(),
  weight: Joi.number().min(0).max(1000).optional(),
  height: Joi.number().min(0).max(300).optional(),
  gender: Joi.string().valid("male", "female", "other").optional(),
});
