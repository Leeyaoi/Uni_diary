import * as express from "express";
import { Teacher } from "../dbModels/teacher";
import CreateTeacherDto from "../DTOs/TeacherDtos/CreateTeacherDto";
import { v4 as uuidv4 } from "uuid";
import GenericRepository from "../repositories/GenericRepository";
import UpdateTeacherDto from "../DTOs/TeacherDtos/UpdateTeacherDto";

const repo = new GenericRepository(Teacher);
const teacherController = express.Router();
const urlencodedParser = express.urlencoded({ extended: false });

//POST
teacherController.post(
  "/",
  urlencodedParser,
  async (
    req: express.Request<{}, {}, CreateTeacherDto>,
    res: express.Response
  ) => {
    const newTeacher = {
      ...req.body,
      id: uuidv4(),
    };

    const data = await repo.create(newTeacher);
    res.send(data);
  }
);

//GET
teacherController.get("/", async (_, res: express.Response) => {
  const data = await repo.getAll();
  res.send(data);
});

//GET by id
teacherController.get(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.getById(id);
    res.send(data);
  }
);

//DELETE
teacherController.delete(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.delete(id);
    res.send(data);
  }
);

//PUT
teacherController.put(
  "/:id",
  urlencodedParser,
  async (
    req: express.Request<{}, uuidv4, UpdateTeacherDto>,
    res: express.Response
  ) => {
    const id = req.params.id;
    const newTeacher = req.body as object;

    const data = await repo.update(newTeacher, id);
    res.send(data);
  }
);

export default teacherController;
