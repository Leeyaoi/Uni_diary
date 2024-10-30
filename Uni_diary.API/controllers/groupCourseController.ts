import { Group_Course } from "../dbModels/group_course";
import CreateGroupCourseDto from "../DTOs/GroupCourseDtos/CreateGroupCourseDto";
import UpdateGroupCourseDto from "../DTOs/GroupCourseDtos/UpdateGroupCourseDto";
import GenericRepository from "../repositories/GenericRepository";
import { CreateGroupCourseValidator } from "../validators/GroupCourseValidators/CreateGroupCourseValidator";
import { UpdateGroupCourseValidator } from "../validators/GroupCourseValidators/UpdateGroupCourseValidator";
import GenericController from "./genericController";

const repo = new GenericRepository(Group_Course);

const groupCourseController = new GenericController<
  CreateGroupCourseDto,
  UpdateGroupCourseDto
>(
  CreateGroupCourseValidator,
  UpdateGroupCourseValidator,
  repo
).GenerateController();

export default groupCourseController;
