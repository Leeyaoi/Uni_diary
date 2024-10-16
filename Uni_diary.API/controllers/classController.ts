import { Class } from "../dbModels/class";
import CreateClassDto from "../DTOs/ClassDtos/CreateClassDto";
import UpdateClassDto from "../DTOs/ClassDtos/UpdateClassDto";
import { CreateClassValidator } from "../validators/ClassValidators/CreateClassValidator";
import { UpdateClassValidator } from "../validators/ClassValidators/UpdateClassValidator";
import GenericController from "./genericController";

const classController = new GenericController<CreateClassDto, UpdateClassDto>(
  Class,
  CreateClassValidator,
  UpdateClassValidator
).GenerateController();

export default classController;
