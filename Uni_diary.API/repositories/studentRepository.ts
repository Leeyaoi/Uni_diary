import { Student } from "../dbModels/student";
import { v4 as uuidv4, validate } from "uuid";
import GenericRepository from "./GenericRepository";
import { Group } from "../dbModels/group";
import { WhereOptions } from "sequelize";
import { User } from "../dbModels/user";

export default class StudentRepository extends GenericRepository {
  constructor() {
    super(Student);
  }

  //GET by id
  async getById(id: uuidv4): Promise<string> {
    const data = await this.model.findOne({
      where: { id: id },
      include: [Group, User],
    });
    return JSON.stringify(data);
  }

  //PAGINATE
  async paginate(
    predicate: WhereOptions<any>,
    include: any,
    params: { limit: number; page: number; groupId: uuidv4 }
  ): Promise<string> {
    if (!validate(params.groupId)) {
      params.groupId = uuidv4();
    }
    const data = await super.paginate(
      { groupId: params.groupId },
      [User],
      params
    );
    return data;
  }
}
