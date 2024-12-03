import MarkType from "./mark";

declare module "CourseType";

type CourseType = {
  id: string;
  name: string;
  marks: MarkType[];
};

export default CourseType;
