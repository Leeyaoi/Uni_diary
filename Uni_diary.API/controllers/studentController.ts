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
import { UserIsTaken } from "../repositories/userRepository";
import StudentRepository from "../repositories/studentRepository";

const repo = new StudentRepository();

const studentController = new GenericController<
  CreateStudentDto,
  UpdateStudentDto
>(CreateStudentValidator, UpdateStudentValidator, repo).GenerateController();

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

    const newModel = {
      ...req.body,
      id: uuidv4(),
    };

    newModel.budget == "true"
      ? (newModel.budget = true)
      : (newModel.budget = false);

    if (await UserIsTaken(newModel.userId, next)) {
      next(createHttpError(400, "this user is already taken"));
      return;
    }

    const data = await repo.create(newModel);
    res.send(data);
  }
);

export default studentController;
