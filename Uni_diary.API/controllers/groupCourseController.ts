import * as express from "express";
import { Group_Course } from "../dbModels/group_course";
import CreateGroupCourseDto from "../DTOs/GroupCourseDtos/CreateGroupCourseDto";
import UpdateGroupCourseDto from "../DTOs/GroupCourseDtos/UpdateGroupCourseDto";
import { v4 as uuidv4 } from "uuid";
import GenericRepository from "../repositories/GenericRepository";

const repo = new GenericRepository(Group_Course);
const groupCourseController = express.Router();
const urlencodedParser = express.urlencoded({ extended: false });

//POST
groupCourseController.post(
  "/",
  urlencodedParser,
  async (
    req: express.Request<{}, {}, CreateGroupCourseDto>,
    res: express.Response
  ) => {
    const newGroupCourse = {
      ...req.body,
      id: uuidv4(),
    };

    const data = await repo.create(newGroupCourse);
    res.send(data);
  }
);

//GET
groupCourseController.get("/", async (_, res: express.Response) => {
  const data = await repo.getAll();
  res.send(data);
});

//GET by id
groupCourseController.get(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.getById(id);
    res.send(data);
  }
);

//DELETE
groupCourseController.delete(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.delete(id);
    res.send(data);
  }
);

//PUT
groupCourseController.put(
  "/:id",
  urlencodedParser,
  async (
    req: express.Request<{}, uuidv4, UpdateGroupCourseDto>,
    res: express.Response
  ) => {
    const id = req.params.id;
    const newGroupCourse = req.body as object;

    const data = await repo.update(newGroupCourse, id);
    res.send(data);
  }
);

export default groupCourseController;
