import CreateGroupCourseDto from "../DTOs/GroupCourseDtos/CreateGroupCourseDto";
import UpdateGroupCourseDto from "../DTOs/GroupCourseDtos/UpdateGroupCourseDto";
import GroupCourseRepository from "../repositories/groupCourseRepository";
import { CreateGroupCourseValidator } from "../validators/GroupCourseValidators/CreateGroupCourseValidator";
import { UpdateGroupCourseValidator } from "../validators/GroupCourseValidators/UpdateGroupCourseValidator";
import GenericController from "./genericController";

const repo = new GroupCourseRepository();

const groupCourseController = new GenericController<
  CreateGroupCourseDto,
  UpdateGroupCourseDto
>(
  CreateGroupCourseValidator,
  UpdateGroupCourseValidator,
  repo
).GenerateController();

export default groupCourseController;
