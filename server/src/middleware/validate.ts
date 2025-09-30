import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        error: error.details.map((err) => err.message),
      });
    }

    next();
  };
};

export default validate;