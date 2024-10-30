import { Group } from "../dbModels/group";
import CreateGroupDto from "../DTOs/GroupDtos/CreateGroupDto";
import UpdateGroupDto from "../DTOs/GroupDtos/UpdateGroupDto";
import GenericRepository from "../repositories/GenericRepository";
import { CreateGroupValidator } from "../validators/GroupValidators/CreateGroupValidator";
import { UpdateGroupValidator } from "../validators/GroupValidators/UpdateGroupValidator";
import GenericController from "./genericController";

const repo = new GenericRepository(Group);

const groupController = new GenericController<CreateGroupDto, UpdateGroupDto>(
  CreateGroupValidator,
  UpdateGroupValidator,
  repo
).GenerateController();

export default groupController;
