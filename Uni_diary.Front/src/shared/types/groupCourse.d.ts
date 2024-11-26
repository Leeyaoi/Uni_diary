import CourseType from "./course";
import GroupType from "./group";

declare module "GroupCourseType";

type GroupCourseType = {
  id: string;
  group: GroupType;
  course: CourseType;
  hours: number;
  courseId: string;
};

export default GroupCourseType;
