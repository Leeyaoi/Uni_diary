import { Student } from "../dbModels/student";
import CreateStudentDto from "../DTOs/StudentDtos/CreateStudentDto";
import UpdateStudentDto from "../DTOs/StudentDtos/UpdateStudentDto";
import GenericController from "./genericController";

const studentController = new GenericController<
  CreateStudentDto,
  UpdateStudentDto
>(Student).GenerateController();

export default studentController;
