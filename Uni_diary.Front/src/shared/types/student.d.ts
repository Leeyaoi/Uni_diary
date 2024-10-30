import GroupType from "./group";

declare module "StudentType";

type StudentType = {
  id: string;
  name: string;
  surname: string;
  budget: boolean;
  group: GroupType;
};

export default StudentType;
