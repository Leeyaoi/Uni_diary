import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConnection";

export const Admin = sequelize.define("admin", {
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
});
