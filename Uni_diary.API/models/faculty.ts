import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConnection";

export const Faculty = sequelize.define("faculty", {
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
