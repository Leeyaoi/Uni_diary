import { Group_Course } from "../dbModels/group_course";
import { v4 as uuidv4 } from "uuid";
import GenericRepository from "./GenericRepository";
import { WhereOptions } from "sequelize";
import { Group } from "../dbModels/group";
import { Profession } from "../dbModels/profession";

export default class GroupCourseRepository extends GenericRepository {
  constructor() {
    super(Group_Course);
  }

  //GET by id
  async getById(id: uuidv4): Promise<string> {
    const data = await this.model.findOne({
      where: { id: id },
      include: [Group, Profession],
    });
    return JSON.stringify(data);
  }

  //PAGINATE
  async paginate(
    predicate: WhereOptions<any>,
    include: any,
    params: { limit: number; page: number; courseId: uuidv4 }
  ): Promise<string> {
    const data = await super.paginate(
      { courseId: params.courseId },
      [Group, Profession],
      params
    );
    return data;
  }
}
