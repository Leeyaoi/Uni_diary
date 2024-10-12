import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConnection";

export const Group = sequelize.define("group", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  num: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
