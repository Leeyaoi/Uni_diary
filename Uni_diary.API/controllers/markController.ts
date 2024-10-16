import { Mark } from "../dbModels/mark";
import CreateMarkDto from "../DTOs/MarkDtos/CreateMarkDto";
import UpdateMarkDto from "../DTOs/MarkDtos/UpdateMarkDto";
import { CreateMarkValidator } from "../validators/MarkValidators/CreateMarkValidator";
import { UpdateMarkValidator } from "../validators/MarkValidators/UpdateMarkValidator";
import GenericController from "./genericController";

const markController = new GenericController<CreateMarkDto, UpdateMarkDto>(
  Mark,
  CreateMarkValidator,
  UpdateMarkValidator
).GenerateController();

export default markController;
