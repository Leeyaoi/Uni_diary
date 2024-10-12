import { v4 as uuidv4 } from "uuid";

export default class CreateTeacherCourseDto {
  hours: number;
  teacherId: uuidv4;
  courseId: uuidv4;
}
