import { v4 as uuidv4 } from "uuid";
import GenericRepository from "./GenericRepository";
import { User } from "../dbModels/user";
import { Teacher } from "../dbModels/teacher";
import { Student } from "../dbModels/student";
import createHttpError = require("http-errors");
import { Admin } from "../dbModels/admin";

const repo = new GenericRepository(User);

const UserIsTaken = async (id: uuidv4, next) => {
  const search = await repo.getByPredicate({ id: id }, [
    Admin,
    Teacher,
    Student,
  ]);
  if (search == "[]") {
    next(createHttpError(404, "user doesn't exists"));
  }
  const { admin, student, teacher } = JSON.parse(search[0]);
  if (admin || student || teacher) {
    return true;
  }
  return false;
};

export const UserExists = async (login: string, password: string) => {
  const data = await repo.getByPredicate(
    { login: login, password: password },
    []
  );
  if (data != "[]") {
    return true;
  }
  return false;
};

export default UserIsTaken;
