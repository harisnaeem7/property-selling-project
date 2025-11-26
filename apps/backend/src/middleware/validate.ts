import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import type { ClassConstructor } from "class-transformer";
import { Request, Response, NextFunction } from "express";

export const validateRequest = (DTO: ClassConstructor<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance(DTO, req.body);

    const errors = await validate(dtoObject);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors: errors.map((err) => ({
          field: err.property,
          messages: err.constraints ? Object.values(err.constraints) : [],
        })),
      });
    }

    req.body = dtoObject; // override with validated version
    next();
  };
};
