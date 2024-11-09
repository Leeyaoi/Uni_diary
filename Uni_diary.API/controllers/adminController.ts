import * as express from "express";
import { v4 as uuidv4 } from "uuid";
import CreateAdminDto from "../DTOs/AdminDtos/CreateAdminDto";
import UpdateAdminDto from "../DTOs/AdminDtos/UpdateAdminDto";
import { CreateAdminValidator } from "../validators/AdminValidators/CreateAdminValidator";
import { UpdateAdminValidator } from "../validators/AdminValidators/UpdateAdminValidator";
import GenericController, { myValidationResult } from "./genericController";
import { checkSchema } from "express-validator";
import createHttpError = require("http-errors");
import { UserIsTaken } from "../repositories/userRepository";
import AdminRepository from "../repositories/adminRepository";

const repo = new AdminRepository();

const adminController = new GenericController<CreateAdminDto, UpdateAdminDto>(
  CreateAdminValidator,
  UpdateAdminValidator,
  repo
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
