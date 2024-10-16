import { Course } from "../dbModels/course";
import { CreateCourseValidator } from "../validators/CourseValidators/CreateCourseValidator";
import CreateCourseDto from "../DTOs/CourseDtos/CreateCourseDto";
import GenericController from "./genericController";

const courseController = new GenericController<
  CreateCourseDto,
  CreateCourseDto
>(Course, CreateCourseValidator, CreateCourseValidator).GenerateController();

export default courseController;
