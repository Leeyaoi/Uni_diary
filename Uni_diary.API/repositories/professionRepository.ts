import { Profession } from "../dbModels/profession";
import { v4 as uuidv4 } from "uuid";
import GenericRepository from "./GenericRepository";
import { WhereOptions } from "sequelize";

export default class ProfessionRepository extends GenericRepository {
  constructor() {
    super(Profession);
  }

  //PAGINATE
  async paginate(
    predicate: WhereOptions<any>,
    include: any,
    params: { limit: number; page: number; facultyId: uuidv4 }
  ): Promise<string> {
    const data = await super.paginate(
      { facultyId: params.facultyId },
      [],
      params
    );
    return data;
  }
}
