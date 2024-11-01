import FacultyType from "./faculty";

declare module "AdminType";

type AdminType = {
  name: string;
  surname: string;
  faculty: FacultyType;
};

export default AdminType;
