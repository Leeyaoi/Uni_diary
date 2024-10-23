import * as express from "express";
import { v4 as uuidv4 } from "uuid";
import { Student } from "../dbModels/student";
import CreateStudentDto from "../DTOs/StudentDtos/CreateStudentDto";
import UpdateStudentDto from "../DTOs/StudentDtos/UpdateStudentDto";
import { CreateStudentValidator } from "../validators/StudentValidators/CreateStudentValidator";
import { UpdateStudentValidator } from "../validators/StudentValidators/UpdateStudentvalidator";
import GenericController, { myValidationResult } from "./genericController";
import { checkSchema } from "express-validator";
import createHttpError = require("http-errors");
import GenericRepository from "../repositories/GenericRepository";
import UserIsTaken from "../repositories/userRepository";

const studentController = new GenericController<
  CreateStudentDto,
  UpdateStudentDto
>(Student, CreateStudentValidator, UpdateStudentValidator).GenerateController();

studentController.post(
  "/",
  express.urlencoded({ extended: false }),
  checkSchema(CreateStudentValidator),
  async (
    req: express.Request<{}, {}, CreateStudentDto>,
    res: express.Response,
    next
  ) => {
    const errors: string[] = myValidationResult(req).array();
    if (errors.length != 0) {
      next(createHttpError(400, JSON.stringify(errors)));
      return;
    }

    const repo = new GenericRepository(Student);

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

export default studentController;
