import { v4 as uuidv4 } from "uuid";

export default class CreateGroupDto {
  year: number | undefined;
  num: number | undefined;
  proffesionId: uuidv4 | undefined;
}
