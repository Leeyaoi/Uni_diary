import { v4 as uuidv4 } from "uuid";

export default class CreateStudentDto {
  name: string;
  surname: string;
  budget: boolean;
  groupId: uuidv4;
}
