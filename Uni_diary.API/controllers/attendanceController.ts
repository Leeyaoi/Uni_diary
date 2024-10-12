import * as express from "express";
import { Attendance } from "../dbModels/attendance";
import CreateAttendanceDto from "../DTOs/AttendanceDtos/CreateAttendanceDto";
import UpdateAttendanceDto from "../DTOs/AttendanceDtos/UpdateAttendanceDto";
import { v4 as uuidv4 } from "uuid";
import GenericRepository from "../repositories/GenericRepository";

const repo = new GenericRepository(Attendance);
const attendanceController = express.Router();
const urlencodedParser = express.urlencoded({ extended: false });

//POST
attendanceController.post(
  "/",
  urlencodedParser,
  async (
    req: express.Request<{}, {}, CreateAttendanceDto>,
    res: express.Response
  ) => {
    const newAttendance = {
      ...req.body,
      id: uuidv4(),
    };

    const date = await repo.create(newAttendance);
    res.send(date);
  }
);

//GET
attendanceController.get("/", async (_, res: express.Response) => {
  const data = await repo.getAll();
  res.send(data);
});

//GET by id
attendanceController.get(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.getById(id);
    res.send(data);
  }
);

//DELETE
attendanceController.delete(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.delete(id);
    res.send(data);
  }
);

//PUT
attendanceController.put(
  "/:id",
  urlencodedParser,
  async (
    req: express.Request<{}, uuidv4, UpdateAttendanceDto>,
    res: express.Response
  ) => {
    const id = req.params.id;
    const newAttendance = req.body as object;

    const data = await repo.update(newAttendance, id);
    res.send(data);
  }
);

export default attendanceController;
