import { v4 as uuidv4 } from "uuid";

export default class UpdateMarkDto {
  dateWhen: Date | undefined;
  mark: number | undefined;
  studentId: uuidv4 | undefined;
  courseId: uuidv4 | undefined;
}
