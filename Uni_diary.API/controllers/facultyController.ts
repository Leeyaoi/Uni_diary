import * as express from "express";
import { Faculty } from "../dbModels/faculty";
import CreateFacultyDto from "../DTOs/FacultyDtos/CreateFacultyDto";
import { v4 as uuidv4 } from "uuid";
import GenericRepository from "../repositories/GenericRepository";

const repo = new GenericRepository(Faculty);
const facultyController = express.Router();
const urlencodedParser = express.urlencoded({ extended: false });

//POST
facultyController.post(
  "/",
  urlencodedParser,
  async (
    req: express.Request<{}, {}, CreateFacultyDto>,
    res: express.Response
  ) => {
    const newFaculty = {
      ...req.body,
      id: uuidv4(),
    };

    const data = await repo.create(newFaculty);
    res.send(data);
  }
);

//GET
facultyController.get("/", async (_, res: express.Response) => {
  const data = await repo.getAll();
  res.send(data);
});

//GET by id
facultyController.get(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.getById(id);
    res.send(data);
  }
);

//DELETE
facultyController.delete(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.delete(id);
    res.send(data);
  }
);

//PUT
facultyController.put(
  "/:id",
  urlencodedParser,
  async (
    req: express.Request<{}, uuidv4, CreateFacultyDto>,
    res: express.Response
  ) => {
    const id = req.params.id;
    const newFaculty = req.body as object;

    const data = await repo.update(newFaculty, id);
    res.send(data);
  }
);

export default facultyController;
