import { Model, ModelStatic, WhereOptions } from "sequelize";
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
    });
    const data: PaginatedDto = {
      limit: params.limit,
      pageNum: params.page,
      pageCount: Math.floor(count / params.limit) + 1,
      total: count,
      items: rows,
    };
    return JSON.stringify(data);
  }

  //GET BY PREDICATE
  async getByPredicate(
    predicate: WhereOptions<any>,
    include: any
  ): Promise<string> {
    const data = await this.model.findAll({
      where: predicate,
      include: include,
    });
    return JSON.stringify(data);
  }
}
