import * as express from "express";
import { Timetable } from "../dbModels/timetable";
import CreateTimetableDto from "../DTOs/TimetableDtos/CreateTimetableDto";
import { v4 as uuidv4 } from "uuid";
import GenericRepository from "../repositories/GenericRepository";
import UpdateTimetableDto from "../DTOs/TimetableDtos/UpdateTimetableDto";

const repo = new GenericRepository(Timetable);
const timetableController = express.Router();
const urlencodedParser = express.urlencoded({ extended: false });

//POST
timetableController.post(
  "/",
  urlencodedParser,
  async (
    req: express.Request<{}, {}, CreateTimetableDto>,
    res: express.Response
  ) => {
    const newTimetable = {
      ...req.body,
      id: uuidv4(),
    };

    const data = await repo.create(newTimetable);
    res.send(data);
  }
);

//GET
timetableController.get("/", async (_, res: express.Response) => {
  const data = await repo.getAll();
  res.send(data);
});

//GET by id
timetableController.get(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.getById(id);
    res.send(data);
  }
);

//DELETE
timetableController.delete(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.delete(id);
    res.send(data);
  }
);

//PUT
timetableController.put(
  "/:id",
  urlencodedParser,
  async (
    req: express.Request<{}, uuidv4, UpdateTimetableDto>,
    res: express.Response
  ) => {
    const id = req.params.id;
    const newTimetable = req.body as object;

    const data = await repo.update(newTimetable, id);
    res.send(data);
  }
);

export default timetableController;
