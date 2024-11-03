import { v4 as uuidv4 } from "uuid";

export default class CreateGroupDto {
  year: number;
  num: number;
  professionId: uuidv4;
}
