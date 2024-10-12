import * as express from "express";
import { DbSynchronize } from "./db/dbContext";
import router from "./routes";

const app = express();

DbSynchronize().then(() => {
  app.listen(3000, function () {
    console.log("ready");
  });
});

app.use((_, res, next) => {
  try {
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

app.use("/", router);
