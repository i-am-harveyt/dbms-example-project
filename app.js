import express from "express";
import v1 from "./routes/v1/api.js";
import bodyParser from "body-parser";

/**
 * @param {express.Response} res - We can manage Response with this arg.
 */
async function pong(_, res) {
  res.json({
    status: "pong",
  });
}

const app = express();
app.use(bodyParser.json());
app.get("/ping", pong);
app.use("/api/v1", v1);
app.listen(3000);
