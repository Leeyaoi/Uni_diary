import * as express from "express";
import { v4 as uuidv4 } from "uuid";
import GenericRepository from "../repositories/GenericRepository";
import { ModelStatic, Model } from "sequelize";
import {
  checkSchema,
  ResultFactory,
  Schema,
  validationResult,
} from "express-validator";
import createHttpError = require("http-errors");

export const myValidationResult: ResultFactory<string> =
  validationResult.withDefaults({
    formatter: (error) => error.msg as string,
  });

class GenericController<CreateDto, UpdateDto> {
  controller: express.Router;
  urlencodedParser: any;

  constructor(
    private createValidator: Schema,
    private updateValidator: Schema,
    private repo: GenericRepository
  ) {
    this.controller = express.Router();
    this.urlencodedParser = express.urlencoded({ extended: false });
  }

  public GenerateController() {
    //POST
    this.controller.post(
      "/post",
      this.urlencodedParser,
      checkSchema(this.createValidator),
      async (
        req: express.Request<{}, {}, CreateDto>,
        res: express.Response,
        next
      ) => {
        const errors: string[] = myValidationResult(req).array();
        if (errors.length != 0) {
          next(createHttpError(400, JSON.stringify(errors)));
          return;
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
    this.controller.get(
      "/",
      this.urlencodedParser,
      async (_, res: express.Response) => {
        const data = await this.repo.getAll();
        res.send(data);
      }
    );

    //Paginate
    this.controller.post(
      "/paginate",
      this.urlencodedParser,
      async (
        req: express.Request<
          {},
          {},
          { limit: number | null; page: number | null }
        >,
        res: express.Response
      ) => {
        if (req.body.limit && req.body.page) {
          const data = await this.repo.paginate({}, [], req.body);
          res.send(data);
        } else {
          const data = await this.repo.getAll();
          res.send(data);
        }
      }
    );

    //GET by id
    this.controller.get(
      "/:id",
      async (
        req: express.Request<{ id: uuidv4 }, uuidv4, {}>,
        res: express.Response,
        next
      ) => {
        const id = req.params.id;

        const data = await this.repo.getById(id);
        if (data != "null") {
          res.send(data);
        } else {
          next(createHttpError(404, "Resourse have not been found"));
          return;
        }
      }
    );

    //DELETE
    this.controller.delete(
      "/:id",
      async (
        req: express.Request<{ id: uuidv4 }, uuidv4, {}>,
        res: express.Response,
        next
      ) => {
        const id = req.params.id;

        const data = await this.repo.delete(id);
        if (data) {
          res.send({ message: "Resource deleted" });
        } else {
          next(createHttpError(404, "Resourse have not been found"));
          return;
        }
      }
    );

    //PUT
    this.controller.put(
      "/:id",
      this.urlencodedParser,
      checkSchema(this.updateValidator),
      async (
        req: express.Request<{ id: uuidv4 }, uuidv4, UpdateDto>,
        res: express.Response,
        next
      ) => {
        const errors: string[] = myValidationResult(req).array();
        if (errors.length != 0) {
          next(createHttpError(400, JSON.stringify(errors)));
          return;
        }

        const id = req.params.id;
        const newModel = req.body as object;

        const data = await this.repo.update(newModel, id);
        if (data != "null") {
          res.send(data);
        } else {
          next(createHttpError(404, "Resourse have not been found"));
          return;
        }
      }
    );

    return this.controller;
  }
}

export default GenericController;
