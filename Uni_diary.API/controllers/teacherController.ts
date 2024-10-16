import { Teacher } from "../dbModels/teacher";
import CreateTeacherDto from "../DTOs/TeacherDtos/CreateTeacherDto";
import UpdateTeacherDto from "../DTOs/TeacherDtos/UpdateTeacherDto";
import { CreateTeacherValidator } from "../validators/TeacherValidators/CreateTeacherValidator";
import { UpdateTeacherValidator } from "../validators/TeacherValidators/UpdateTeacherValidator";
import GenericController from "./genericController";

const teacherController = new GenericController<
  CreateTeacherDto,
  UpdateTeacherDto
>(Teacher, CreateTeacherValidator, UpdateTeacherValidator).GenerateController();

export default teacherController;
