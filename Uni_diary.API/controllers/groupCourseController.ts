import { Group_Course } from "../dbModels/group_course";
import CreateGroupCourseDto from "../DTOs/GroupCourseDtos/CreateGroupCourseDto";
import UpdateGroupCourseDto from "../DTOs/GroupCourseDtos/UpdateGroupCourseDto";
import GenericController from "./genericController";

const groupCourseController = new GenericController<
  CreateGroupCourseDto,
  UpdateGroupCourseDto
>(Group_Course).GenerateController();

export default groupCourseController;
