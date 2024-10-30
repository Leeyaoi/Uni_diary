import { Student } from "../dbModels/student";
import { v4 as uuidv4 } from "uuid";
import GenericRepository from "./GenericRepository";
import { Group } from "../dbModels/group";

export default class StudentRepository extends GenericRepository {
  constructor() {
    super(Student);
  }

  //GET by id
  async getById(id: uuidv4): Promise<string> {
    const data = await this.model.findOne({
      where: { id: id },
      include: [Group],
    });
    return JSON.stringify(data);
  }
}
