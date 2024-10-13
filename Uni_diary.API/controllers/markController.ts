import { Mark } from "../dbModels/mark";
import CreateMarkDto from "../DTOs/MarkDtos/CreateMarkDto";
import UpdateMarkDto from "../DTOs/MarkDtos/UpdateMarkDto";
import GenericController from "./genericController";

const markController = new GenericController<CreateMarkDto, UpdateMarkDto>(
  Mark
).GenerateController();

export default markController;
