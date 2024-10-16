import { Schema } from "express-validator";
import { Faculty } from "../../dbModels/faculty";
import { uuidValidate } from "../uuidValidate";

export const UpdateAdminValidator: Schema = {
  name: { notEmpty: true, optional: true },
  surname: { notEmpty: true, optional: true },
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
