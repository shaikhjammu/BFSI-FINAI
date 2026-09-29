# 🏦 FinAI (FinWise) — AI-Powered Personal Finance & Wealth Advisor

[![React](https://img.shields.io/badge/React-19.2-61dafb.svg?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Flask](https://img.shields.io/badge/Flask-Python%203-000000.svg?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

FinAI is a comprehensive, full-stack AI-driven personal finance platform engineered to deliver automated budgeting, real-time financial health diagnostics, income/expense tracking, milestone savings roadmaps, and an intelligent conversational financial advisor.

---

## 🚀 Key Features

- 👤 **4 Real-World Financial Personas:**
  - **Salaried Professional (Alex Morgan):** High cash flow, curbing lifestyle inflation, house down payment goal.
  - **College Student (Maya Chen):** Tight monthly allowance, meal plan tracking, micro-savings for tech projects.
  - **Freelancer / Consultant (Devon Vance):** Variable cashflows, 25% tax safe-harbor vaults, 6-month runway buffer.
  - **Household Manager (Sharma Family):** Multi-earner dual income, mortgage, 529 education fund, utility overrun alerts.

- 📊 **Financial Health Score Algorithm (0–100 Scale):**
  - **Savings Rate Pillar (30 pts):** Quantitative ratio of income saved vs. earned.
  - **Budget Adherence Pillar (30 pts):** Live tracking of category limit compliance.
  - **Emergency Runway Pillar (20 pts):** Months of living expenses covered by reserves.
  - **Discretionary Spending Ratio (20 pts):** Evaluation of wants vs. needs discipline.

- 💡 **Automated 50/30/20 Budget Generator & "What-If" Simulator:**
  - Dynamic budget allocations adapted to income profile.
  - Interactive simulator slider showing real-time projected annual savings from discretionary cuts.

- 🤖 **FinAI Conversational Advisor Assistant:**
  - Natural language engine answering banking, loan, SIP, emergency fund, and tax queries.
  - Integrated speech synthesis and quick action prompts.
  - Direct natural language expense logging (e.g., *"Log $45 for groceries"*).

- 🎯 **Milestone-Based Savings Goals Tracker:**
  - Interactive contribution simulation, progress rings, and celebration confetti triggers.

- 📈 **Visual Analytics & Reporting:**
  - Multi-dimensional Recharts (Cashflow trajectories, category distributions, budget vs. actual).
  - One-click executive PDF/print-ready monthly audit report modal.

---

## 🛠️ Technology Stack & Languages

| Domain | Technology / Language | Details |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19 + JavaScript (ES6+) / JSX** | Component architecture, responsive state management |
| **Styling & UI** | **CSS3, Tailwind CSS 3.4, Neo-Glassmorphism** | Glassmorphism blur filters, dynamic dark theme tokens |
| **Data Visualization** | **Recharts 3.10** | Area, Bar, Composed, and Donut charts |
| **Animations & FX** | **Framer Motion, Canvas Confetti** | Smooth transitions and goal completion effects |
| **Backend (Python)** | **Python (Flask + Flask-CORS + SQLAlchemy)** | REST API with SQLite database ORM |
| **Backend (Node.js)** | **Node.js (Express 5 + CORS)** | Express server for scenario and AI chat endpoints |
| **Database** | **SQLite (`finai.db`)** | Relational persistence for Users, Incomes, Expenses, Budgets, and Goals |

---

## 📁 Repository Structure

```
BFSI-FINWISE-AI/
├── app.py                      # Flask REST API server with seed data & endpoints
├── models.py                   # SQLAlchemy database models (User, Income, Expense, Budget, Goal)
├── index.html                  # Main HTML entrypoint
├── package.json                # NPM project dependencies and scripts
├── tailwind.config.js          # Tailwind CSS theme configurations
├── vite.config.js              # Vite bundler configuration
│
├── server/
│   └── server.js               # Node.js / Express backend server
│
└── src/
    ├── App.jsx                 # Master application controller & state orchestrator
    ├── App.css                 # Component-specific styles and animations
    ├── index.css               # Design system tokens & glassmorphism utilities
    ├── main.jsx                # React DOM root hydration
    │
    ├── components/
    │   ├── AIAdvisorChat.jsx        # Conversational AI advisor drawer with voice synthesis
    │   ├── AnalyticsCharts.jsx      # Interactive Recharts (Cashflow, Categories, Budget vs Actual)
    │   ├── BudgetGenerator.jsx      # Automated 50/30/20 budget planner & simulator
    │   ├── DashboardOverview.jsx    # Bento-grid summary cards (Inflows, Outflows, Health)
    │   ├── IncomeExpenseTracker.jsx # Transaction ledger with filters, search, and modal inputs
    │   ├── InteractiveBackground.jsx# Ambient particle/mesh background animation
    │   ├── MonthlyReportModal.jsx   # Printable executive financial audit report
    │   ├── Navbar.jsx               # Navigation bar, scenario switcher, & global settings
    │   ├── SavingsGoalsTracker.jsx  # Milestone-based savings goals with progress rings
    │   └── ScenarioBanner.jsx       # Active user profile and persona contextual banner
    │
    ├── data/
    │   └── initialData.js      # Seed datasets for 4 distinct financial personas
    │
    ├── services/
    │   ├── aiAdvisorEngine.js  # NLP query processor, Health Score math, budget allocation
    │   └── storageService.js   # LocalStorage synchronization layer
    │
    └── utils/
        └── effects.js          # Web Audio API sound triggers & Canvas Confetti integration
```

---

## ⚡ Quickstart & Installation

### 1. Clone the repository
```bash
git clone https://github.com/shaikhjammu/BFSI-FINWISE-AI.git
cd BFSI-FINWISE-AI
```

### 2. Frontend Setup (React + Vite)
```bash
# Install dependencies
npm install

# Start Vite Development Server (http://localhost:5173)
npm run dev
```


## 📄 Documentation

[📘 View Project Documentation](DOCS/BSFI-FinWise_AI_Documentation_SJAH.docx)
```

---

## 📄 License
This project is open-source under the MIT License.
