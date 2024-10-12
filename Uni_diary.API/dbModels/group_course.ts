import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConnection";

export const Group_Course = sequelize.define("m2m_group_course", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  hours: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});
