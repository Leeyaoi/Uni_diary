import { Schema } from "express-validator";

export const CreateUserValidator: Schema = {
  login: { notEmpty: true },
  password: { notEmpty: true },
};
