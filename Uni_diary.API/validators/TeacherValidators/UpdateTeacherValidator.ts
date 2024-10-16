import { Schema } from "express-validator";

export const UpdateTeacherValidator: Schema = {
  name: { notEmpty: true, optional: true },
  surname: { notEmpty: true, optional: true },
  jobTitle: { notEmpty: true, optional: true },
};
