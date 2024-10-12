import { v4 as uuidv4 } from "uuid";

export default class UpdateAdminDto {
  name: string | undefined;
  surname: string | undefined;
  facultyId: uuidv4 | undefined;
}
