import CourseType from "./course";
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
};

export default ClassType;