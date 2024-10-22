import { Schema } from "express-validator";
import { User } from "../../dbModels/user";
import { uuidValidate } from "../uuidValidate";

export const CreateAdminValidator: Schema = {
  name: { notEmpty: true },
  surname: { notEmpty: true },
  userId: {
    notEmpty: true,
    custom: {
      options: async (value) => {
        await uuidValidate(User, value);
      },
    },
  },
};
