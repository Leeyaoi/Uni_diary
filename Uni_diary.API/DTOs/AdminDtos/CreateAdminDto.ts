import { v4 as uuidv4 } from "uuid";

export default class CreateAdminDto {
  name: string;
  surname: string;
  userId: uuidv4;
}
