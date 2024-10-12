import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConnection";

export const Timetable = sequelize.define("timetable", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  day: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  fullGroup: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});
