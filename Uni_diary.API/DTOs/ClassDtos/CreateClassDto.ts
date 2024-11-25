import { v4 as uuidv4 } from "uuid";

export default class CreateClassDto {
  building: number;
  hall: number;
  fullGroup: boolean;
  firstHalf: boolean;
  number: number;
  forBothWeeks: string;
  teacherId: uuidv4;
  courseId: uuidv4;
  timetableId: uuidv4;
  lection: boolean;
  id?: any;
}
