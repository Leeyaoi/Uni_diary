import CourseType from "./Course";
import GroupType from "./group";

declare module "GroupCourseType";

type GroupCourseType = {
  id: string;
  group: GroupType;
  course: CourseType;
};
