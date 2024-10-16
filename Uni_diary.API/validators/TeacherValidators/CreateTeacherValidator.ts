import { Schema } from "express-validator";

export const CreateTeacherValidator: Schema = {
  name: { notEmpty: true },
  surname: { notEmpty: true },
  jobTitle: { notEmpty: true },
};
