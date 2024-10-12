import { v4 as uuidv4 } from "uuid";

export default class CreateTeacherDto {
  name: string;
  surname: string;
  jobTitle: string;
  groupId: uuidv4;
  studentId: uuidv4;
}
