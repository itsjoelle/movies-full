import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'mypostgres',
  password: 'yourpassword',
  port: 5432,
});

export default pool;
