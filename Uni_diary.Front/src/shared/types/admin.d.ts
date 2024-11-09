import FacultyType from "./faculty";

declare module "AdminType";

type AdminType = {
  id: string;
  name: string;
  surname: string;
  faculty: FacultyType;
  user: { id: string; login: string; password: string };
};

export default AdminType;
