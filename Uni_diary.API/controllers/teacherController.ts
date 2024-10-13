import { Teacher } from "../dbModels/teacher";
import CreateTeacherDto from "../DTOs/TeacherDtos/CreateTeacherDto";
import UpdateTeacherDto from "../DTOs/TeacherDtos/UpdateTeacherDto";
import GenericController from "./genericController";

const teacherController = new GenericController<
  CreateTeacherDto,
  UpdateTeacherDto
>(Teacher).GenerateController();

export default teacherController;
