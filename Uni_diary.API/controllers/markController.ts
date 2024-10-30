import { Mark } from "../dbModels/mark";
import CreateMarkDto from "../DTOs/MarkDtos/CreateMarkDto";
import UpdateMarkDto from "../DTOs/MarkDtos/UpdateMarkDto";
import GenericRepository from "../repositories/GenericRepository";
import { CreateMarkValidator } from "../validators/MarkValidators/CreateMarkValidator";
import { UpdateMarkValidator } from "../validators/MarkValidators/UpdateMarkValidator";
import GenericController from "./genericController";

const repo = new GenericRepository(Mark);

const markController = new GenericController<CreateMarkDto, UpdateMarkDto>(
  CreateMarkValidator,
  UpdateMarkValidator,
  repo
).GenerateController();

export default markController;
