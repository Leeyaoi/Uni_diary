import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConnection";

export const Mark = sequelize.define("mark", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  dateWhen: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  mark: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
});
