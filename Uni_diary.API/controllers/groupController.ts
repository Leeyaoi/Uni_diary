import * as express from "express";
import { Group } from "../dbModels/group";
import CreateGroupDto from "../DTOs/GroupDtos/CreateGroupDto";
import UpdateGroupDto from "../DTOs/GroupDtos/UpdateGroupDto";
import { v4 as uuidv4 } from "uuid";
import GenericRepository from "../repositories/GenericRepository";

const repo = new GenericRepository(Group);
const groupController = express.Router();
const urlencodedParser = express.urlencoded({ extended: false });

//POST
groupController.post(
  "/",
  urlencodedParser,
  async (
    req: express.Request<{}, {}, CreateGroupDto>,
    res: express.Response
  ) => {
    const newGroup = {
      ...req.body,
      id: uuidv4(),
    };

    const data = await repo.create(newGroup);
    res.send(data);
  }
);

//GET
groupController.get("/", async (_, res: express.Response) => {
  const data = await repo.getAll();
  res.send(data);
});

//GET by id
groupController.get(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.getById(id);
    res.send(data);
  }
);

//DELETE
groupController.delete(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.delete(id);
    res.send(data);
  }
);

//PUT
groupController.put(
  "/:id",
  urlencodedParser,
  async (
    req: express.Request<{}, uuidv4, UpdateGroupDto>,
    res: express.Response
  ) => {
    const id = req.params.id;
    const newGroup = req.body as object;

    const data = await repo.update(newGroup, id);
    res.send(data);
  }
);

export default groupController;
