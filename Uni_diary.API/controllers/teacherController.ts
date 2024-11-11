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
import { Op } from "sequelize";

const repo = new TeacherRepository();

const teacherController = new GenericController<
  CreateTeacherDto,
  UpdateTeacherDto
>(CreateTeacherValidator, UpdateTeacherValidator, repo).GenerateController();

teacherController.get(
  "/query/:query",
  async (
    req: express.Request<{ id: string }, {}, {}>,
    res: express.Response,
    next
  ) => {
    const query = req.params.query;
    const searchWords = query.split(" ").filter((word) => word.length > 0);
    const data = await repo.getByPredicate(
      {
        [Op.and]: searchWords.map((word) => ({
          [Op.or]: [
            { name: { [Op.iLike]: `%${word}%` } },
            { surname: { [Op.iLike]: `%${word}%` } },
          ],
        })),
      },
      []
    );
    if (data != "null") {
      res.send(data);
    } else {
      next(createHttpError(404, "Resourse have not been found"));
      return;
    }
  }
);

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
