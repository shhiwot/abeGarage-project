const mysql = require('mysql2/promise');
require("dotenv").config();
const dbConfig = {
    connectionLimit: 10,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
};
//Create the connection pool
const pool = mysql.createPool(dbConfig)
async function query(sql, params) { 
    const [rows] = await pool
    .execute(sql, params);
    return rows;
}
async function getConnection() {
  return await pool.getConnection();
}
module.exports = {
    query,
    getConnection,
    pool
};
