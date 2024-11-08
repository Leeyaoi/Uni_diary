declare module "TeacherType";

type TeacherType = {
  id: string;
  name: string;
  surname: string;
  jobTitle: string;
  user: { id: string; login: string; password: string };
};

export default TeacherType;
