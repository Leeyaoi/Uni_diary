import * as express from "express";
import createHttpError = require("http-errors");
import { v4 as uuidv4 } from "uuid";
import { User } from "../dbModels/user";
import CreateUserDto from "../DTOs/UserDtos/CreateUserDto";
import UpdateUserDto from "../DTOs/UserDtos/UpdateUserDto";
import { CreateUserValidator } from "../validators/UserValidators/CreateUserValidator";
import { UpdateUserValidator } from "../validators/UserValidators/UpdateUserValidator";
import GenericController from "./genericController";
import { checkSchema, validationResult } from "express-validator";
import GenericRepository from "../repositories/GenericRepository";
import { Teacher } from "../dbModels/teacher";
import { Admin } from "../dbModels/admin";
import { Student } from "../dbModels/student";

const urlencodedParser = express.urlencoded({ extended: false });
const repo = new GenericRepository(User);

const userController = new GenericController<CreateUserDto, UpdateUserDto>(
  User,
  CreateUserValidator,
  UpdateUserValidator
).GenerateController();

//AUTH
userController.post(
  "/auth",
  urlencodedParser,
  checkSchema(CreateUserValidator),
  async (
    req: express.Request<{}, {}, CreateUserDto>,
    res: express.Response,
    next
  ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(createHttpError(400, "Validation error"));
      return;
    }

    const newModel = {
      ...req.body,
    };

    const data = await repo.getByPredicate(newModel, [Student, Teacher, Admin]);
    if (data == "[]") {
      next(createHttpError(404, "NotFound"));
      return;
    }
    res.send(data);
  }
);

export default userController;
