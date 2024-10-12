import * as express from "express";
import { Class } from "../dbModels/class";
import CreateClassDto from "../DTOs/ClassDtos/CreateClassDto";
import { v4 as uuidv4 } from "uuid";
import GenericRepository from "../repositories/GenericRepository";
import UpdateClassDto from "../DTOs/ClassDtos/UpdateClassDto";

const repo = new GenericRepository(Class);
const classController = express.Router();
const urlencodedParser = express.urlencoded({ extended: false });

//POST
classController.post(
  "/",
  urlencodedParser,
  async (
    req: express.Request<{}, {}, CreateClassDto>,
    res: express.Response
  ) => {
    const newClass = {
      ...req.body,
      id: uuidv4(),
    };

    const data = await repo.create(newClass);
    res.send(data);
  }
);

//GET
classController.get("/", async (_, res: express.Response) => {
  const data = await repo.getAll();
  res.send(data);
});

//GET by id
classController.get(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.getById(id);
    res.send(data);
  }
);

//DELETE
classController.delete(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.delete(id);
    res.send(data);
  }
);

//PUT
classController.put(
  "/:id",
  urlencodedParser,
  async (
    req: express.Request<{}, uuidv4, UpdateClassDto>,
    res: express.Response
  ) => {
    const id = req.params.id;
    const newClass = req.body as object;

    const data = await repo.update(newClass, id);
    res.send(data);
  }
);

export default classController;
