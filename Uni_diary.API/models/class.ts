import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConnection";

export const Class = sequelize.define("class", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  building: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hall: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
