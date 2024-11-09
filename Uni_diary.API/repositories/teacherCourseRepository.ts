import { Teacher_Course } from "../dbModels/teacher_course";
import { v4 as uuidv4 } from "uuid";
import GenericRepository from "./GenericRepository";
import { WhereOptions } from "sequelize";
import { Teacher } from "../dbModels/teacher";

export default class TeacherCourseRepository extends GenericRepository {
  constructor() {
    super(Teacher_Course);
  }

  //GET by id
  async getById(id: uuidv4): Promise<string> {
    const data = await this.model.findOne({
      where: { id: id },
      include: [Teacher],
    });
    return JSON.stringify(data);
  }

  //PAGINATE
  async paginate(
    predicate: WhereOptions<any>,
    include: any,
    params: { limit: number; page: number; courseId: uuidv4 }
  ): Promise<string> {
    const data = await super.paginate(
      { courseId: params.courseId },
      [Teacher],
      params
    );
    return data;
  }
}
