import { Profession } from "../dbModels/profession";
import CreateProfessionDto from "../DTOs/ProfessionDtos/CreateProfessionDto";
import UpdateProfessionDto from "../DTOs/ProfessionDtos/UpdateProfessionDto";
import GenericController from "./genericController";

const professionController = new GenericController<
  CreateProfessionDto,
  UpdateProfessionDto
>(Profession).GenerateController();

export default professionController;
