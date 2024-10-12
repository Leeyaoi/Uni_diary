import * as express from "express";
import { Student } from "../dbModels/student";
import CreateStudentDto from "../DTOs/StudentDtos/CreateStudentDto";
import { v4 as uuidv4 } from "uuid";
import GenericRepository from "../repositories/GenericRepository";
import UpdateStudentDto from "../DTOs/StudentDtos/UpdateStudentDto";

const repo = new GenericRepository(Student);
const studentController = express.Router();
const urlencodedParser = express.urlencoded({ extended: false });

//POST
studentController.post(
  "/",
  urlencodedParser,
  async (
    req: express.Request<{}, {}, CreateStudentDto>,
    res: express.Response
  ) => {
    const newStudent = {
      ...req.body,
      id: uuidv4(),
    };

    const data = await repo.create(newStudent);
    res.send(data);
  }
);

//GET
studentController.get("/", async (_, res: express.Response) => {
  const data = await repo.getAll();
  res.send(data);
});

//GET by id
studentController.get(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.getById(id);
    res.send(data);
  }
);

//DELETE
studentController.delete(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.delete(id);
    res.send(data);
  }
);

//PUT
studentController.put(
  "/:id",
  urlencodedParser,
  async (
    req: express.Request<{}, uuidv4, UpdateStudentDto>,
    res: express.Response
  ) => {
    const id = req.params.id;
    const newStudent = req.body as object;

    const data = await repo.update(newStudent, id);
    res.send(data);
  }
);

export default studentController;
