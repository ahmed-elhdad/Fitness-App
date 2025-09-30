import mongoose from "mongoose";
import Joi from "joi";
const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },
  Distance: {
    type: Number,
    required: true,
  },
  Calories: {
    type: Number,
    required: true,
  },
  Steps: {
    type: Number,
  },
  duration: {
    type: Number,
  },
  Calories: {
    type: Number,
  },
});
export default mongoose.model("Activity", activitySchema);
export const activityValidation = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  date: Joi.date().required(),
  Distance: Joi.number().min(0).required(),
  Calories: Joi.number().min(0).required(),
  Steps: Joi.number().integer().min(0).optional(),
  duration: Joi.number().min(0).optional(),
});
