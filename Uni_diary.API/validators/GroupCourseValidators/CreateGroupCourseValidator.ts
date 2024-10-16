import { Schema } from "express-validator";
import { Course } from "../../dbModels/course";
import { Group } from "../../dbModels/group";
import { uuidValidate } from "../uuidValidate";

export const CreateGroupCourseValidator: Schema = {
  hours: { notEmpty: true },
  groupId: {
    notEmpty: true,
    custom: {
      options: async (value) => {
        await uuidValidate(Group, value);
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
