import CourseType from "./Course";
import TeacherType from "./teacher";

declare module "TeacherCourseType";

type TeacherCourseType = {
  id: string;
  teacher: TeacherType;
  course: CourseType;
  hours: number;
};

export default TeacherCourseType;
