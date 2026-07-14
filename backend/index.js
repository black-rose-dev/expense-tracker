const express = require('express');
const app = express();
app.use(express.json());

let expenses = [];

app.post('/expenses', (req, res) => {
  const expense = req.body;
  expenses.push(expense);
  res.status(201).send(expense);
});

app.get('/expenses', (req, res) => {
  res.send(expenses);
});

app.listen(3000, () => {
  console.log('Backend running on port 3000');
});
