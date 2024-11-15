import * as express from "express";
import createHttpError = require("http-errors");
import CreateGroupDto from "../DTOs/GroupDtos/CreateGroupDto";
import UpdateGroupDto from "../DTOs/GroupDtos/UpdateGroupDto";
import GroupRepository from "../repositories/groupRepository";
import { CreateGroupValidator } from "../validators/GroupValidators/CreateGroupValidator";
import { UpdateGroupValidator } from "../validators/GroupValidators/UpdateGroupValidator";
import GenericController from "./genericController";
import { Op, Sequelize } from "sequelize";
import { Profession } from "../dbModels/profession";
import ProfessionRepository from "../repositories/professionRepository";

const repo = new GroupRepository();
const profRepo = new ProfessionRepository();

const groupController = new GenericController<CreateGroupDto, UpdateGroupDto>(
  CreateGroupValidator,
  UpdateGroupValidator,
  repo
).GenerateController();

groupController.get(
  "/query/:query",
  async (
    req: express.Request<{ id: string }, {}, {}>,
    res: express.Response,
    next
  ) => {
    const query = req.params.query;
    const match = query.match(/([A-ZА-ЯЁ]+)-(\d{2})(\d+)/);

    if (!match) {
      const profName = query.split("-")[0];

      const professions = await profRepo.getByPredicate(
        {
          name: { [Op.iLike]: `%${profName}%` },
        },
        []
      );

      const professionIds = JSON.parse(professions).map((prof) => prof.id);

      const data = await repo.getByPredicate(
        {
          professionId: {
            [Op.in]: professionIds, // Находим группы по ID профессий
          },
        },
        [
          {
            model: Profession,
          },
        ]
      );
      if (data != "null") {
        res.send(data);
      } else {
        next(createHttpError(404, "Resourse have not been found"));
      }
      return;
    }

    const professionName = match[1];
    const yearDigits = parseInt(match[2], 10); // Получаем последние две цифры года
    const year = yearDigits < 50 ? 2000 + yearDigits : 1900 + yearDigits; // Условие для года
    const num = parseInt(match[3], 10);

    const data = await repo.getByPredicate(
      {
        year,
        num,
      },
      [
        {
          model: Profession,
          where: {
            name: professionName,
          },
        },
      ]
    );
    if (data != "null") {
      res.send(data);
    } else {
      next(createHttpError(404, "Resourse have not been found"));
      return;
    }
  }
);

export default groupController;
