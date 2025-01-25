import mysql2 from "mysql2/promise";
import { MySQL } from "../lib/constants.js";

// for security reasons, we usually don't explicitly
// show our secrets, think of how can you hide them.
const access = {
  user: MySQL.USER,
  password: MySQL.PASSWORD,
  database: MySQL.DATABASE,
};
const mysqlConnectionPool = mysql2.createPool(access);

export default mysqlConnectionPool;
