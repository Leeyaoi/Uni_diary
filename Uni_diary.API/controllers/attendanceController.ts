import * as express from "express";
import { v4 as uuidv4, validate } from "uuid";
import { Attendance } from "../dbModels/attendance";
import CreateAttendanceDto from "../DTOs/AttendanceDtos/CreateAttendanceDto";
import UpdateAttendanceDto from "../DTOs/AttendanceDtos/UpdateAttendanceDto";
import GenericRepository from "../repositories/GenericRepository";
import { UpdateAdminValidator } from "../validators/AdminValidators/UpdateAdminValidator";
import { CreateAttendanceValidator } from "../validators/AttendanceValidators/CreateAttendanceValidator";
import GenericController from "./genericController";
import { Student } from "../dbModels/student";
import StudentRepository from "../repositories/studentRepository";
import { where } from "sequelize";

const repo = new GenericRepository(Attendance);
const studRepo = new StudentRepository();

const attendanceController = new GenericController<
  CreateAttendanceDto,
  UpdateAttendanceDto
>(CreateAttendanceValidator, UpdateAdminValidator, repo).GenerateController();

attendanceController.delete(
  "/group/:dateWhen/:courseId",
  async (req: express.Request, res: express.Response, next) => {
    const courseId = req.params.courseId;
    const dateWhen = req.params.dateWhen;
    if (!validate(courseId)) {
      res.sendStatus(400);
      return;
    }
    const attendance = JSON.parse(
      await repo.getByPredicate({ courseId, dateWhen }, [])
    ) as any[];
    attendance.forEach(async (element) => {
      await repo.delete(element.id);
    });
    res.send({ deletedRows: attendance.length });
  }
);

attendanceController.get(
  "/group/:dateWhen/:courseId",
  async (req: express.Request, res: express.Response, next) => {
    const courseId = req.params.courseId;
    const dateWhen = req.params.dateWhen;
    if (!validate(courseId)) {
      res.sendStatus(400);
      return;
    }
    const attendance = JSON.parse(
      await studRepo.getByPredicate({}, [
        { model: Attendance, where: { courseId, dateWhen } },
      ])
    );
    res.send(attendance);
  }
);

export default attendanceController;
