import CreateProfessionDto from "../DTOs/ProfessionDtos/CreateProfessionDto";
import UpdateProfessionDto from "../DTOs/ProfessionDtos/UpdateProfessionDto";
import ProfessionRepository from "../repositories/professionRepository";
import { CreateProfessionValidator } from "../validators/ProfessionValidators/CreateProfessionValidator";
import { UpdateProfessionValidator } from "../validators/ProfessionValidators/UpdateProfeccionValidator";
import GenericController from "./genericController";

const repo = new ProfessionRepository();

const professionController = new GenericController<
  CreateProfessionDto,
  UpdateProfessionDto
>(
  CreateProfessionValidator,
  UpdateProfessionValidator,
  repo
).GenerateController();

export default professionController;
