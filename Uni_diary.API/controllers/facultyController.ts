import { Faculty } from "../dbModels/faculty";
import CreateFacultyDto from "../DTOs/FacultyDtos/CreateFacultyDto";
import { CreateFacultyValidator } from "../validators/FacultyValidators/CreateFacultyValidator";
import GenericController from "./genericController";

const facultyController = new GenericController<
  CreateFacultyDto,
  CreateFacultyDto
>(Faculty, CreateFacultyValidator, CreateFacultyValidator).GenerateController();

export default facultyController;
