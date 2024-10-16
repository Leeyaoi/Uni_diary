import { Schema } from "express-validator";

export const CreateFacultyValidator: Schema = {
  name: {
    notEmpty: true,
  },
};
