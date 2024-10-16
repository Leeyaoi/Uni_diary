import { Schema } from "express-validator";
import { Course } from "../../dbModels/course";
import { Teacher } from "../../dbModels/teacher";
import { Timetable } from "../../dbModels/timetable";
import { uuidValidate } from "../uuidValidate";

export const UpdateClassValidator: Schema = {
  building: { notEmpty: true, optional: true },
  hall: { notEmpty: true, optional: true },
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
  timetableId: {
    notEmpty: true,
    optional: true,
    custom: {
      options: async (value) => {
        await uuidValidate(Timetable, value);
      },
    },
  },
};
