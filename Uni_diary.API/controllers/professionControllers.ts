import { Profession } from "../dbModels/profession";
import CreateProfessionDto from "../DTOs/ProfessionDtos/CreateProfessionDto";
import UpdateProfessionDto from "../DTOs/ProfessionDtos/UpdateProfessionDto";
import GenericRepository from "../repositories/GenericRepository";
import { CreateProfessionValidator } from "../validators/ProfessionValidators/CreateProfessionValidator";
import { UpdateProfessionValidator } from "../validators/ProfessionValidators/UpdateProfeccionValidator";
import GenericController from "./genericController";

const repo = new GenericRepository(Profession);

const professionController = new GenericController<
  CreateProfessionDto,
  UpdateProfessionDto
>(
  CreateProfessionValidator,
  UpdateProfessionValidator,
  repo
).GenerateController();

export default professionController;
