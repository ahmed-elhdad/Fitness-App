import Joi from "joi";

export const createUserChalangeSchema = Joi.object({
  title: Joi.string().trim().min(2).max(200).required(),
  description: Joi.string().trim().max(1000).optional(),
  target: Joi.number().min(0).optional(),
  startDate: Joi.date().required(),
  endDate: Joi.date().min(Joi.ref("startDate")).required(),
});

export const updateUserChalangeSchema = createUserChalangeSchema.fork(
  ["title", "startDate", "endDate"],
  (schema) => schema.optional()
);
