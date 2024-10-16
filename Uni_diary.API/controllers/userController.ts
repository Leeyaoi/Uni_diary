import { User } from "../dbModels/user";
import CreateUserDto from "../DTOs/UserDtos/CreateUserDto";
import UpdateUserDto from "../DTOs/UserDtos/UpdateUserDto";
import { CreateUserValidator } from "../validators/UserValidators/CreateUserValidator";
import { UpdateUserValidator } from "../validators/UserValidators/UpdateUserValidator";
import GenericController from "./genericController";

const userController = new GenericController<CreateUserDto, UpdateUserDto>(
  User,
  CreateUserValidator,
  UpdateUserValidator
).GenerateController();

export default userController;
