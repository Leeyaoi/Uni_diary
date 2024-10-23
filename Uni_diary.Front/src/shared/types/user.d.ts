declare module "UserType";

type UserType = {
  login: string;
  password: string;
  admin: {} | null;
  student: {} | null;
  teacher: {} | null;
};

export default UserType;
