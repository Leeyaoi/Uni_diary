import * as express from "express";
import { User } from "../dbModels/user";
import CreateUserDto from "../DTOs/UserDtos/CreateUserDto";
import { v4 as uuidv4 } from "uuid";
import GenericRepository from "../repositories/GenericRepository";
import UpdateUserDto from "../DTOs/UserDtos/UpdateUserDto";

const repo = new GenericRepository(User);
const userController = express.Router();
const urlencodedParser = express.urlencoded({ extended: false });

//POST
userController.post(
  "/",
  urlencodedParser,
  async (
    req: express.Request<{}, {}, CreateUserDto>,
    res: express.Response
  ) => {
    const newUser = {
      ...req.body,
      id: uuidv4(),
    };

    const data = await repo.create(newUser);
    res.send(data);
  }
);

//GET
userController.get("/", async (_, res: express.Response) => {
  const data = await repo.getAll();
  res.send(data);
});

//GET by id
userController.get(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.getById(id);
    res.send(data);
  }
);

//DELETE
userController.delete(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.delete(id);
    res.send(data);
  }
);

//PUT
userController.put(
  "/:id",
  urlencodedParser,
  async (
    req: express.Request<{}, uuidv4, UpdateUserDto>,
    res: express.Response
  ) => {
    const id = req.params.id;
    const newUser = req.body as object;

    const data = await repo.update(newUser, id);
    res.send(data);
  }
);

export default userController;
