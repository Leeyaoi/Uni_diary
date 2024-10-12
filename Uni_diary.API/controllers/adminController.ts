import * as express from "express";
import { Admin } from "../dbModels/admin";
import CreateAdminDto from "../DTOs/AdminDtos/CreateAdminDto";
import { v4 as uuidv4 } from "uuid";
import UpdateAdminDto from "../DTOs/AdminDtos/UpdateAdminDto";
import GenericRepository from "../repositories/GenericRepository";

const repo = new GenericRepository(Admin);
const adminController = express.Router();
const urlencodedParser = express.urlencoded({ extended: false });

//POST
adminController.post(
  "/",
  urlencodedParser,
  async (
    req: express.Request<{}, {}, CreateAdminDto>,
    res: express.Response
  ) => {
    const newAdmin = {
      ...req.body,
      id: uuidv4(),
    };

    const data = await repo.create(newAdmin);
    res.send(data);
  }
);

//GET
adminController.get("/", async (_, res: express.Response) => {
  const data = await repo.getAll();
  res.send(data);
});

//GET by id
adminController.get(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.getById(id);
    res.send(data);
  }
);

//DELETE
adminController.delete(
  "/:id",
  async (req: express.Request<{}, uuidv4, {}>, res: express.Response) => {
    const id = req.params.id;

    const data = await repo.delete(id);
    res.send(data);
  }
);

//PUT
adminController.put(
  "/:id",
  urlencodedParser,
  async (
    req: express.Request<{}, uuidv4, UpdateAdminDto>,
    res: express.Response
  ) => {
    const id = req.params.id;
    const newAdmin = req.body as object;

    const data = await repo.update(newAdmin, id);
    res.send(JSON.stringify(data));
  }
);

export default adminController;
