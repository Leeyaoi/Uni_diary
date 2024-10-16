import { Schema } from "express-validator";

export const UpdateUserValidator: Schema = {
  login: { notEmpty: true, optional: true },
  password: { notEmpty: true, optional: true },
};
