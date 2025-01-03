import express, { Router } from "express";
import mysqlConnectionPool from "../../lib/mysql.js";
import { OK, CREATED, BAD_REQUEST } from "../../lib/constants.js";

const userRouter = Router();

/**
 * Get user information from the MySQL database.
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function getUser(req, res) {
  const mysql = await mysqlConnectionPool.getConnection();
  const [results, fields] = await mysql.query();
  res.json({
    message: `Hello user ${results[0]["id"]}`,
  });
}
userRouter.get("/:id", getUser);

/**
 * Signup with `id`, `name`, `account` and `password` in request body.
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function signup(req, res) {
  const { id, name, account, password } = req.body;
  /* The password should encrypted / hashed, I skip that part here */
  const mysql = await mysqlConnectionPool.getConnection();
  try {
    await mysql.query(
      "INSERT INTO User (Id, Name, Account, Password) VALUES (?, ?, ?, ?)",
      [id, name, account, password],
    );
    res.status(CREATED).json({ status: "ok" });
  } catch (err) {
    res.status(BAD_REQUEST).json({ error: err });
  }
}
userRouter.post("/signup", signup);

/**
 * Login with `account` and `password` in request body.
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function login(req, res) {
  const { account, password } = req.body;
  /* Again, the password should encrypted / hashed, I skip that part here */
  const mysql = await mysqlConnectionPool.getConnection();
  try {
    const [results, fields] = await mysql.query(
      "SELECT Id, Name, Account FROM `User` WHERE Account=? AND Password=?",
      [account, password],
    );
    res.status(OK).json(results[0]);
  } catch (err) {
    res.status(BAD_REQUEST).json({ error: err });
  }
}
userRouter.post("/login", login);

export default userRouter;
