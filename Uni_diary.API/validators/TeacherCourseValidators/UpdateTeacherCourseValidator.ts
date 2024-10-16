import { Schema } from "express-validator";
import { Teacher } from "../../dbModels/teacher";
import { Course } from "../../dbModels/course";
import { uuidValidate } from "../uuidValidate";

export const UpdateTeacherCourseValidator: Schema = {
  hours: { notEmpty: true, optional: true },
  teacherId: {
    notEmpty: true,
    optional: true,
    custom: {
      options: async (value) => {
        await uuidValidate(Teacher, value);
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
