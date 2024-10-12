import * as express from "express";
import { Mark } from "../dbModels/mark";
import CreateMarkDto from "../DTOs/MarkDtos/CreateMarkDto";
import UpdateMarkDto from "../DTOs/MarkDtos/UpdateMarkDto";
import { v4 as uuidv4 } from "uuid";
import GenericRepository from "../repositories/GenericRepository";

const repo = new GenericRepository(Mark);
const markController = express.Router();
const urlencodedParser = express.urlencoded({ extended: false });

//POST
markController.post(
  "/",
  urlencodedParser,
  async (
    req: express.Request<{}, {}, CreateMarkDto>,
    res: express.Response
  ) => {
    const newMark = {
      ...req.body,
      id: uuidv4(),
    };

    const data = await repo.create(newMark);
    res.send(data);
  }
);

//GET
markController.get("/", async (_, res: express.Response) => {
  const data = await repo.getAll();
  res.send(data);
});

//GET by id
markController.get(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.getById(id);
    res.send(data);
  }
);

//DELETE
markController.delete(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.delete(id);
    res.send(data);
  }
);

//PUT
markController.put(
  "/:id",
  urlencodedParser,
  async (
    req: express.Request<{}, uuidv4, UpdateMarkDto>,
    res: express.Response
  ) => {
    const id = req.params.id;
    const newMark = req.body as object;

    const data = await repo.update(newMark, id);
    res.send(data);
  }
);

export default markController;
