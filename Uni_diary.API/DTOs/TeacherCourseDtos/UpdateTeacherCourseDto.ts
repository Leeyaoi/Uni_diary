import { v4 as uuidv4 } from "uuid";

export default class UpdateTeacherCourseDto {
  hours: number | undefined;
  teacherId: uuidv4 | undefined;
  courseId: uuidv4 | undefined;
}
