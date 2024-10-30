import { Class } from "../dbModels/class";
import CreateClassDto from "../DTOs/ClassDtos/CreateClassDto";
import UpdateClassDto from "../DTOs/ClassDtos/UpdateClassDto";
import GenericRepository from "../repositories/GenericRepository";
import { CreateClassValidator } from "../validators/ClassValidators/CreateClassValidator";
import { UpdateClassValidator } from "../validators/ClassValidators/UpdateClassValidator";
import GenericController from "./genericController";

const repo = new GenericRepository(Class);

const classController = new GenericController<CreateClassDto, UpdateClassDto>(
  CreateClassValidator,
  UpdateClassValidator,
  repo
).GenerateController();

export default classController;
