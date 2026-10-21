
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL pool error:", err.message);
});

module.exports = pool;

// This code reads the configuration from the environment variables you defined in the Deployment. It doesn't hardcode the database password.

// Now, wherever your backend handles API requests, you can use the pool to run SQL queries.
