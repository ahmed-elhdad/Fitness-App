import Joi from "joi";

export const createFriendShipSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  friendId: Joi.string().hex().length(24).required(),
  status: Joi.string().valid("pending", "accepted", "rejected").optional(),
});

export const updateFriendShipSchema = createFriendShipSchema.fork(
  ["userId", "friendId"],
  (schema) => schema.optional()
);
