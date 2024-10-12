import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConnection";

export const Teacher_Course = sequelize.define("m2m_teacher_course", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  hours: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});
