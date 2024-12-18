import { Model, ModelStatic, Op, or, WhereOptions } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import PaginatedDto from "../DTOs/PaginatedDto";

export default class GenericRepository {
  protected model: ModelStatic<Model>;

  constructor(model: ModelStatic<Model>) {
    this.model = model;
  }

  //POST
  async create(newEntity: any): Promise<string> {
    await this.model.create(newEntity);
    return JSON.stringify(newEntity);
  }

  //GET
  async getAll(): Promise<string> {
    const data = await this.model.findAll();
    return JSON.stringify(data);
  }

  //GET by id
  async getById(id: uuidv4): Promise<string> {
    const data = await this.model.findOne({ where: { id: id } });
    return JSON.stringify(data);
  }

  //PUT
  async update(newEntity: any, id: uuidv4): Promise<string> {
    this.model.update(newEntity, { where: { id: id } });
    const data = await this.model.findOne({ where: { id: id } });
    return JSON.stringify(data);
  }

  //DELETE
  async delete(id: uuidv4): Promise<string> {
    const data = await this.model.destroy({ where: { id: id } });
    return JSON.stringify(data);
  }

  //PAGINATE
  async paginate(
    predicate: WhereOptions<any>,
    include: any,
    params: { limit: number; page: number }
  ): Promise<string> {
    const { count, rows } = await this.model.findAndCountAll({
      where: predicate,
      include: include,
      offset: (params.page - 1) * params.limit,
      limit: params.limit,
      order: [["id", "DESC"]],
    });
    let pageCount = 0;
    if (count % params.limit == 0) {
      pageCount = Math.floor(count / params.limit);
    } else {
      pageCount = Math.floor(count / params.limit) + 1;
    }
    const data: PaginatedDto = {
      limit: params.limit,
      pageNum: params.page,
      pageCount: pageCount,
      total: count,
      items: rows,
    };
    return JSON.stringify(data);
  }

  //GET BY PREDICATE
  async getByPredicate(
    predicate: WhereOptions<any>,
    include: any,
    order?: any[]
  ): Promise<string> {
    const data = await this.model.findAll({
      where: predicate,
      include: include,
      order: order,
    });
    return JSON.stringify(data);
  }
}
