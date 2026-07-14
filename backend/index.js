const express = require('express');
const app = express();
app.use(express.json());

const { Pool } = require('pg');
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.post('/expenses', async (req, res) => {
  const { amount, category, date, description } = req.body;
  const result = await pool.query(
    'INSERT INTO expenses(amount, category, date, description) VALUES($1, $2, $3, $4) RETURNING *',
    [amount, category, date, description]
  );
  res.status(201).send(result.rows[0]);
});

app.get('/expenses', async (req, res) => {
  const result = await pool.query('SELECT * FROM expenses');
  res.send(result.rows);
});

app.listen(3000, () => {
  console.log('Backend running on port 3000');
});

