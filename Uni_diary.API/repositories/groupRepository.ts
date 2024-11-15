import { Group } from "../dbModels/group";
import { v4 as uuidv4, validate } from "uuid";
import GenericRepository from "./GenericRepository";
import { WhereOptions } from "sequelize";
import TimetableRepository from "./timetableRepository";

export default class GroupRepository extends GenericRepository {
  private timetableRepo = new TimetableRepository();
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

  //POST
  async create(newEntity: any): Promise<string> {
    const group = JSON.parse(await super.create(newEntity));
    for (let i = 1; i < 14; i++) {
      if (i == 7) continue;
      this.timetableRepo.create({ groupId: group.id, day: i, id: uuidv4() });
    }
    return JSON.stringify(group);
  }

  //DELETE
  async delete(id: uuidv4): Promise<string> {
    this.timetableRepo.deleteByGroupId(id);
    const data = await this.model.destroy({ where: { id: id } });
    return JSON.stringify(data);
  }
}
