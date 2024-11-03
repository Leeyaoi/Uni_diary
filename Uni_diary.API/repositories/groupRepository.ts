import { Group } from "../dbModels/group";
import { v4 as uuidv4, validate } from "uuid";
import GenericRepository from "./GenericRepository";
import { WhereOptions } from "sequelize";

export default class GroupRepository extends GenericRepository {
  constructor() {
    super(Group);
  }

  //PAGINATE
  async paginate(
    predicate: WhereOptions<any>,
    include: any,
    params: { limit: number; page: number; professionId: uuidv4 }
  ): Promise<string> {
    if (!validate(params.professionId)) {
      params.professionId = uuidv4();
    }
    const data = await super.paginate(
      { professionId: params.professionId },
      [],
      params
    );
    return data;
  }
}
