import { Schema } from "express-validator";
import { Group } from "../../dbModels/group";
import { uuidValidate } from "../uuidValidate";
import { User } from "../../dbModels/user";

export const CreateStudentValidator: Schema = {
  name: { notEmpty: true },
  surname: { notEmpty: true },
  budget: { notEmpty: true },
  groupId: {
    notEmpty: true,
    custom: {
      options: async (value) => {
        await uuidValidate(Group, value);
      },
    },
  },
  userId: {
    notEmpty: true,
    custom: {
      options: async (value) => {
        await uuidValidate(User, value);
      },
    },
  },
};
