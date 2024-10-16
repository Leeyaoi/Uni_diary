import { Schema } from "express-validator";
import { Course } from "../../dbModels/course";
import { Student } from "../../dbModels/student";
import { uuidValidate } from "../uuidValidate";

export const UpdateAttendanceValidator: Schema = {
  dateWhen: { notEmpty: true, optional: true, isDate: true },
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
