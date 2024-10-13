import { Admin } from "../dbModels/admin";
import CreateAdminDto from "../DTOs/AdminDtos/CreateAdminDto";
import UpdateAdminDto from "../DTOs/AdminDtos/UpdateAdminDto";
import GenericController from "./genericController";

const adminController = new GenericController<CreateAdminDto, UpdateAdminDto>(
  Admin
).GenerateController();

export default adminController;
