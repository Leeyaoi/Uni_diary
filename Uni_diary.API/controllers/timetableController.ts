import * as express from "express";
import createHttpError = require("http-errors");
import CreateTimetableDto from "../DTOs/TimetableDtos/CreateTimetableDto";
import UpdateTimetableDto from "../DTOs/TimetableDtos/UpdateTimetableDto";
import TimetableRepository from "../repositories/timetableRepository";
import { CreateTimetableValidator } from "../validators/TimetableValidators/CreateTimetableValidator";
import { UpdateTimetableValidator } from "../validators/TimetableValidators/UpdateTimetableValidator";
import GenericController from "./genericController";

const repo = new TimetableRepository();

const timetableController = new GenericController<
  CreateTimetableDto,
  UpdateTimetableDto
>(
  CreateTimetableValidator,
  UpdateTimetableValidator,
  repo
).GenerateController();

timetableController.get(
  "/group/:groupId/:bottomWeek",
  async (
    req: express.Request<{ groupId: string; bottomWeek: boolean }, {}, {}>,
    res: express.Response,
    next
  ) => {
    const groupId = req.params.groupId;
    const bottomWeek = req.params.bottomWeek;

    const data = await repo.getByGroupId(groupId, bottomWeek == "true");
    if (data != "null") {
      res.send(data);
    } else {
      next(createHttpError(404, "Resourse have not been found"));
      return;
    }
  }
);

export default timetableController;
