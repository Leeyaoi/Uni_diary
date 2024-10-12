import { v4 as uuidv4 } from "uuid";

export default class CreateGroupCourseDto {
  hours: number;
  groupId: uuidv4;
  courseId: uuidv4;
}
