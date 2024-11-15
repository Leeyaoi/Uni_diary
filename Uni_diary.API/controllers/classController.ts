import * as express from "express";
import { v4 as uuidv4 } from "uuid";
import CreateClassDto from "../DTOs/ClassDtos/CreateClassDto";
import UpdateClassDto from "../DTOs/ClassDtos/UpdateClassDto";
import ClassRepository from "../repositories/classRepository";
import { CreateClassValidator } from "../validators/ClassValidators/CreateClassValidator";
import { UpdateClassValidator } from "../validators/ClassValidators/UpdateClassValidator";
import GenericController from "./genericController";
import TimetableRepository from "../repositories/timetableRepository";

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

export default classController;
