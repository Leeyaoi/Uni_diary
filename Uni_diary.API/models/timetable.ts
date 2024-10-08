import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConnection";

export const Timetable = sequelize.define("timetable", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  dateWhen: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  classNum: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
});
