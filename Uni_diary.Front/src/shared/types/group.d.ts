import ProfessionType from "./profession";
import StudentType from "./student";

declare module "GroupType";

type GroupType = {
  id: string;
  year: number;
  num: number;
  profession: ProfessionType;
  students: StudentType[];
};

export default GroupType;
