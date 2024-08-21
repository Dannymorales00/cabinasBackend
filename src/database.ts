import { createPool, Pool, PoolOptions } from 'mysql2/promise';

const dbConfig: PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT,
  connectionLimit: 10,
};

const pool: Pool = createPool(dbConfig);

export default pool;