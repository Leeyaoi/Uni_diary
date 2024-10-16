import { Timetable } from "../dbModels/timetable";
import CreateTimetableDto from "../DTOs/TimetableDtos/CreateTimetableDto";
import UpdateTimetableDto from "../DTOs/TimetableDtos/UpdateTimetableDto";
import { CreateTimetableValidator } from "../validators/TimetableValidators/CreateTimetableValidator";
import { UpdateTimetableValidator } from "../validators/TimetableValidators/UpdateTimetableValidator";
import GenericController from "./genericController";

const timetableController = new GenericController<
  CreateTimetableDto,
  UpdateTimetableDto
>(
  Timetable,
  CreateTimetableValidator,
  UpdateTimetableValidator
).GenerateController();

export default timetableController;
