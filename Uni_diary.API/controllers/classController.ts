import * as express from "express";
import { v4 as uuidv4, validate } from "uuid";
import CreateClassDto from "../DTOs/ClassDtos/CreateClassDto";
import UpdateClassDto from "../DTOs/ClassDtos/UpdateClassDto";
import ClassRepository from "../repositories/classRepository";
import { CreateClassValidator } from "../validators/ClassValidators/CreateClassValidator";
import { UpdateClassValidator } from "../validators/ClassValidators/UpdateClassValidator";
import GenericController from "./genericController";
import TimetableRepository from "../repositories/timetableRepository";
import { Timetable } from "../dbModels/timetable";
import { Group } from "../dbModels/group";
import { Course } from "../dbModels/course";
import { Profession } from "../dbModels/profession";

const repo = new ClassRepository();
const timetableRepo = new TimetableRepository();
const urlencodedParser = express.urlencoded({ extended: false });

const classController = new GenericController<CreateClassDto, UpdateClassDto>(
  CreateClassValidator,
  UpdateClassValidator,
  repo
).GenerateController();

classController.post(
  "/findConflicts",
  urlencodedParser,
  async (
    req: express.Request<
      {},
      {},
      {
        building: number;
        hall: number;
        number: number;
        timetableId: uuidv4;
        forBothWeeks: string;
        teacherId: uuidv4;
      }
    >,
    res: express.Response,
    next
  ) => {
    const newModel = {
      ...req.body,
      id: uuidv4(),
    };
    newModel.day = await timetableRepo.getDay(newModel.timetableId);
    let data = await repo.findConflictClasses(newModel);
    if (newModel.forBothWeeks == "true") {
      newModel.day = await timetableRepo.getDay(
        await timetableRepo.getOtherWeeksId(newModel.timetableId)
      );
      data =
        "[" + data + ", " + (await repo.findConflictClasses(newModel)) + "]";
    }
    res.send(data);
  }
);

classController.get(
  "/teacher/:id/:bottomWeek",
  async (
    req: express.Request<{ id: string }, uuidv4, {}>,
    res: express.Response,
    next
  ) => {
    const id = req.params.id;
    const bottomWeek = req.params.bottomWeek;
    if (!validate(id)) {
      res.sendStatus(400);
      return;
    }
    let result = "[";
    if (bottomWeek == "true") {
      for (let i = 8; i < 14; i++) {
        result += await repo.getByPredicate(
          { teacherId: id },
          [
            {
              model: Timetable,
              where: { day: i },
              include: [{ model: Group, include: [Profession] }],
              order: [["day", "ASC"]],
            },
            Course,
          ],
          [["number", "ASC"]]
        );
        if (i != 13) {
          result += ",";
        }
      }
      result += "]";
    } else {
      for (let i = 1; i < 7; i++) {
        result += await repo.getByPredicate(
          { teacherId: id },
          [
            {
              model: Timetable,
              where: { day: i },
              include: [{ model: Group, include: [Profession] }],
              order: [["day", "ASC"]],
            },
            Course,
          ],
          [["number", "ASC"]]
        );
        if (i != 6) {
          result += ",";
        }
      }
      result += "]";
    }
    res.send(result);
  }
);

export default classController;
