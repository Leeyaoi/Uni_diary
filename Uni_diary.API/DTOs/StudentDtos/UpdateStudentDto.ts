import { v4 as uuidv4 } from "uuid";

export default class UpdateStudentDto {
  name: string | undefined;
  surname: string | undefined;
  budget: boolean | undefined;
  groupId: uuidv4 | undefined;
  studentId: uuidv4 | undefined;
}
