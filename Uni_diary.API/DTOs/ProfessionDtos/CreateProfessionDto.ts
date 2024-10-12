import { v4 as uuidv4 } from "uuid";

export default class CreateProfessionDto {
  name: string;
  code: string;
  jobTitle: string;
  facultyId: uuidv4;
}
