import { v4 as uuidv4 } from "uuid";

export default class UpdateProfessionDto {
  name: string | undefined;
  code: string | undefined;
  jobTitle: string | undefined;
  facultyId: uuidv4 | undefined;
}
