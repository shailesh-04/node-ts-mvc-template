import { config } from 'dotenv';
config();
const env = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASS || '',
  DB_NAME: process.env.DB_NAME || 'product_db',
};
export default env;