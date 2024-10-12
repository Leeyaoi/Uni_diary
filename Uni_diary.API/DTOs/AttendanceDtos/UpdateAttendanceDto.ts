import { v4 as uuidv4 } from "uuid";

export default class UpdateAttendanceDto {
  dateWhen: Date | undefined;
  studentId: uuidv4 | undefined;
  courseId: uuidv4 | undefined;
}
