import { Profession } from "../dbModels/profession";
import { v4 as uuidv4, validate } from "uuid";
import GenericRepository from "./GenericRepository";
import { WhereOptions } from "sequelize";
import { Group } from "../dbModels/group";

export default class ProfessionRepository extends GenericRepository {
  constructor() {
    super(Profession);
  }

  //GET by id
  async getById(id: uuidv4): Promise<string> {
    const data = await this.model.findOne({
      where: { id: id },
      include: [Group],
    });
    return JSON.stringify(data);
  }

  //PAGINATE
  async paginate(
    predicate: WhereOptions<any>,
    include: any,
    params: { limit: number; page: number; facultyId: uuidv4 }
  ): Promise<string> {
    if (!validate(params.facultyId)) {
      params.facultyId = uuidv4();
    }
    const data = await super.paginate(
      { facultyId: params.facultyId },
      [],
      params
    );
    return data;
  }
}
