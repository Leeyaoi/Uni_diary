import StudentType from "./student";

declare module "GroupType";

type GroupType = {
  year: number;
  num: number;
  profession: any;
  students: StudentType[];
};

export default GroupType;
