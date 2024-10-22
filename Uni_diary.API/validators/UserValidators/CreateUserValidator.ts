import { Schema } from "express-validator";

export const CreateUserValidator: Schema = {
  login: { notEmpty: true, errorMessage: "Login should not be empty" },
  password: { notEmpty: true, errorMessage: "Password should not be empty" },
};
