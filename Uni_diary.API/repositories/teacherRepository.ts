import { Teacher } from "../dbModels/teacher";
import { v4 as uuidv4, validate } from "uuid";
import GenericRepository from "./GenericRepository";
import { WhereOptions } from "sequelize";
import { User } from "../dbModels/user";

export default class TeacherRepository extends GenericRepository {
  constructor() {
    super(Teacher);
  }

  //GET by id
  async getById(id: uuidv4): Promise<string> {
    const data = await this.model.findOne({
      where: { id: id },
      include: [User],
    });
    return JSON.stringify(data);
  }

  //PAGINATE
  async paginate(
    predicate: WhereOptions<any>,
    include: any,
    params: { limit: number; page: number }
  ): Promise<string> {
    const data = await super.paginate({}, [User], params);
    return data;
  }
}
