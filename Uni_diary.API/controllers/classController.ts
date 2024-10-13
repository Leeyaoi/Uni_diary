import { Class } from "../dbModels/class";
import CreateClassDto from "../DTOs/ClassDtos/CreateClassDto";
import UpdateClassDto from "../DTOs/ClassDtos/UpdateClassDto";
import GenericController from "./genericController";

const classController = new GenericController<CreateClassDto, UpdateClassDto>(
  Class
).GenerateController();

export default classController;
