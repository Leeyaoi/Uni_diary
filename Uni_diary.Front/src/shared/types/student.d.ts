import GroupType from "./group";

declare module "StudentType";

type StudentType = {
  id: string;
  name: string;
  surname: string;
  budget: boolean;
  group: GroupType;
  user: { id: string; login: string; password: string };
};

export default StudentType;
