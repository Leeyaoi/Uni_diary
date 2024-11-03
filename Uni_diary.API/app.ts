import * as express from "express";
import { DbSynchronize } from "./db/dbContext";
import * as fs from "fs";
import router from "./routes";
import * as https from "https";
var privateKey = fs.readFileSync("../certs/cert.key", "utf8");
var certificate = fs.readFileSync("../certs/cert.crt", "utf8");
import * as cors from "cors";

var credentials = { key: privateKey, cert: certificate };

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use("/", router);

app.use(
  "/",
  (error: any, req: express.Request, res: express.Response, next: unknown) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Smth went wrong";
    return res.status(statusCode).send({ statusCode, message });
  }
);

var httpsServer = https.createServer(credentials, app);

DbSynchronize().then(() => {
  httpsServer.listen(3002);
  console.log("ready");
});
