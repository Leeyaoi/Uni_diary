import { Schema } from "express-validator";
import { Faculty } from "../../dbModels/faculty";
import { uuidValidate } from "../uuidValidate";

export const UpdateProfessionValidator: Schema = {
  name: { notEmpty: true, optional: true },
  code: { notEmpty: true, optional: true },
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
