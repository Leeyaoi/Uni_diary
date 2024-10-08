import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConnection";

export const Attendance = sequelize.define("attendance", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  dateWhen: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});
