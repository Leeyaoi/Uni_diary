import ClassType from "./class";
import GroupType from "./group";

declare module "TimetableType";

type TimetableType = {
  id: string;
  day: number;
  classes: ClassType[];
  group: GroupType;
};

export default TimetableType;
