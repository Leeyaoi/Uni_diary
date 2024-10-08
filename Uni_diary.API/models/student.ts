import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConnection";

export const Student = sequelize.define("student", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  budget: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});
