import StudentType from "./student";

declare module "GroupType";

type GroupType = {
  id: string;
  year: number;
  num: number;
  profession: any;
  students: StudentType[];
};

export default GroupType;
