import { v4 as uuidv4 } from "uuid";

export default class UpdateTimetableDto {
  day: number | undefined;
  fullGroup: boolean | undefined;
  groupId: uuidv4 | undefined;
}
