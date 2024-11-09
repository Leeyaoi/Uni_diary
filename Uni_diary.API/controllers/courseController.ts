import * as express from "express";
import { Course } from "../dbModels/course";
import { CreateCourseValidator } from "../validators/CourseValidators/CreateCourseValidator";
import CreateCourseDto from "../DTOs/CourseDtos/CreateCourseDto";
import GenericController from "./genericController";
import GenericRepository from "../repositories/GenericRepository";
import { Op } from "sequelize";
import createHttpError = require("http-errors");

const repo = new GenericRepository(Course);

const courseController = new GenericController<
  CreateCourseDto,
  CreateCourseDto
>(CreateCourseValidator, CreateCourseValidator, repo).GenerateController();

courseController.get(
  "/query/:query",
  async (
    req: express.Request<{ id: string }, {}, {}>,
    res: express.Response,
    next
  ) => {
    const query = req.params.query;
    const data = await repo.getByPredicate(
      { name: { [Op.iLike]: `%${query}%` } },
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

export default courseController;
