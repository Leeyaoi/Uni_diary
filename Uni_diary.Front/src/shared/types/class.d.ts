import CourseType from "./course";
import GroupType from "./group";
import TeacherType from "./teacher";
import TimetableType from "./timetable";

declare module "ClassType";

type ClassType = {
  id?: string;
  building: number;
  hall: number;
  fullGroup: boolean;
  firstHalf: boolean;
  number: number;
  teacher: TeacherType;
  course: CourseType;
  timetable: TimetableType;
  lection: boolean;
};

export default ClassType;
