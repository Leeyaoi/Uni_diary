import * as express from "express";
import { DbSynchronize } from "./db/dbContext";
import router from "./routes";

const app = express();

app.use("/", router);

app.use(
  "/",
  (error: any, req: Request, res: express.Response, next: unknown) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Smth went wrong";
    return res.status(statusCode).send({ statusCode, message });
  }
);

DbSynchronize().then(() => {
  app.listen(3000, function () {
    console.log("ready");
  });
});
