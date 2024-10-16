import { Schema } from "express-validator";
import { Profession } from "../../dbModels/profession";
import { uuidValidate } from "../uuidValidate";

export const CreateGroupValidator: Schema = {
  year: { notEmpty: true },
  num: { notEmpty: true },
  proffesionId: {
    notEmpty: true,
    custom: {
      options: async (value) => {
        await uuidValidate(Profession, value);
      },
    },
  },
};
