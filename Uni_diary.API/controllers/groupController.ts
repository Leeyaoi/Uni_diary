import { Group } from "../dbModels/group";
import CreateGroupDto from "../DTOs/GroupDtos/CreateGroupDto";
import UpdateGroupDto from "../DTOs/GroupDtos/UpdateGroupDto";
import { CreateGroupValidator } from "../validators/GroupValidators/CreateGroupValidator";
import { UpdateGroupValidator } from "../validators/GroupValidators/UpdateGroupValidator";
import GenericController from "./genericController";

const groupController = new GenericController<CreateGroupDto, UpdateGroupDto>(
  Group,
  CreateGroupValidator,
  UpdateGroupValidator
).GenerateController();

export default groupController;
