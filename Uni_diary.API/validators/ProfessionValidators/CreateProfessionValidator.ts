import { Schema } from "express-validator";
import { Faculty } from "../../dbModels/faculty";
import { uuidValidate } from "../uuidValidate";

export const CreateProfessionValidator: Schema = {
  dateWhen: { notEmpty: true, isDate: true },
  mark: { notEmpty: true },
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
