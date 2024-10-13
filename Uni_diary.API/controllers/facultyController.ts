import { Faculty } from "../dbModels/faculty";
import CreateFacultyDto from "../DTOs/FacultyDtos/CreateFacultyDto";
import GenericController from "./genericController";

const facultyController = new GenericController<
  CreateFacultyDto,
  CreateFacultyDto
>(Faculty).GenerateController();

export default facultyController;
