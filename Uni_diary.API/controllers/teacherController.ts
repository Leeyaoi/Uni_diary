import * as express from "express";
import { v4 as uuidv4 } from "uuid";
import CreateTeacherDto from "../DTOs/TeacherDtos/CreateTeacherDto";
import UpdateTeacherDto from "../DTOs/TeacherDtos/UpdateTeacherDto";
import { CreateTeacherValidator } from "../validators/TeacherValidators/CreateTeacherValidator";
import { UpdateTeacherValidator } from "../validators/TeacherValidators/UpdateTeacherValidator";
import GenericController, { myValidationResult } from "./genericController";
import { checkSchema } from "express-validator";
import createHttpError = require("http-errors");
import { UserIsTaken } from "../repositories/userRepository";
import TeacherRepository from "../repositories/teacherRepository";

const repo = new TeacherRepository();

const teacherController = new GenericController<
  CreateTeacherDto,
  UpdateTeacherDto
>(CreateTeacherValidator, UpdateTeacherValidator, repo).GenerateController();

teacherController.post(
  "/",
  express.urlencoded({ extended: false }),
  checkSchema(CreateTeacherValidator),
  async (
    req: express.Request<{}, {}, CreateTeacherDto>,
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

export default teacherController;
