import { Faculty } from "../dbModels/faculty";
import CreateFacultyDto from "../DTOs/FacultyDtos/CreateFacultyDto";
import GenericRepository from "../repositories/GenericRepository";
import { CreateFacultyValidator } from "../validators/FacultyValidators/CreateFacultyValidator";
import GenericController from "./genericController";

const repo = new GenericRepository(Faculty);

const facultyController = new GenericController<
  CreateFacultyDto,
  CreateFacultyDto
>(CreateFacultyValidator, CreateFacultyValidator, repo).GenerateController();

export default facultyController;
