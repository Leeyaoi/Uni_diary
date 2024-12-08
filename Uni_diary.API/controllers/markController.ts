import * as express from "express";
import { v4 as uuidv4, validate } from "uuid";
import { Mark } from "../dbModels/mark";
import CreateMarkDto from "../DTOs/MarkDtos/CreateMarkDto";
import UpdateMarkDto from "../DTOs/MarkDtos/UpdateMarkDto";
import GenericRepository from "../repositories/GenericRepository";
import { CreateMarkValidator } from "../validators/MarkValidators/CreateMarkValidator";
import { UpdateMarkValidator } from "../validators/MarkValidators/UpdateMarkValidator";
import GenericController from "./genericController";
import StudentRepository from "../repositories/studentRepository";
import groupCourseRepository from "../repositories/groupCourseRepository";
import { Course } from "../dbModels/course";
import { Model, where } from "sequelize";

const repo = new GenericRepository(Mark);
const studRepo = new StudentRepository();
const groupCourseRepo = new groupCourseRepository();

const markController = new GenericController<CreateMarkDto, UpdateMarkDto>(
  CreateMarkValidator,
  UpdateMarkValidator,
  repo
).GenerateController();

markController.delete(
  "/group/:dateWhen/:courseId",
  async (req: express.Request, res: express.Response, next) => {
    const courseId = req.params.courseId;
    const dateWhen = req.params.dateWhen;
    if (!validate(courseId)) {
      res.sendStatus(400);
      return;
    }
    const marks = JSON.parse(
      await repo.getByPredicate({ courseId, dateWhen }, [])
    ) as any[];
    marks.forEach(async (element) => {
      await repo.delete(element.id);
    });
    res.send({ deletedRows: marks.length });
  }
);

markController.get(
  "/group/:dateWhen/:courseId",
  async (req: express.Request, res: express.Response, next) => {
    const courseId = req.params.courseId;
    const dateWhen = req.params.dateWhen;
    if (!validate(courseId)) {
      res.sendStatus(400);
      return;
    }
    const marks = JSON.parse(
      await repo.getByPredicate({ courseId, dateWhen }, [])
    ) as any[];
    res.send(marks);
  }
);

markController.get(
  "/course/:courseId/group/:groupId",
  async (req: express.Request, res: express.Response, next) => {
    const courseId = req.params.courseId;
    const groupId = req.params.groupId;
    if (!validate(courseId) || !validate(groupId)) {
      res.sendStatus(400);
      return;
    }
    let studentsStr = await studRepo.getByPredicate({ groupId }, [Mark]);
    const students = JSON.parse(studentsStr) as any[];
    students.forEach(
      (s) => (s.marks = s.marks.filter((m) => m.courseId == courseId))
    );
    res.send(JSON.stringify(students));
  }
);

markController.get(
  "/student/:studentId",
  async (req: express.Request, res: express.Response, next) => {
    const studentId = req.params.studentId;
    if (!validate(studentId)) {
      res.sendStatus(400);
      return;
    }
    const groupId = JSON.parse(await studRepo.getById(studentId)).groupId;
    const cources = await groupCourseRepo.getByPredicate(
      { groupId },
      [
        {
          model: Course,
          include: {
            model: Mark,
            where: { studentId },
          },
        },
      ],
      [[{ model: Course }, { model: Mark }, "dateWhen", "ASC"]]
    );
    res.send(cources);
  }
);

export default markController;
