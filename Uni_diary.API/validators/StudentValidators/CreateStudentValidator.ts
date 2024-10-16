import { Schema } from "express-validator";
import { Group } from "../../dbModels/group";
import { uuidValidate } from "../uuidValidate";

export const CreateStudentValidator: Schema = {
  name: { notEmpty: true, isDate: true },
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
};
