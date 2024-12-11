import AdminType from "./admin";
import StudentType from "./student";
import TeacherType from "./teacher";

declare module "UserType";

type UserType = {
  login: string;
  password: string;
  admin: AdminType | null;
  student: StudentType | null;
  teacher: TeacherType | null;
  accessToken: string;
  refreshToken: string;
};

export default UserType;
