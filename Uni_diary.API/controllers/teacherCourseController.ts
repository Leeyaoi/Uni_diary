import { Teacher_Course } from "../dbModels/teacher_course";
import CreateTeacherCourseDto from "../DTOs/TeacherCourseDtos/CreateTeacherCourseDto";
import UpdateTeacherCourseDto from "../DTOs/TeacherCourseDtos/UpdateTeacherCourseDto";
import GenericController from "./genericController";

const teacherCourseController = new GenericController<
  CreateTeacherCourseDto,
  UpdateTeacherCourseDto
>(Teacher_Course).GenerateController();

export default teacherCourseController;
