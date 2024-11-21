import * as express from "express";
import { v4 as uuidv4, validate } from "uuid";
import { Mark } from "../dbModels/mark";
import CreateMarkDto from "../DTOs/MarkDtos/CreateMarkDto";
import UpdateMarkDto from "../DTOs/MarkDtos/UpdateMarkDto";
import GenericRepository from "../repositories/GenericRepository";
import { CreateMarkValidator } from "../validators/MarkValidators/CreateMarkValidator";
import { UpdateMarkValidator } from "../validators/MarkValidators/UpdateMarkValidator";
import GenericController from "./genericController";

const repo = new GenericRepository(Mark);

const markController = new GenericController<CreateMarkDto, UpdateMarkDto>(
  CreateMarkValidator,
  UpdateMarkValidator,
  repo
).GenerateController();

markController.delete(
  "/group/:dateWhen/:courseId",
  async (req: express.Request, res: express.Response, next) => {
    const courseId = req.params.courseId;
    const dateWhen = req.params.dateWhen;
    if (!validate(courseId)) {
      res.sendStatus(400);
      return;
    }
    const marks = JSON.parse(
      await repo.getByPredicate({ courseId, dateWhen }, [])
    ) as any[];
    marks.forEach(async (element) => {
      await repo.delete(element.id);
    });
    res.send({ deletedRows: marks.length });
  }
);

markController.get(
  "/group/:dateWhen/:courseId",
  async (req: express.Request, res: express.Response, next) => {
    const courseId = req.params.courseId;
    const dateWhen = req.params.dateWhen;
    if (!validate(courseId)) {
      res.sendStatus(400);
      return;
    }
    const marks = JSON.parse(
      await repo.getByPredicate({ courseId, dateWhen }, [])
    ) as any[];
    res.send(marks);
  }
);

export default markController;
