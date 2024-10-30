import { Course } from "../dbModels/course";
import { CreateCourseValidator } from "../validators/CourseValidators/CreateCourseValidator";
import CreateCourseDto from "../DTOs/CourseDtos/CreateCourseDto";
import GenericController from "./genericController";
import GenericRepository from "../repositories/GenericRepository";

const repo = new GenericRepository(Course);

const courseController = new GenericController<
  CreateCourseDto,
  CreateCourseDto
>(CreateCourseValidator, CreateCourseValidator, repo).GenerateController();

export default courseController;
