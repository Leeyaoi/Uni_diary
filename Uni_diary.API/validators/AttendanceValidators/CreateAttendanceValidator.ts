import { Schema } from "express-validator";
import { Course } from "../../dbModels/course";
import { Student } from "../../dbModels/student";
import { uuidValidate } from "../uuidValidate";

export const CreateAttendanceValidator: Schema = {
  dateWhen: { notEmpty: true, isDate: true },
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
