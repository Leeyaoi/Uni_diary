import { Schema } from "express-validator";
import { Student } from "../../dbModels/student";
import { Course } from "../../dbModels/course";
import { uuidValidate } from "../uuidValidate";

export const CreateMarkValidator: Schema = {
  dateWhen: { notEmpty: true, isDate: true },
  mark: { notEmpty: true },
  studentId: {
    notEmpty: true,
    custom: {
      options: async (value) => {
        await uuidValidate(Student, value);
      },
    },
  },
  courseId: {
    notEmpty: true,
    custom: {
      options: async (value) => {
        await uuidValidate(Course, value);
      },
    },
  },
};
