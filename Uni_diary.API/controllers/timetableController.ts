import { Timetable } from "../dbModels/timetable";
import CreateTimetableDto from "../DTOs/TimetableDtos/CreateTimetableDto";
import UpdateTimetableDto from "../DTOs/TimetableDtos/UpdateTimetableDto";
import GenericController from "./genericController";

const timetableController = new GenericController<
  CreateTimetableDto,
  UpdateTimetableDto
>(Timetable).GenerateController();

export default timetableController;
