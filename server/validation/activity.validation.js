import Joi from "joi";

export const createActivitySchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  date: Joi.date().required(),
  Distance: Joi.number().min(0).required(),
  Calories: Joi.number().min(0).required(),
  Steps: Joi.number().integer().min(0).optional(),
  duration: Joi.number().min(0).optional(),
});

export const updateActivitySchema = createActivitySchema.fork(
  ["userId", "date"],
  (schema) => schema.optional()
);
