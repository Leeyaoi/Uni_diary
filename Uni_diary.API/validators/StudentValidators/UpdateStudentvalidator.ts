import { Schema } from "express-validator";
import { Group } from "../../dbModels/group";
import { uuidValidate } from "../uuidValidate";

export const UpdateStudentValidator: Schema = {
  name: { notEmpty: true, optional: true, isDate: true },
  surname: { notEmpty: true, optional: true },
  budget: { notEmpty: true, optional: true },
  groupId: {
    notEmpty: true,
    optional: true,
    custom: {
      options: async (value) => {
        await uuidValidate(Group, value);
      },
    },
  },
};
