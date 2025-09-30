import mongoose, { Schema } from "mongoose";
import Joi from "joi";

const friendShipSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  friendId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("FriendShip", friendShipSchema);
export const friendShipValidation = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  friendId: Joi.string().hex().length(24).required(),
  status: Joi.string().valid("pending", "accepted", "rejected").optional(),
});
