import * as express from "express";
import { Course } from "../dbModels/course";
import CreateCourseDto from "../DTOs/CourseDtos/CreateCourseDto";
import { v4 as uuidv4 } from "uuid";
import GenericRepository from "../repositories/GenericRepository";

const repo = new GenericRepository(Course);
const courseController = express.Router();
const urlencodedParser = express.urlencoded({ extended: false });

//POST
courseController.post(
  "/",
  urlencodedParser,
  async (
    req: express.Request<{}, {}, CreateCourseDto>,
    res: express.Response
  ) => {
    const newCourse = {
      ...req.body,
      id: uuidv4(),
    };

    const data = await repo.create(newCourse);
    res.send(data);
  }
);

//GET
courseController.get("/", async (_, res: express.Response) => {
  const data = await repo.getAll();
  res.send(data);
});

//GET by id
courseController.get(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.getById(id);
    res.send(data);
  }
);

//DELETE
courseController.delete(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.delete(id);
    res.send(data);
  }
);

//PUT
courseController.put(
  "/:id",
  urlencodedParser,
  async (
    req: express.Request<{}, uuidv4, CreateCourseDto>,
    res: express.Response
  ) => {
    const id = req.params.id;
    const newCourse = req.body as object;

    const data = await repo.update(newCourse, id);
    res.send(data);
  }
);

export default courseController;
