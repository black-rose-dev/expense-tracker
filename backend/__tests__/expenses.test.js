// backend/__tests__/expenses.test.js
jest.mock('../db', () => ({
  query: jest.fn(),
}));

const pool = require('../db');
const request = require('supertest');
const app = require('../index');

describe('Expenses API (mocked DB)', () => {
  it('GET /expenses returns mocked data', async () => {
    pool.query.mockResolvedValue({ rows: [{ id: 1, amount: 10 }] });

    const res = await request(app).get('/expenses');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ id: 1, amount: 10 }]);
  });

  it('POST /expenses inserts mocked data', async () => {
    const newExpense = { amount: 20, category: 'Food' };
    pool.query.mockResolvedValue({ rows: [{ id: 2, ...newExpense }] });

    const res = await request(app).post('/expenses').send(newExpense);
    expect(res.statusCode).toBe(201);
    expect(res.body.amount).toBe(20);
  });
});
