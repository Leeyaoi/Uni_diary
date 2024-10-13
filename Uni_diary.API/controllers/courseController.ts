import { Course } from "../dbModels/course";
import CreateCourseDto from "../DTOs/CourseDtos/CreateCourseDto";
import GenericController from "./genericController";

const courseController = new GenericController<
  CreateCourseDto,
  CreateCourseDto
>(Course).GenerateController();

export default courseController;
