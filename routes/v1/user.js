import express, { Router } from "express";

const userRouter = Router();

/**
 * Get user information from the MySQL database.
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function getUser(req, res) {
  res.json({
    message: `Hello user ${req.params["id"]}`,
  });
}
userRouter.get("/:id", getUser);

userRouter.post("/", async (req, res) => {
  res.json({});
});

export default userRouter;
