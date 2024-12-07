import mysql from 'mysql2/promise';

let pool;

const createPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: 'localhost',
      user: process.env.MYSQL_USER, // Asegúrate de tener estas variables en tu .env
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
};

export const getPool = () => {
  return createPool();
};
