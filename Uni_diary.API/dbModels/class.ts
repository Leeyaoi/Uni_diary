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
  fullGroup: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  firstHalf: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
