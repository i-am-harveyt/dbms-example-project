import { Request, Response } from "express";
/**
 * @param{Request} req
 * @param{Response} res
 * @param{function} next
 */
export default function cors(_, res, next) {
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-allow-headers", "*");
  next();
}
