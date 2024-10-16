import { Schema } from "express-validator";
import { Group } from "../../dbModels/group";
import { uuidValidate } from "../uuidValidate";

export const CreateTimetableValidator: Schema = {
  day: { notEmpty: true },
  fullGroup: { notEmpty: true },
  groupId: {
    notEmpty: true,
    custom: {
      options: async (value) => {
        await uuidValidate(Group, value);
      },
    },
  },
};
