import { Schema } from "express-validator";
import { Teacher } from "../../dbModels/teacher";
import { Course } from "../../dbModels/course";
import { uuidValidate } from "../uuidValidate";

export const CreateTeacherCourseValidator: Schema = {
  hours: { notEmpty: true },
  teacherId: {
    notEmpty: true,
    custom: {
      options: async (value) => {
        await uuidValidate(Teacher, value);
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
