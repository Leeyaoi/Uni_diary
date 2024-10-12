import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConnection";

export const Course = sequelize.define("course", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
