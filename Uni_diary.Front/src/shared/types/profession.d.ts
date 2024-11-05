import GroupType from "./group";

declare module "ProfessionType";

type ProfessionType = {
  id: string;
  name: string;
  code: string;
  jobTitle: string;
  groups: GroupType[];
};

export default ProfessionType;
