import CreateTeacherCourseDto from "../DTOs/TeacherCourseDtos/CreateTeacherCourseDto";
import UpdateTeacherCourseDto from "../DTOs/TeacherCourseDtos/UpdateTeacherCourseDto";
import TeacherCourseRepository from "../repositories/teacherCourseRepository";
import { CreateTeacherCourseValidator } from "../validators/TeacherCourseValidators/CreateTeacherCourseValidator";
import { UpdateTeacherCourseValidator } from "../validators/TeacherCourseValidators/UpdateTeacherCourseValidator";
import GenericController from "./genericController";

const repo = new TeacherCourseRepository();

const teacherCourseController = new GenericController<
  CreateTeacherCourseDto,
  UpdateTeacherCourseDto
>(
  CreateTeacherCourseValidator,
  UpdateTeacherCourseValidator,
  repo
).GenerateController();

export default teacherCourseController;
