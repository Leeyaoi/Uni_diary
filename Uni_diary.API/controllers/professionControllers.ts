import * as express from "express";
import { Profession } from "../dbModels/profession";
import CreateProfessionDto from "../DTOs/ProfessionDtos/CreateProfessionDto";
import { v4 as uuidv4 } from "uuid";
import GenericRepository from "../repositories/GenericRepository";
import UpdateProfessionDto from "../DTOs/ProfessionDtos/UpdateProfessionDto";

const repo = new GenericRepository(Profession);
const professionController = express.Router();
const urlencodedParser = express.urlencoded({ extended: false });

//POST
professionController.post(
  "/",
  urlencodedParser,
  async (
    req: express.Request<{}, {}, CreateProfessionDto>,
    res: express.Response
  ) => {
    const newProfession = {
      ...req.body,
      id: uuidv4(),
    };

    const data = await repo.create(newProfession);
    res.send(data);
  }
);

//GET
professionController.get("/", async (_, res: express.Response) => {
  const data = await repo.getAll();
  res.send(data);
});

//GET by id
professionController.get(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.getById(id);
    res.send(data);
  }
);

//DELETE
professionController.delete(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.delete(id);
    res.send(data);
  }
);

//PUT
professionController.put(
  "/:id",
  urlencodedParser,
  async (
    req: express.Request<{}, uuidv4, UpdateProfessionDto>,
    res: express.Response
  ) => {
    const id = req.params.id;
    const newProfession = req.body as object;

    const data = await repo.update(newProfession, id);
    res.send(data);
  }
);

export default professionController;
