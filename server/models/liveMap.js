import mongoose from "mongoose";
import Joi from "joi";

const liveMapSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  typeStamp: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String,
  },
});
export default mongoose.model("LiveMap", liveMapSchema);
export const liveMapValidation = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  latitude: Joi.number().min(-90).max(90).required(),
  typeStamp: Joi.date().optional(),
  location: Joi.string().trim().max(255).optional(),
});
