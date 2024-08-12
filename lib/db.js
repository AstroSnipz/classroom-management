import pg from "pg";

// Create a new instance of the PostgreSQL client
const db = new pg.Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
});

// Connect to the database
db.connect();

// Export the database connection for reuse
export default db;
