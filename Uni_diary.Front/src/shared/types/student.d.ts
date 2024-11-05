import GroupType from "./group";

declare module "StudentType";

type StudentType = {
  id: string;
  name: string;
  surname: string;
  budget: boolean;
  group: GroupType;
  user: { login: string; password: string };
};

export default StudentType;
