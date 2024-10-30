import { Schema } from "express-validator";
import { Faculty } from "../../dbModels/faculty";
import { uuidValidate } from "../uuidValidate";

export const CreateProfessionValidator: Schema = {
  name: { notEmpty: true },
  code: { notEmpty: true },
  jobTitle: { notEmpty: true },
  facultyId: {
    notEmpty: true,
    custom: {
      options: async (value) => {
        await uuidValidate(Faculty, value);
      },
    },
  },
};
