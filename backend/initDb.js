const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function init() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS expenses (
        id SERIAL PRIMARY KEY,
        amount NUMERIC,
        category VARCHAR(50),
        date DATE,
        description TEXT
      );
    `);
    console.log("✅ Database initialized");
  } catch (err) {
    console.error("❌ Error initializing database:", err);
  } finally {
    await pool.end();
  }
}

init();
