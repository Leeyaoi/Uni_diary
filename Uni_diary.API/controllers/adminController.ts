import * as express from "express";
import { v4 as uuidv4 } from "uuid";
import { Admin } from "../dbModels/admin";
import CreateAdminDto from "../DTOs/AdminDtos/CreateAdminDto";
import UpdateAdminDto from "../DTOs/AdminDtos/UpdateAdminDto";
import { CreateAdminValidator } from "../validators/AdminValidators/CreateAdminValidator";
import { UpdateAdminValidator } from "../validators/AdminValidators/UpdateAdminValidator";
import GenericController, { myValidationResult } from "./genericController";
import { checkSchema } from "express-validator";
import createHttpError = require("http-errors");
import GenericRepository from "../repositories/GenericRepository";
import UserIsTaken from "../repositories/userRepository";

const adminController = new GenericController<CreateAdminDto, UpdateAdminDto>(
  Admin,
  CreateAdminValidator,
  UpdateAdminValidator
).GenerateController();

adminController.post(
  "/",
  express.urlencoded({ extended: false }),
  checkSchema(CreateAdminValidator),
  async (
    req: express.Request<{}, {}, CreateAdminDto>,
    res: express.Response,
    next
  ) => {
    const errors: string[] = myValidationResult(req).array();
    if (errors.length != 0) {
      next(createHttpError(400, JSON.stringify(errors)));
      return;
    }

    const repo = new GenericRepository(Admin);

    const newModel = {
      ...req.body,
      id: uuidv4(),
    };

    if (await UserIsTaken(newModel.userId, next)) {
      next(createHttpError(400, "this user is already taken"));
      return;
    }

    const data = await repo.create(newModel);
    res.send(data);
  }
);

export default adminController;
