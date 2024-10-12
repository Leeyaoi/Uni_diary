import { v4 as uuidv4 } from "uuid";

export default class CreateTeacherDto {
  name: string | undefined;
  surname: string | undefined;
  jobTitle: string | undefined;
  groupId: uuidv4 | undefined;
  studentId: uuidv4 | undefined;
}
