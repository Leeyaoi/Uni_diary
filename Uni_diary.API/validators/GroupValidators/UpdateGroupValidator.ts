import { Schema } from "express-validator";
import { Profession } from "../../dbModels/profession";
import { uuidValidate } from "../uuidValidate";

export const UpdateGroupValidator: Schema = {
  year: { notEmpty: true, optional: true },
  num: { notEmpty: true, optional: true },
  proffesionId: {
    notEmpty: true,
    optional: true,
    custom: {
      options: async (value) => {
        await uuidValidate(Profession, value);
      },
    },
  },
};
