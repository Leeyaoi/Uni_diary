import { sequelize } from "./dbConnection";
import { Admin } from "../models/admin";
import { User } from "../models/user";
import { Faculty } from "../models/faculty";
import { Profession } from "../models/profession";
import { Group } from "../models/group";
import { Student } from "../models/student";
import { Teacher } from "../models/teacher";
import { Course } from "../models/course";
import { Group_Course } from "../models/group_course";
import { Teacher_Course } from "../models/teacher_course";
import { Attendance } from "../models/attendance";
import { Mark } from "../models/mark";
import { Class } from "../models/class";
import { Timetable } from "../models/timetable";
import { Sequelize } from "sequelize";

export const DbSynchronize = (force = false): Promise<Sequelize> => {
  Admin.hasOne(User);

  Faculty.hasOne(Admin);
  Faculty.hasMany(Profession);

  Group.hasMany(Student);
  Group.hasMany(Timetable);

  Profession.hasMany(Group);

  Student.hasOne(User);
  Student.hasMany(Attendance);
  Student.hasMany(Mark);

  Teacher.hasOne(User);
  Teacher.hasMany(Class);

  Course.hasMany(Attendance);
  Course.hasMany(Mark);
  Course.hasMany(Class);

  Timetable.hasMany(Class);

  Course.belongsToMany(Group, { through: Group_Course });
  Group.belongsToMany(Course, { through: Group_Course });

  Course.belongsToMany(Teacher, { through: Teacher_Course });
  Teacher.belongsToMany(Course, { through: Teacher_Course });

  return sequelize.sync({ force: force });
};

DbSynchronize();
