import { v4 as uuidv4 } from "uuid";

export default class CreateAttendanceDto {
  dateWhen: Date;
  studentId: uuidv4;
  courseId: uuidv4;
}
