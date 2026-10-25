# 🏦 FinAI : AI-Powered Personal Finance & Wealth Advisor
### Comprehensive Project Documentation

> 📥 **Downloads:** [📄 Download Official PDF](BFSI-FinAI-Documentation.pdf) &nbsp;|&nbsp; [💾 Download Word Document (.docx)](BFSI-%20FinAI%20Documentation.docx)

---

### 🏛️ Academic Information

| Field | Details |
| :--- | :--- |
| **Institution** | **Dr. D. Y. Patil Educational Federation's**<br>Dr. D. Y. Patil College of Engineering & Innovation<br>*(Approved by AICTE, Recognized by Govt. of Maharashtra, Autonomous Institute Affiliated to SPPU, NAAC 'A' Grade)* |
| **Department** | Department of Computer Engineering |
| **Program** | Computer Engineering |
| **Class / Div / Batch** | S.Y. B. Tech / Div: C / Batch: C1 |
| **Student Name** | **Shaikh Jammu Ahemad Husen** |
| **PRN No. / Roll No.** | PRN: 251050144 / Roll No: 12316 |
| **Semester / Course** | Semester: 3rd / Course: BFSI (Online) / AIFM |
| **Platform Affiliations** | SmartBridge \| SkillWallet |

---

## 📌 Project Description

**FinAI (FinWise)** is a full-stack, AI-driven personal finance platform engineered to provide automated budgeting, real-time financial health score diagnostics, income and expense tracking, milestone-based savings roadmaps, and an interactive conversational financial advisor.

The platform helps salaried professionals, students, freelancers, and household managers gain clarity and actionable control over their spending, savings, and financial targets without requiring advanced accounting knowledge.

The system combines a **React frontend** with a **Python Flask + SQLAlchemy backend** (SQLite database) and an optional **Node.js Express server**. A built-in rule-based NLP advisor engine analyzes income and expense data, computes a **0–100 Financial Health Score**, generates a personalized **50/30/20 budget plan**, and highlights overspending categories. The AI Advisor chat enables users to ask queries regarding loans, SIPs, emergency funds, tax brackets, and budgets in natural language, and even log expenses directly via voice and text commands (e.g., *"Log $45 for groceries"*), accompanied by Web Speech audio responses.

The application features a responsive neo-glassmorphism dark interface built around a Dashboard, Income & Expense Tracker, Budget Generator, Savings Goals Tracker, Analytics Charts, Monthly Executive Report modal, and AI Advisor drawer. Four pre-configured financial personas can be switched instantly, complemented by interactive charts, fluid animations, sound effects, and celebration confetti.

---

## 🛠️ Technology & Architecture

- **Frontend:** React 19, Vite, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS 3.4
- **Backend Services:**
  - Python Flask + SQLAlchemy (ORM)
  - Node.js + Express 5
- **Database:** SQLite (`finai.db`) via SQLAlchemy
- **AI & Diagnostics:**
  - Local rule-based NLP advisor engine
  - Multi-pillar Financial Health Score algorithm (0–100)
- **Data Visualization & UI Components:**
  - Recharts (Area, Bar, Composed, Donut)
  - Framer Motion (Transitions & micro-interactions)
  - Canvas Confetti (Celebration triggers)
  - Lucide React (Icons)
- **Browser APIs:** Web Speech Synthesis, Web Audio API, LocalStorage persistence
- **Development Ports:**
  - Frontend: `http://localhost:5173` (Vite)
  - Python Backend: `http://localhost:5000` (Flask)
  - Node Backend: `http://localhost:3001` (Express)

---

## 🚀 Key Features

1. **Automated 50/30/20 Budget Generator:**
   - Dynamic allocations into Needs (50%), Wants (30%), and Savings (20%).
   - Interactive "What-If" simulator slider demonstrating real-time projected annual savings from discretionary spending cuts.

2. **Financial Health Score Algorithm (0–100 Scale):**
   - **Savings Rate Pillar (30 pts):** Quantitative ratio of savings to total earnings.
   - **Budget Adherence Pillar (30 pts):** Live tracking of spending against budget thresholds.
   - **Emergency Runway Pillar (20 pts):** Months of living costs covered by liquid cash reserves.
   - **Discretionary Spending Ratio (20 pts):** Wants vs. needs spending discipline evaluation.

3. **AI Financial Advisor Chat Assistant:**
   - NLP engine addressing banking, loans, SIP investments, emergency buffers, tax slabs, and budgeting.
   - Direct natural language expense logging (e.g., *"Log $45 for groceries"*).
   - Audio feedback via Web Speech synthesis and quick question chips.

4. **Income & Expense Ledger:**
   - Complete transaction tracking with category tagging, payment method tracking, date filtering, and search.

5. **Milestone-Based Savings Goals Tracker:**
   - Goal progress rings, monthly contribution calculations, target deadlines, and celebration confetti on completion.

6. **Interactive Visual Analytics:**
   - Real-time Recharts showing cashflow trajectories, expense breakdowns, and budget vs. actual comparisons.

7. **Printable Monthly Audit Report:**
   - One-click executive PDF/print-ready monthly financial audit modal.

8. **Four Pre-Configured Personas:**
   - Instant switching between Salaried Professional, College Student, Freelancer, and Household Manager profiles.

9. **Neo-Glassmorphism UI:**
   - Dark theme, glass blur effects, sound feedback triggers, and smooth layout animations.

---

## 👥 Real-World Scenarios & Personas

### Scenario 1: Salaried Professional (Alex Morgan)
- **Profile:** Fixed monthly salary of $6,500.
- **Challenge:** High cash flow, curbing lifestyle inflation, and accumulating funds for a house down payment.
- **Solution:** System tracks fixed vs. discretionary spending, alerts on dining/leisure overruns, generates a strict 50/30/20 plan, and tracks milestone progress toward a $45,000 down payment.

### Scenario 2: College Student (Maya Chen)
- **Profile:** Tight monthly allowance of $850.
- **Challenge:** Meal plan costs, textbook expenses, avoiding debt, and saving for tech gear.
- **Solution:** Configures realistic micro-budgets, identifies discretionary cafeteria/entertainment drains, runs What-If scenarios, and builds a micro-savings buffer.

### Scenario 3: Freelancer / Consultant (Devon Vance)
- **Profile:** Variable irregular cashflow (~$7,400/month average).
- **Challenge:** Unpredictable invoices, quarterly tax obligations, and income volatility.
- **Solution:** Segregates a 25% tax safe-harbor vault, dynamically recalculates monthly budgets based on rolling averages, and builds a 6-month living runway buffer.

### Scenario 4: Household Manager (Sharma Family)
- **Profile:** Dual-earner multi-income household ($9,800/month combined).
- **Challenge:** Mortgage payments, utility bills, groceries for multiple family members, and college education planning.
- **Solution:** Centralized ledger for all shared expenses, automated grocery and utility overrun alerts, a children's 529 education goal tracker, and monthly family financial audits.

---

## 🏆 Project Milestones

- **Milestone 1 — Project Planning & Requirement Analysis:**
  Define the objective of FinAI (FinWise), identify target personas, specify core functional modules, and design application architecture and workflows.
- **Milestone 2 — Backend & Data Model Setup:**
  Develop Flask + SQLAlchemy backend with SQLite (`finai.db`), design database schemas (`User`, `Income`, `Expense`, `Budget`, `SavingsGoal`), seed sample persona data, implement REST endpoints, and configure the Express server.
- **Milestone 3 — Health Score & Budget Engine:**
  Formulate the 4-pillar Financial Health Score algorithm (0–100) and build the automated 50/30/20 budget generator with an interactive What-If simulation slider.
- **Milestone 4 — AI Advisor & Frontend Build:**
  Develop the rule-based NLP conversational advisor with voice synthesis and command-based expense logging; build the React 19 + Vite + Tailwind interface with Recharts and Framer Motion.
- **Milestone 5 — Testing, Optimization & Documentation:**
  Perform end-to-end testing across desktop and mobile viewports, optimize state sync (LocalStorage + SQLite), verify audio/speech APIs, and assemble complete project documentation.

---

## 🎯 Conclusion & Expected Outcome

**FinAI (FinWise)** streamlines personal financial management by replacing cumbersome spreadsheets with intelligent, automated budgeting, visual analytics, and conversational AI assistance. By providing transparent health scores, proactive alerts, and persona-driven roadmaps, FinAI empowers everyday users to build financial discipline, curb lifestyle inflation, and reach their savings milestones with confidence.
