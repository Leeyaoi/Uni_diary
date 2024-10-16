import { Admin } from "../dbModels/admin";
import CreateAdminDto from "../DTOs/AdminDtos/CreateAdminDto";
import UpdateAdminDto from "../DTOs/AdminDtos/UpdateAdminDto";
import { CreateAdminValidator } from "../validators/AdminValidators/CreateAdminValidator";
import { UpdateAdminValidator } from "../validators/AdminValidators/UpdateAdminValidator";
import GenericController from "./genericController";

const adminController = new GenericController<CreateAdminDto, UpdateAdminDto>(
  Admin,
  CreateAdminValidator,
  UpdateAdminValidator
).GenerateController();

export default adminController;
