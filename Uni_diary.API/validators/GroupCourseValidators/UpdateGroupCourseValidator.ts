import { Schema } from "express-validator";
import { Course } from "../../dbModels/course";
import { Group } from "../../dbModels/group";
import { uuidValidate } from "../uuidValidate";

export const UpdateGroupCourseValidator: Schema = {
  hours: { notEmpty: true, optional: true },
  groupId: {
    notEmpty: true,
    optional: true,
    custom: {
      options: async (value) => {
        await uuidValidate(Group, value);
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
