import mysql2 from "mysql2/promise";

const access = {
  user: "dbms-example",
  password: "dbms-example",
  database: "dbms-example",
};
const MysqlConnectionPool = new mysql2.createPool(access);
