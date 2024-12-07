import mysql from 'mysql2/promise';

let pool;

const createPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: 'localhost',
      user: process.env.MYSQL_USER,
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

export const checkConnection = async () => {
  const connection = await getPool().getConnection();
  try {
    await connection.query('SELECT 1');
    console.log('Conexión a la base de datos exitosa.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  } finally {
    connection.release();
  }
};

checkConnection();

export const fetchData = async (query, params) => {
  const connection = await getPool().getConnection();
  try {
    const [rows] = await connection.execute(query, params);
    return rows; 
  } catch (error) {
    console.error('Error executing query:', error);
    throw error; 
  } finally {
    connection.release();
  }
};
