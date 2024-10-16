import { Profession } from "../dbModels/profession";
import CreateProfessionDto from "../DTOs/ProfessionDtos/CreateProfessionDto";
import UpdateProfessionDto from "../DTOs/ProfessionDtos/UpdateProfessionDto";
import { CreateProfessionValidator } from "../validators/ProfessionValidators/CreateProfessionValidator";
import { UpdateProfessionValidator } from "../validators/ProfessionValidators/UpdateProfeccionValidator";
import GenericController from "./genericController";

const professionController = new GenericController<
  CreateProfessionDto,
  UpdateProfessionDto
>(
  Profession,
  CreateProfessionValidator,
  UpdateProfessionValidator
).GenerateController();

export default professionController;
