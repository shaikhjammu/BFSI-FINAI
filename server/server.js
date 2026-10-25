import express from 'express';
import cors from 'cors';
import { SCENARIOS } from '../src/data/initialData.js';
import { calculateFinancialHealth, generateSmartBudgetPlan, processAIChatQuery } from '../src/services/aiAdvisorEngine.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory data store initialized from scenarios
let store = JSON.parse(JSON.stringify(SCENARIOS));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'FinAI Node/Express Intelligence Engine' });
});

app.get('/api/scenarios', (req, res) => {
  res.json(store);
});

app.get('/api/scenarios/:id', (req, res) => {
  const sc = store[req.params.id];
  if (!sc) return res.status(404).json({ error: 'Scenario not found' });
  res.json(sc);
});

app.post('/api/scenarios/:id/expenses', (req, res) => {
  const sc = store[req.params.id];
  if (!sc) return res.status(404).json({ error: 'Scenario not found' });
  const newExp = {
    id: `exp-${Date.now()}`,
    ...req.body
  };
  sc.expenses.unshift(newExp);
  res.status(201).json(newExp);
});

app.post('/api/scenarios/:id/incomes', (req, res) => {
  const sc = store[req.params.id];
  if (!sc) return res.status(404).json({ error: 'Scenario not found' });
  const newInc = {
    id: `inc-${Date.now()}`,
    ...req.body
  };
  sc.incomeSources.unshift(newInc);
  sc.monthlyIncome = sc.incomeSources.reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
  res.status(201).json(newInc);
});

app.post('/api/ai/chat', (req, res) => {
  const { query, scenarioId, transactions, budgets, savingsGoals } = req.body;
  const sc = store[scenarioId] || store.scenario_1;
  const reply = processAIChatQuery({
    query,
    scenario: sc,
    transactions: transactions || sc.expenses,
    budgets: budgets || sc.budgets,
    savingsGoals: savingsGoals || sc.savingsGoals
  });
  res.json(reply);
});

app.listen(PORT, () => {
  console.log(`FinAI Express Intelligence Server active on http://localhost:${PORT}`);
});
