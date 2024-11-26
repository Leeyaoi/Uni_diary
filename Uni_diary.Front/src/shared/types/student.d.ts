import GroupType from "./group";
import MarkType from "./mark";

declare module "StudentType";

type StudentType = {
  id: string;
  name: string;
  surname: string;
  budget: boolean;
  group: GroupType;
  user: { id: string; login: string; password: string };
  attendances: { lection: boolean }[];
  marks: MarkType[];
};

export default StudentType;
