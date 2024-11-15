import { v4 as uuidv4 } from "uuid";

export default class UpdateClassDto {
  building: number | undefined;
  hall: number | undefined;
  fullGroup: boolean | undefined;
  firstHalf: boolean | undefined;
  number: number | undefined;
  teacherId: uuidv4 | undefined;
  courseId: uuidv4 | undefined;
  timetableId: uuidv4 | undefined;
}
