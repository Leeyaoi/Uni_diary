import * as express from "express";
import { Teacher_Course } from "../dbModels/teacher_course";
import CreateTeacherCourseDto from "../DTOs/TeacherCourseDtos/CreateTeacherCourseDto";
import { v4 as uuidv4 } from "uuid";
import GenericRepository from "../repositories/GenericRepository";
import UpdateTeacherCourseDto from "../DTOs/TeacherCourseDtos/UpdateTeacherCourseDto";

const repo = new GenericRepository(Teacher_Course);
const teacherCourseController = express.Router();
const urlencodedParser = express.urlencoded({ extended: false });

//POST
teacherCourseController.post(
  "/",
  urlencodedParser,
  async (
    req: express.Request<{}, {}, CreateTeacherCourseDto>,
    res: express.Response
  ) => {
    const newTeacherCourse = {
      ...req.body,
      id: uuidv4(),
    };

    const data = await repo.create(newTeacherCourse);
    res.send(data);
  }
);

//GET
teacherCourseController.get("/", async (_, res: express.Response) => {
  const data = await repo.getAll();
  res.send(data);
});

//GET by id
teacherCourseController.get(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.getById(id);
    res.send(data);
  }
);

//DELETE
teacherCourseController.delete(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.delete(id);
    res.send(data);
  }
);

//PUT
teacherCourseController.put(
  "/:id",
  urlencodedParser,
  async (
    req: express.Request<{}, uuidv4, UpdateTeacherCourseDto>,
    res: express.Response
  ) => {
    const id = req.params.id;
    const newTeacherCourse = req.body as object;

    const data = await repo.update(newTeacherCourse, id);
    res.send(data);
  }
);

export default teacherCourseController;
