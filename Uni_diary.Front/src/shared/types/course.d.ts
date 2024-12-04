import MarkType from "./mark";

declare module "CourseType";

type CourseType = {
  id: string;
  name: string;
  marks: MarkType[];
  attendances: { dateWhen: string }[];
};

export default CourseType;
