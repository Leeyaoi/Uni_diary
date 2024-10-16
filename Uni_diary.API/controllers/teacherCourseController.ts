import { Teacher_Course } from "../dbModels/teacher_course";
import CreateTeacherCourseDto from "../DTOs/TeacherCourseDtos/CreateTeacherCourseDto";
import UpdateTeacherCourseDto from "../DTOs/TeacherCourseDtos/UpdateTeacherCourseDto";
import { CreateTeacherCourseValidator } from "../validators/TeacherCourseValidators/CreateTeacherCourseValidator";
import { UpdateTeacherCourseValidator } from "../validators/TeacherCourseValidators/UpdateTeacherCourseValidator";
import GenericController from "./genericController";

const teacherCourseController = new GenericController<
  CreateTeacherCourseDto,
  UpdateTeacherCourseDto
>(
  Teacher_Course,
  CreateTeacherCourseValidator,
  UpdateTeacherCourseValidator
).GenerateController();

export default teacherCourseController;
