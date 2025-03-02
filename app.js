import express from "express";
import v1 from "./routes/v1/api.js";
import bodyParser from "body-parser";
import cors from "./lib/cors.js";

/**
 * @param {express.Response} res - We can manage Response with this arg.
 */
async function pong(_, res) {
  res.json({
    status: "pong",
  });
}

const app = express();
app.use("/", cors);
app.use(bodyParser.json());
app.get("/ping", pong);
app.use("/api/v1", v1);
app.listen(3000);
