import { Schema } from "express-validator";
import { Course } from "../../dbModels/course";
import { Teacher } from "../../dbModels/teacher";
import { Timetable } from "../../dbModels/timetable";
import { uuidValidate } from "../uuidValidate";

export const CreateClassValidator: Schema = {
  building: { notEmpty: true },
  hall: { notEmpty: true },
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
  timetableId: {
    notEmpty: true,
    custom: {
      options: async (value) => {
        await uuidValidate(Timetable, value);
      },
    },
  },
};
