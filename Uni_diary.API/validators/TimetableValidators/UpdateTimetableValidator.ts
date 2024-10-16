import { Schema } from "express-validator";
import { Group } from "../../dbModels/group";
import { uuidValidate } from "../uuidValidate";

export const UpdateTimetableValidator: Schema = {
  day: { notEmpty: true, optional: true },
  fullGroup: { notEmpty: true, optional: true },
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
