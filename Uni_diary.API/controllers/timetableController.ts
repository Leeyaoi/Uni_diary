import { Timetable } from "../dbModels/timetable";
import CreateTimetableDto from "../DTOs/TimetableDtos/CreateTimetableDto";
import UpdateTimetableDto from "../DTOs/TimetableDtos/UpdateTimetableDto";
import GenericRepository from "../repositories/GenericRepository";
import { CreateTimetableValidator } from "../validators/TimetableValidators/CreateTimetableValidator";
import { UpdateTimetableValidator } from "../validators/TimetableValidators/UpdateTimetableValidator";
import GenericController from "./genericController";

const repo = new GenericRepository(Timetable);

const timetableController = new GenericController<
  CreateTimetableDto,
  UpdateTimetableDto
>(
  CreateTimetableValidator,
  UpdateTimetableValidator,
  repo
).GenerateController();

export default timetableController;
