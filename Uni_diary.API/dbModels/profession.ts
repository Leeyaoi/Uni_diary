import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConnection";

export const Profession = sequelize.define("profession", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
