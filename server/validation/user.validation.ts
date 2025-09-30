import Joi from "joi";

export const registerValidation = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  age: Joi.number().min(13).max(120),
  weight: Joi.number().min(20).max(300),
  height: Joi.number().min(100).max(250),
  gender: Joi.string().valid("male", "female", "other"),
});

export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const googleLoginValidation = Joi.object({
  token: Joi.string().required(),
});

export const appleLoginValidation = Joi.object({
  token: Joi.string().required(),
});
