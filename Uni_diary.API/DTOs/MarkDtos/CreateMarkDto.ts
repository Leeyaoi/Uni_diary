import { v4 as uuidv4 } from "uuid";

export default class CreateMarkDto {
  dateWhen: Date;
  mark: number;
  studentId: uuidv4;
  courseId: uuidv4;
}
