import * as express from "express";
import { v4 as uuidv4 } from "uuid";
import GenericRepository from "../repositories/GenericRepository";
import { ModelStatic, Model, where } from "sequelize";

class GenericController<CreateDto, UpdateDto> {
  repo = {} as GenericRepository;
  controller = express.Router();
  urlencodedParser = express.urlencoded({ extended: false });

  constructor(entity: ModelStatic<Model>) {
    this.repo = new GenericRepository(entity);
  }

  public GenerateController() {
    //POST
    this.controller.post(
      "/",
      this.urlencodedParser,
      async (
        req: express.Request<{}, {}, CreateDto>,
        res: express.Response
      ) => {
        const newModel = {
          ...req.body,
          id: uuidv4(),
        };

        const data = await this.repo.create(newModel);
        res.send(data);
      }
    );

    //GET
    this.controller.get("/", async (_, res: express.Response) => {
      const data = await this.repo.getAll();
      res.send(data);
    });

    //GET by id
    this.controller.get(
      "/:id",
      async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
        const id = req.params.id;

        const data = await this.repo.getById(id);
        res.send(data);
      }
    );

    //DELETE
    this.controller.delete(
      "/:id",
      async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
        const id = req.params.id;

        const data = await this.repo.delete(id);
        res.send(data);
      }
    );

    //PUT
    this.controller.put(
      "/:id",
      this.urlencodedParser,
      async (
        req: express.Request<{}, uuidv4, UpdateDto>,
        res: express.Response
      ) => {
        const id = req.params.id;
        const newModel = req.body as object;

        const data = await this.repo.update(newModel, id);
        res.send(JSON.stringify(data));
      }
    );

    return this.controller;
  }
}

export default GenericController;
