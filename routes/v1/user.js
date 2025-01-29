import express, { Router } from "express";
import mysqlConnectionPool from "../../lib/mysql.js";
import { signJWT } from "../../lib/jwt.js";
import { StatusCode } from "../../lib/constants.js";

const userRouter = Router();
export default userRouter;

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
      `
		INSERT INTO \`User\` (Id, Name, Account, Password)
		VALUES (?, ?, ?, ?)`,
      [id, name, account, password],
    );
    res.status(StatusCode.CREATED).json({ status: "ok" });
  } catch (err) {
    res
      .status(StatusCode.BAD_REQUEST)
      .json({ error: "User account has been used!" });
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
    const [results] = await mysql.query(
      `
		SELECT Id, Name, Account FROM \`User\`
		WHERE
		Account=CONVERT(? USING utf8mb4) AND
		Password=CONVERT(? USING utf8mb4)
		COLLATE utf8mb4_bin`,
      [account, password],
    );
    if (results.length === 0) throw new Error("Wrong account or password!");
    res.status(StatusCode.OK).json({
      id: results[0],
      token: await signJWT({ id: results[0] }),
    });
  } catch (err) {
    res.status(StatusCode.BAD_REQUEST).json({ error: err.toStrig() });
  }
}
userRouter.post("/login", login);

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
