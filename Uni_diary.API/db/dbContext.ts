import { sequelize } from "./dbConnection";
import { Admin } from "../dbModels/admin";
import { User } from "../dbModels/user";
import { Faculty } from "../dbModels/faculty";
import { Profession } from "../dbModels/profession";
import { Group } from "../dbModels/group";
import { Student } from "../dbModels/student";
import { Teacher } from "../dbModels/teacher";
import { Course } from "../dbModels/course";
import { Group_Course } from "../dbModels/group_course";
import { Teacher_Course } from "../dbModels/teacher_course";
import { Attendance } from "../dbModels/attendance";
import { Mark } from "../dbModels/mark";
import { Class } from "../dbModels/class";
import { Timetable } from "../dbModels/timetable";
import { Sequelize } from "sequelize";

export const DbSynchronize = (force = false): Promise<Sequelize> => {
  Faculty.hasOne(Admin);
  Faculty.hasMany(Profession);

  Group.hasMany(Student);
  Group.hasMany(Timetable);

  Profession.hasMany(Group);

  Student.hasMany(Attendance);
  Student.hasMany(Mark);

  Teacher.hasMany(Class);

  Course.hasMany(Attendance);
  Course.hasMany(Mark);
  Course.hasMany(Class);

  Timetable.hasMany(Class);

  User.hasOne(Admin);
  User.hasOne(Teacher);
  User.hasOne(Student);

  Course.belongsToMany(Group, { through: Group_Course });
  Group.belongsToMany(Course, { through: Group_Course });

  Course.belongsToMany(Teacher, { through: Teacher_Course });
  Teacher.belongsToMany(Course, { through: Teacher_Course });

  return sequelize.sync({ force: force });
};
