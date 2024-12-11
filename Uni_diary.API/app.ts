import * as express from "express";
import { DbSynchronize } from "./db/dbContext";
import * as fs from "fs";
import router from "./routes";
import * as https from "https";
import * as jwt from "jsonwebtoken";
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

app.use((req, res, next) => {
  if (req.originalUrl == "/user/auth") {
    next();
    return;
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.API_SECRET, (err, auth) => {
    if (err) return res.sendStatus(403);
    req.auth = auth;
    next();
  });

  const { exp } = jwt.decode(token) as jwt.JwtPayload;
  if (exp == undefined || Date.now() >= exp * 1000) {
    return res.sendStatus(403);
  }
});

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
