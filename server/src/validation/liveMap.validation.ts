import Joi from "joi";

export const createLiveMapSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  latitude: Joi.number().min(-90).max(90).required(),
  typeStamp: Joi.date().optional(),
  location: Joi.string().trim().max(255).optional(),
});

export const updateLiveMapSchema = createLiveMapSchema.fork(
  ["userId", "latitude"],
  (schema) => schema.optional()
);
