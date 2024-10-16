import { Schema } from "express-validator";
import { Faculty } from "../../dbModels/faculty";
import { uuidValidate } from "../uuidValidate";

export const UpdateProfessionValidator: Schema = {
  dateWhen: { notEmpty: true, optional: true, isDate: true },
  mark: { notEmpty: true, optional: true },
  jobTitle: { notEmpty: true, optional: true },
  facultyId: {
    notEmpty: true,
    optional: true,
    custom: {
      options: async (value) => {
        await uuidValidate(Faculty, value);
      },
    },
  },
};
