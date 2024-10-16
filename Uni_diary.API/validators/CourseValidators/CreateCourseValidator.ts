import { Schema } from "express-validator";

export const CreateCourseValidator: Schema = {
  name: {
    notEmpty: true,
  },
};
