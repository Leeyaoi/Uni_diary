import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";

configDotenv({ path: "./Uni_diary.API/.env" });

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
  }
);
