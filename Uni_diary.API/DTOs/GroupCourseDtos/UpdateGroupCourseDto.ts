import { v4 as uuidv4 } from "uuid";

export default class UpdateGroupCourseDto {
  hours: number | undefined;
  groupId: uuidv4 | undefined;
  courseId: uuidv4 | undefined;
}
