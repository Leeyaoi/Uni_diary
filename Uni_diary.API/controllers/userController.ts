import * as express from "express";
import * as jwt from "jsonwebtoken";
import createHttpError = require("http-errors");
import { v4 as uuidv4 } from "uuid";
import CreateUserDto from "../DTOs/UserDtos/CreateUserDto";
import UpdateUserDto from "../DTOs/UserDtos/UpdateUserDto";
import { CreateUserValidator } from "../validators/UserValidators/CreateUserValidator";
import { UpdateUserValidator } from "../validators/UserValidators/UpdateUserValidator";
import GenericController, { myValidationResult } from "./genericController";
import { checkSchema, validationResult } from "express-validator";
import GenericRepository from "../repositories/GenericRepository";
import { Teacher } from "../dbModels/teacher";
import { Admin } from "../dbModels/admin";
import { Student } from "../dbModels/student";
import UserRepository, { UserExists } from "../repositories/userRepository";
import { Group } from "../dbModels/group";
import { Profession } from "../dbModels/profession";

const urlencodedParser = express.urlencoded({ extended: false });
const repo = new UserRepository();

const userController = new GenericController<CreateUserDto, UpdateUserDto>(
  CreateUserValidator,
  UpdateUserValidator,
  repo
).GenerateController();

//AUTH
userController.post(
  "/auth",
  urlencodedParser,
  checkSchema(CreateUserValidator),
  async (
    req: express.Request<{}, {}, CreateUserDto>,
    res: express.Response,
    next
  ) => {
    const errors: string[] = myValidationResult(req).array();
    if (errors.length != 0) {
      next(createHttpError(400, JSON.stringify(errors)));
      return;
    }

    const newModel = {
      ...req.body,
    };

    const data = JSON.parse(
      await repo.getByPredicate(newModel, [
        { model: Student, include: { model: Group, include: Profession } },
        Teacher,
        Admin,
      ])
    );

    if (data.length == 0) {
      next(createHttpError(404, "NotFound"));
      return;
    }

    let type;
    if (data[0].student) {
      type = "student";
    }
    if (data[0].admin) {
      type = "admin";
    }
    if (data[0].teacher) {
      type = "teacher";
    }

    const accessToken = jwt.sign(
      { _id: data[0].id, type: type },
      process.env.API_SECRET,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      { _id: data[0].id, type: "refresh" },
      process.env.API_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.send(JSON.stringify({ ...data[0], accessToken, refreshToken }));
  }
);

//login
userController.get(
  "/login",
  urlencodedParser,
  async (
    req: express.Request<{}, {}, CreateUserDto>,
    res: express.Response,
    next
  ) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const { id } = jwt.decode(token) as jwt.JwtPayload;

    const data = JSON.parse(
      await repo.getByPredicate(
        {
          id,
        },
        [
          { model: Student, include: { model: Group, include: Profession } },
          Teacher,
          Admin,
        ]
      )
    );

    if (data.length == 0) {
      next(createHttpError(404, "NotFound"));
      return;
    }

    let type;
    if (data[0].student) {
      type = "student";
    }
    if (data[0].admin) {
      type = "admin";
    }
    if (data[0].teacher) {
      type = "teacher";
    }

    const accessToken = jwt.sign(
      { id: data[0].id, type: type },
      process.env.API_SECRET,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      { id: data[0].id, type: "refresh" },
      process.env.API_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.send(JSON.stringify({ ...data[0], accessToken, refreshToken }));
  }
);

//refreshToken
userController.get(
  "/refreshToken",
  urlencodedParser,
  async (
    req: express.Request<{}, {}, CreateUserDto>,
    res: express.Response,
    next
  ) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const { id } = jwt.decode(token) as jwt.JwtPayload;

    const data = JSON.parse(
      await repo.getByPredicate(
        {
          id,
        },
        [
          { model: Student, include: { model: Group, include: Profession } },
          Teacher,
          Admin,
        ]
      )
    );

    if (data.length == 0) {
      next(createHttpError(404, "NotFound"));
      return;
    }

    let type;
    if (data[0].student) {
      type = "student";
    }
    if (data[0].admin) {
      type = "admin";
    }
    if (data[0].teacher) {
      type = "teacher";
    }

    const accessToken = jwt.sign(
      { id: data[0].id, type: type },
      process.env.API_SECRET,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      { id: data[0].id, type: "refresh" },
      process.env.API_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.send(JSON.stringify({ ...data[0], accessToken, refreshToken }));
  }
);

userController.post(
  "/",
  express.urlencoded({ extended: false }),
  checkSchema(CreateUserValidator),
  async (
    req: express.Request<{}, {}, CreateUserDto>,
    res: express.Response,
    next
  ) => {
    const errors: string[] = myValidationResult(req).array();
    if (errors.length != 0) {
      next(createHttpError(400, JSON.stringify(errors)));
      return;
    }

    const repo = new GenericRepository(Teacher);

    const newModel = {
      ...req.body,
      id: uuidv4(),
    };

    if (await UserExists(newModel.userId, next)) {
      next(createHttpError(400, "this user is already exists"));
      return;
    }

    const data = await repo.create(newModel);
    res.send(data);
  }
);

export default userController;
