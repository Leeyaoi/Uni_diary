import { Timetable } from "../dbModels/timetable";
import { v4 as uuidv4 } from "uuid";
import GenericRepository from "./GenericRepository";
import { Class } from "../dbModels/class";
import { Teacher } from "../dbModels/teacher";
import { Course } from "../dbModels/course";
import { Group } from "../dbModels/group";
import { Op } from "sequelize";

export default class TimetableRepository extends GenericRepository {
  constructor() {
    super(Timetable);
  }

  //GET by id
  async getById(id: uuidv4): Promise<string> {
    const data = await this.model.findOne({
      where: { id: id },
      include: [{ model: Class, include: [Teacher, Course] }, Group],
    });
    return JSON.stringify(data);
  }

  async getDay(id: uuidv4): Promise<number> {
    const data = (await this.model.findByPk(id)) as any;
    return data.day;
  }

  async deleteByGroupId(groupId: uuidv4): Promise<void> {
    await this.model.destroy({ where: { groupId: groupId } });
  }

  async getOtherWeeksId(timetableId: uuidv4): Promise<uuidv4> {
    const timetable = (await this.model.findOne({
      where: { id: timetableId },
    })) as any;
    const day = (timetable.day + 7) % 14;
    const data = (await this.model.findOne({
      where: { groupId: timetable.groupId, day },
    })) as any;
    return data.id;
  }

  //GET by groupId
  async getByGroupId(groupId: uuidv4, bottomWeek: boolean): Promise<string> {
    if (bottomWeek) {
      return await super.getByPredicate(
        {
          groupId: groupId,
          day: {
            [Op.gt]: 7,
          },
        },
        [
          {
            model: Class,
            include: [Teacher, Course],
            order: [["number", "ASC"]],
          },
          Group,
        ],
        [["day", "ASC"]]
      );
    }

    return await super.getByPredicate(
      {
        groupId: groupId,
        day: {
          [Op.lt]: 7,
        },
      },
      [
        {
          model: Class,
          include: [Teacher, Course],
          order: [["number", "ASC"]],
        },
        Group,
      ],
      [["day", "ASC"]]
    );
  }
}
