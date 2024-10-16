import { Group_Course } from "../dbModels/group_course";
import CreateGroupCourseDto from "../DTOs/GroupCourseDtos/CreateGroupCourseDto";
import UpdateGroupCourseDto from "../DTOs/GroupCourseDtos/UpdateGroupCourseDto";
import { CreateGroupCourseValidator } from "../validators/GroupCourseValidators/CreateGroupCourseValidator";
import { UpdateGroupCourseValidator } from "../validators/GroupCourseValidators/UpdateGroupCourseValidator";
import GenericController from "./genericController";

const groupCourseController = new GenericController<
  CreateGroupCourseDto,
  UpdateGroupCourseDto
>(
  Group_Course,
  CreateGroupCourseValidator,
  UpdateGroupCourseValidator
).GenerateController();

export default groupCourseController;
