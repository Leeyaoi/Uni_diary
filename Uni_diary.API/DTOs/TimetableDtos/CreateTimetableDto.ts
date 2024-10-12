import { v4 as uuidv4 } from "uuid";

export default class CreateTimetableDto {
  day: number;
  fullGroup: boolean;
  groupId: uuidv4;
}
