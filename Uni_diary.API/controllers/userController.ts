import { User } from "../dbModels/user";
import CreateUserDto from "../DTOs/UserDtos/CreateUserDto";
import UpdateUserDto from "../DTOs/UserDtos/UpdateUserDto";
import GenericController from "./genericController";

const userController = new GenericController<CreateUserDto, UpdateUserDto>(
  User
).GenerateController();

export default userController;
