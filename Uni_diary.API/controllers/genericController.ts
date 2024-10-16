import * as express from "express";
import { v4 as uuidv4 } from "uuid";
import GenericRepository from "../repositories/GenericRepository";
import { ModelStatic, Model } from "sequelize";
import { checkSchema, Schema, validationResult } from "express-validator";
import * as createError from "http-errors";
import createHttpError = require("http-errors");

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
        res: express.Response,
        next
      ) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          next(createHttpError(400, "Validation error"));
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
      async (
        req: express.Request<{}, uuidv4, {}>,
        res: express.Response,
        next
      ) => {
        const id = req.params.id;

        const data = await this.repo.getById(id);
        if (data != "null") {
          res.send(data);
        } else {
          next(createHttpError(404, "Resourse have not been found"));
        }
      }
    );

    //DELETE
    this.controller.delete(
      "/:id",
      async (
        req: express.Request<{}, uuidv4, {}>,
        res: express.Response,
        next
      ) => {
        const id = req.params.id;

        const data = await this.repo.delete(id);
        if (data) {
          res.send({ message: "Resource deleted" });
        } else {
          next(createHttpError(404, "Resourse have not been found"));
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
        res: express.Response,
        next
      ) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          next(createHttpError(400, "Validation error"));
        }

        const id = req.params.id;
        const newModel = req.body as object;

        const data = await this.repo.update(newModel, id);
        if (data != "null") {
          res.send(data);
        } else {
          next(createHttpError(404, "Resourse have not been found"));
        }
      }
    );

    return this.controller;
  }
}

export default GenericController;
