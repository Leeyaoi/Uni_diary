import { Schema } from "express-validator";
import { Student } from "../../dbModels/student";
import { Course } from "../../dbModels/course";
import { uuidValidate } from "../uuidValidate";

export const UpdateMarkValidator: Schema = {
  dateWhen: { notEmpty: true, optional: true, isDate: true },
  mark: { notEmpty: true, optional: true },
  studentId: {
    notEmpty: true,
    optional: true,
    custom: {
      options: async (value) => {
        await uuidValidate(Student, value);
      },
    },
  },
  courseId: {
    notEmpty: true,
    optional: true,
    custom: {
      options: async (value) => {
        await uuidValidate(Course, value);
      },
    },
  },
};
