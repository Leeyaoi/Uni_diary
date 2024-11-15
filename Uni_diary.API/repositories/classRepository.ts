import { Class } from "../dbModels/class";
import { v4 as uuidv4 } from "uuid";
import { Timetable } from "../dbModels/timetable";
import CreateClassDto from "../DTOs/ClassDtos/CreateClassDto";
import GenericRepository from "./GenericRepository";
import TimetableRepository from "./timetableRepository";
import { Teacher } from "../dbModels/teacher";
import { Course } from "../dbModels/course";

export default class ClassRepository extends GenericRepository {
  private timetableRepo = new TimetableRepository();
  constructor() {
    super(Class);
  }

  //GET by id
  async getById(id: uuidv4): Promise<string> {
    const data = await this.model.findOne({
      where: { id: id },
      include: [Teacher, Course],
    });
    return JSON.stringify(data);
  }

  //POST
  async create(newEntity: CreateClassDto): Promise<string> {
    await super.create(newEntity);
    if (newEntity.forBothWeeks == "true") {
      newEntity.timetableId = await this.timetableRepo.getOtherWeeksId(
        newEntity.timetableId
      );
      newEntity.id = uuidv4();
      await super.create(newEntity);
    }
    return JSON.stringify(newEntity);
  }

  async findConflictClasses(newEntity: {
    building: number;
    hall: number;
    number: number;
    day: number;
  }): Promise<string> {
    const data = await this.model.findOne({
      where: {
        building: newEntity.building,
        hall: newEntity.hall,
        number: newEntity.number,
      },
      include: [{ model: Timetable, where: { day: newEntity.day } }],
    });
    return JSON.stringify(data);
  }
}
