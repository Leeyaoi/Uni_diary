import { Teacher_Course } from "../dbModels/teacher_course";
import CreateTeacherCourseDto from "../DTOs/TeacherCourseDtos/CreateTeacherCourseDto";
import UpdateTeacherCourseDto from "../DTOs/TeacherCourseDtos/UpdateTeacherCourseDto";
import GenericRepository from "../repositories/GenericRepository";
import { CreateTeacherCourseValidator } from "../validators/TeacherCourseValidators/CreateTeacherCourseValidator";
import { UpdateTeacherCourseValidator } from "../validators/TeacherCourseValidators/UpdateTeacherCourseValidator";
import GenericController from "./genericController";

const repo = new GenericRepository(Teacher_Course);

const teacherCourseController = new GenericController<
  CreateTeacherCourseDto,
  UpdateTeacherCourseDto
>(
  CreateTeacherCourseValidator,
  UpdateTeacherCourseValidator,
  repo
).GenerateController();

export default teacherCourseController;
