import { Student } from "../dbModels/student";
import CreateStudentDto from "../DTOs/StudentDtos/CreateStudentDto";
import UpdateStudentDto from "../DTOs/StudentDtos/UpdateStudentDto";
import { CreateStudentValidator } from "../validators/StudentValidators/CreateStudentValidator";
import { UpdateStudentValidator } from "../validators/StudentValidators/UpdateStudentValidator";
import GenericController from "./genericController";

const studentController = new GenericController<
  CreateStudentDto,
  UpdateStudentDto
>(Student, CreateStudentValidator, UpdateStudentValidator).GenerateController();

export default studentController;
