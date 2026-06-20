const mysql = require('mysql2/promise');
const { db } = require('./env');

const pool = mysql.createPool({
  host: db.host,
  port: db.port,
  user: db.user,
  password: db.password,
  database: db.database,
  connectionLimit: db.connectionLimit,
  waitForConnections: true,
  namedPlaceholders: false
});

module.exports = {
  pool,
  query: (sql, params = []) => pool.query(sql, params)
};
