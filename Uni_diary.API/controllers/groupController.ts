import { Group } from "../dbModels/group";
import CreateGroupDto from "../DTOs/GroupDtos/CreateGroupDto";
import UpdateGroupDto from "../DTOs/GroupDtos/UpdateGroupDto";
import GenericController from "./genericController";

const groupController = new GenericController<CreateGroupDto, UpdateGroupDto>(
  Group
).GenerateController();

export default groupController;
