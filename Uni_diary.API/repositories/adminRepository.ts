import { Admin } from "../dbModels/admin";
import { v4 as uuidv4 } from "uuid";
import GenericRepository from "./GenericRepository";
import { WhereOptions } from "sequelize";
import { User } from "../dbModels/user";

export default class AdminRepository extends GenericRepository {
  constructor() {
    super(Admin);
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
