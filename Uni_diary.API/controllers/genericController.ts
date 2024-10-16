import * as express from "express";
import { v4 as uuidv4 } from "uuid";
import GenericRepository from "../repositories/GenericRepository";
import { ModelStatic, Model } from "sequelize";
import { checkSchema, Schema, validationResult } from "express-validator";

class GenericController<CreateDto, UpdateDto> {
  repo: GenericRepository;
  controller: express.Router;
  urlencodedParser: express.urlencoded;

  constructor(
    entity: ModelStatic<Model>,
    private createValidator: Schema,
    private updateValidator: Schema
  ) {
    this.repo = new GenericRepository(entity);
    this.controller = express.Router();
    this.urlencodedParser = express.urlencoded({ extended: false });
  }

  public GenerateController() {
    //POST
    this.controller.post(
      "/",
      this.urlencodedParser,
      checkSchema(this.createValidator),
      async (
        req: express.Request<{}, {}, CreateDto>,
        res: express.Response
      ) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

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
        if (data != "null") {
          res.send(data);
        } else {
          res.status(404).json({ message: "Resource not found" });
        }
      }
    );

    //DELETE
    this.controller.delete(
      "/:id",
      async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
        const id = req.params.id;

        const data = await this.repo.delete(id);
        if (data) {
          res.send({ message: "Resource deleted" });
        } else {
          res.status(404).json({ message: "Resource not found" });
        }
      }
    );

    //PUT
    this.controller.put(
      "/:id",
      this.urlencodedParser,
      checkSchema(this.updateValidator),
      async (
        req: express.Request<{}, uuidv4, UpdateDto>,
        res: express.Response
      ) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;
        const newModel = req.body as object;

        const data = await this.repo.update(newModel, id);
        if (data != "null") {
          res.send(data);
        } else {
          res.status(404).json({ message: "Resource not found" });
        }
      }
    );

    return this.controller;
  }
}

export default GenericController;
