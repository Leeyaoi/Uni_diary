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
  Attendance.belongsTo(Student);
  Admin.belongsTo(User);

  Faculty.hasOne(Admin);
  Faculty.hasMany(Profession);

  Group.hasMany(Student);
  Group.hasMany(Timetable);
  Group.belongsTo(Profession);

  Profession.hasMany(Group);

  Student.hasMany(Attendance);
  Student.hasMany(Mark);
  Student.belongsTo(Group);
  Student.belongsTo(User);

  Teacher.hasMany(Class);
  Teacher.belongsTo(User);

  Course.hasMany(Attendance);
  Course.hasMany(Mark);
  Course.hasMany(Class);

  Timetable.hasMany(Class);
  Timetable.belongsTo(Group);

  Class.belongsTo(Teacher);
  Class.belongsTo(Course);
  Class.belongsTo(Timetable);

  User.hasOne(Admin);
  User.hasOne(Teacher);
  User.hasOne(Student);

  Course.belongsToMany(Group, { through: Group_Course });
  Group.belongsToMany(Course, { through: Group_Course });

  Course.belongsToMany(Teacher, { through: Teacher_Course });
  Teacher.belongsToMany(Course, { through: Teacher_Course });

  Group_Course.belongsTo(Course);
  Group_Course.belongsTo(Group);

  Teacher_Course.belongsTo(Course);
  Teacher_Course.belongsTo(Teacher);

  return sequelize.sync({ force: force });
};
