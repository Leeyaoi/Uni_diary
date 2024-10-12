import { v4 as uuidv4 } from "uuid";

export default class CreateClassDto {
  building: number;
  hall: number;
  teacherId: uuidv4;
  courseId: uuidv4;
  timetableId: uuidv4;
}
