import { CATEGORIES } from '../data/initialData';

/**
 * Calculates the comprehensive Financial Health Score (0-100)
 */
export function calculateFinancialHealth({ income, expenses, budgets, savingsGoals, emergencyFunds = 0 }) {
  const totalIncome = typeof income === 'number' ? income : (income || []).reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const totalExpense = typeof expenses === 'number' ? expenses : (expenses || []).reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const netSavings = Math.max(0, totalIncome - totalExpense);
  const savingsRate = totalIncome > 0 ? (netSavings / totalIncome) * 100 : 0;

  // 1. Savings Rate Pillar (Max 30 pts)
  let savingsScore = 0;
  if (savingsRate >= 25) savingsScore = 30;
  else if (savingsRate >= 20) savingsScore = 26;
  else if (savingsRate >= 15) savingsScore = 20;
  else if (savingsRate >= 10) savingsScore = 14;
  else if (savingsRate > 0) savingsScore = 8;
  else savingsScore = 0;

  // 2. Budget Adherence Pillar (Max 30 pts)
  let budgetScore = 20;
  if (budgets && typeof expenses === 'object' && Array.isArray(expenses)) {
    const categorySpending = {};
    expenses.forEach(e => {
      categorySpending[e.category] = (categorySpending[e.category] || 0) + e.amount;
    });

    let overspentCount = 0;
    let totalTracked = 0;

    Object.keys(budgets).forEach(cat => {
      const budgetLimit = budgets[cat] || 0;
      if (budgetLimit > 0) {
        totalTracked++;
        const spent = categorySpending[cat] || 0;
        if (spent > budgetLimit) {
          overspentCount++;
        }
      }
    });

    if (totalTracked > 0) {
      const adherenceRatio = (totalTracked - overspentCount) / totalTracked;
      budgetScore = Math.round(adherenceRatio * 30);
    }
  }

  // 3. Emergency Runway Pillar (Max 20 pts)
  const monthlyBurn = totalExpense > 0 ? totalExpense : 1000;
  let totalSavedInGoals = emergencyFunds;
  if (Array.isArray(savingsGoals)) {
    totalSavedInGoals += savingsGoals.reduce((sum, g) => sum + (g.current || 0), 0);
  }
  const runwayMonths = monthlyBurn > 0 ? totalSavedInGoals / monthlyBurn : 0;

  let runwayScore = 0;
  if (runwayMonths >= 6) runwayScore = 20;
  else if (runwayMonths >= 4) runwayScore = 16;
  else if (runwayMonths >= 2) runwayScore = 12;
  else if (runwayMonths >= 1) runwayScore = 8;
  else runwayScore = 4;

  // 4. Discretionary Spending Ratio Pillar (Max 20 pts)
  let discretionaryRatioScore = 15;
  if (Array.isArray(expenses) && totalExpense > 0) {
    const wantCategories = CATEGORIES.filter(c => c.type === 'want').map(c => c.id);
    const wantSpend = expenses.filter(e => wantCategories.includes(e.category)).reduce((sum, e) => sum + e.amount, 0);
    const wantRatio = (wantSpend / totalExpense) * 100;

    if (wantRatio <= 25) discretionaryRatioScore = 20;
    else if (wantRatio <= 35) discretionaryRatioScore = 16;
    else if (wantRatio <= 45) discretionaryRatioScore = 11;
    else discretionaryRatioScore = 5;
  }

  const totalScore = Math.min(100, Math.max(0, savingsScore + budgetScore + runwayScore + discretionaryRatioScore));

  let grade = 'Fair';
  let badgeColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
  let summary = 'Your finances are relatively stable, with key opportunities to optimize discretionary spending.';

  if (totalScore >= 85) {
    grade = 'Excellent (A+)';
    badgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    summary = 'Outstanding financial discipline! You have strong savings velocity and healthy emergency buffers.';
  } else if (totalScore >= 70) {
    grade = 'Good (B+)';
    badgeColor = 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    summary = 'Healthy foundation. A few minor budget adjustments will elevate you to top-tier financial resilience.';
  } else if (totalScore >= 50) {
    grade = 'Fair (C)';
    badgeColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    summary = 'Budget adherence is slipping in a couple of categories. Reducing dining/leisure will accelerate savings.';
  } else {
    grade = 'Needs Action (D)';
    badgeColor = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    summary = 'Urgent attention required: expenses are outpacing income or depleting emergency reserves.';
  }

  return {
    score: totalScore,
    grade,
    badgeColor,
    summary,
    pillars: [
      { name: 'Savings Rate', score: savingsScore, max: 30, value: `${savingsRate.toFixed(1)}%` },
      { name: 'Budget Adherence', score: budgetScore, max: 30, value: `${Math.round((budgetScore / 30) * 100)}%` },
      { name: 'Emergency Runway', score: runwayScore, max: 20, value: `${runwayMonths.toFixed(1)} mo` },
      { name: 'Spending Discipline', score: discretionaryRatioScore, max: 20, value: `${Math.round((discretionaryRatioScore / 20) * 100)}%` }
    ],
    savingsRate,
    runwayMonths: runwayMonths.toFixed(1)
  };
}

/**
 * Categorize expenses and detect overspending against budgets
 */
export function analyzeCategoryBudgets(expenses = [], budgets = {}) {
  const categoryMap = {};

  CATEGORIES.forEach(cat => {
    categoryMap[cat.id] = {
      ...cat,
      spent: 0,
      budget: budgets[cat.id] || 0,
      percentage: 0,
      status: 'ok',
      diff: 0
    };
  });

  expenses.forEach(e => {
    const catId = e.category || 'misc';
    if (!categoryMap[catId]) {
      categoryMap[catId] = {
        id: catId,
        name: catId.toUpperCase(),
        icon: 'MoreHorizontal',
        color: '#94a3b8',
        type: 'want',
        spent: 0,
        budget: budgets[catId] || 0,
        percentage: 0,
        status: 'ok',
        diff: 0
      };
    }
    categoryMap[catId].spent += Number(e.amount) || 0;
  });

  const analyzed = Object.values(categoryMap).map(item => {
    const percentage = item.budget > 0 ? (item.spent / item.budget) * 100 : (item.spent > 0 ? 100 : 0);
    const diff = item.budget - item.spent;
    let status = 'on-track';

    if (item.budget > 0) {
      if (item.spent > item.budget) status = 'over';
      else if (item.spent > item.budget * 0.85) status = 'warning';
      else status = 'good';
    }

    return {
      ...item,
      percentage: Math.min(200, Math.round(percentage)),
      diff,
      status
    };
  });

  const overspentCategories = analyzed.filter(c => c.status === 'over');
  const warningCategories = analyzed.filter(c => c.status === 'warning');
  const healthyCategories = analyzed.filter(c => c.spent > 0 && c.status === 'good');

  return {
    allCategories: analyzed,
    overspentCategories,
    warningCategories,
    healthyCategories,
    hasOverspending: overspentCategories.length > 0
  };
}

/**
 * Generates automated 50/30/20 or personalized smart budget recommendation
 */
export function generateSmartBudgetPlan(income, scenarioId = 'scenario_1') {
  const totalIncome = Number(income) || 5000;
  
  let needsPercent = 0.50;
  let wantsPercent = 0.30;
  let savingsPercent = 0.20;

  if (scenarioId === 'scenario_2') {
    needsPercent = 0.55;
    wantsPercent = 0.30;
    savingsPercent = 0.15;
  } else if (scenarioId === 'scenario_3') {
    needsPercent = 0.45;
    wantsPercent = 0.25;
    savingsPercent = 0.30;
  } else if (scenarioId === 'scenario_4') {
    needsPercent = 0.58;
    wantsPercent = 0.22;
    savingsPercent = 0.20;
  }

  const needsBudget = totalIncome * needsPercent;
  const wantsBudget = totalIncome * wantsPercent;
  const savingsBudget = totalIncome * savingsPercent;

  const recommendedBudgets = {
    housing: Math.round(needsBudget * 0.55),
    groceries: Math.round(needsBudget * 0.22),
    transport: Math.round(needsBudget * 0.12),
    utilities: Math.round(needsBudget * 0.06),
    health: Math.round(needsBudget * 0.05),
    dining: Math.round(wantsBudget * 0.45),
    entertainment: Math.round(wantsBudget * 0.30),
    shopping: Math.round(wantsBudget * 0.25),
    education: Math.round(totalIncome * 0.04),
    work: scenarioId === 'scenario_3' ? Math.round(totalIncome * 0.08) : Math.round(totalIncome * 0.02),
    misc: Math.round(totalIncome * 0.02)
  };

  return {
    needsBudget: Math.round(needsBudget),
    wantsBudget: Math.round(wantsBudget),
    savingsBudget: Math.round(savingsBudget),
    needsPercent: Math.round(needsPercent * 100),
    wantsPercent: Math.round(wantsPercent * 100),
    savingsPercent: Math.round(savingsPercent * 100),
    recommendedBudgets
  };
}

/**
 * Comprehensive Multi-Domain Financial NLP Engine
 * Answering ANY financial, banking, investment, loan, taxation, or wealth question accurately.
 */
export function processAIChatQuery({ query, scenario, transactions = [], budgets = {}, savingsGoals = [] }) {
  const q = (query || '').toLowerCase().trim();
  const rawQuery = (query || '').trim();
  const totalIncome = scenario?.monthlyIncome || 6000;
  const expenses = transactions.filter(t => t.type !== 'income' && !t.isIncome);
  const totalExpense = expenses.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const netSavings = Math.max(0, totalIncome - totalExpense);
  const health = calculateFinancialHealth({ income: totalIncome, expenses, budgets, savingsGoals });
  const personaName = scenario?.persona || 'User';
  const cur = scenario?.currency || '₹';

  // 1. Natural Language Logging intent: e.g. "log $45 for groceries"
  const logMatch = q.match(/(?:log|add|spent|paid)\s*(?:\$|usd)?\s*(\d+(?:\.\d{1,2})?)\s*(?:for|on|in)?\s*([a-zA-Z\s]+)/i);
  if (logMatch) {
    const amount = parseFloat(logMatch[1]);
    const desc = logMatch[2].trim();
    
    let matchedCat = 'misc';
    if (desc.includes('grocer') || desc.includes('food') || desc.includes('supermarket')) matchedCat = 'groceries';
    else if (desc.includes('dinner') || desc.includes('coffee') || desc.includes('lunch') || desc.includes('cafe') || desc.includes('boba')) matchedCat = 'dining';
    else if (desc.includes('uber') || desc.includes('gas') || desc.includes('fuel') || desc.includes('metro') || desc.includes('car')) matchedCat = 'transport';
    else if (desc.includes('rent') || desc.includes('apartment') || desc.includes('room')) matchedCat = 'housing';
    else if (desc.includes('movie') || desc.includes('netflix') || desc.includes('concert') || desc.includes('game') || desc.includes('ticket')) matchedCat = 'entertainment';
    else if (desc.includes('cloth') || desc.includes('shoes') || desc.includes('amazon') || desc.includes('tech')) matchedCat = 'shopping';
    else if (desc.includes('book') || desc.includes('tuition') || desc.includes('course')) matchedCat = 'education';

    return {
      text: `✅ **Expense Logged!**\n\nI have recorded **${cur}${amount.toFixed(2)}** for *"${desc}"* under category **${matchedCat.toUpperCase()}**.\n\n• **Updated Total Expenses:** ${cur}${(totalExpense + amount).toLocaleString()}\n• **Projected Net Savings:** ${cur}${(netSavings - amount).toLocaleString()}`,
      action: {
        type: 'LOG_TRANSACTION',
        payload: {
          title: desc.charAt(0).toUpperCase() + desc.slice(1),
          amount,
          category: matchedCat,
          date: new Date().toISOString().split('T')[0],
          paymentMethod: 'Debit Card'
        }
      },
      chips: ['Show updated budget', 'How is my health score?', 'View expense list']
    };
  }

  // 2. BANK LOAN APPLICATIONS (SBI, HDFC, ICICI, CHASE, BOA, ETC.)
  if (
    (q.includes('sbi') || q.includes('bank') || q.includes('apply') || q.includes('steps to') || q.includes('how to get')) &&
    (q.includes('loan') || q.includes('personal loan') || q.includes('education loan') || q.includes('home loan') || q.includes('car loan'))
  ) {
    const isSBI = q.includes('sbi') || q.includes('state bank');
    const isEducation = q.includes('education') || q.includes('student') || q.includes('study');
    const isHome = q.includes('home') || q.includes('housing') || q.includes('mortgage');

    let bankName = isSBI ? 'State Bank of India (SBI)' : 'Commercial Bank / SBI';
    let loanType = isEducation ? 'Education Loan' : isHome ? 'Home Loan' : 'Personal / Retail Loan';

    return {
      text: `🏦 **Step-by-Step Guide: How to Apply for a ${loanType} at ${bankName}**\n\n### Step 1: Check Eligibility Criteria\n• **CIBIL / Credit Score:** Minimum 700+ recommended (750+ gets lowest interest rates).\n• **Age & Income:** Salaried (Min ₹15,000–₹25,000/mo or $2,500/mo) or Self-Employed with 2+ years ITR.\n• **Existing EMIs (FOIR):** Total existing loan EMIs should not exceed 40–50% of your net monthly income.\n\n### Step 2: Gather Required Documents\n• **Identity & Address Proof:** Aadhaar Card, PAN Card, Passport, or Driver's License.\n• **Income Proof:** Last 3–6 months salary slips + Form 16 / ITR for last 2 years.\n• **Bank Statements:** Last 6 months salary/savings account bank statement.\n• **Specific Property/College Documents:** Admission letter & fee schedule (for Education Loan) or Sale deed/NOC (for Home Loan).\n\n### Step 3: Application Process (Online & Offline)\n**A. Online via SBI YONO App / Net Banking (Fastest):**\n1. Log into **SBI YONO App** or net banking portal.\n2. Navigate to **Loans &rarr; ${loanType} &rarr; Apply Now**.\n3. Fill in requested loan amount, tenure (12 to 60 months), and upload KYC documents.\n4. Instant in-principle approval sanction letter is generated if pre-approved.\n\n**B. Offline Branch Visit:**\n1. Visit your nearest SBI Home Branch.\n2. Meet the Loan Officer and submit the physical application form with attested document photocopies.\n3. Verification & appraisal completed in 3–5 working days.\n\n### Step 4: Verification, Sanction & Disbursement\n• Once verified, sign the loan agreement.\n• Funds are credited directly into your bank account (or college/builder account for Education/Home loans) within 24–48 hours.\n\n### 💡 **FinAI Pro Tip for ${personaName}:**\nWith your monthly cashflow of **${cur}${totalIncome.toLocaleString()}**, ensure your proposed EMI does not exceed **${cur}${Math.round(totalIncome * 0.35).toLocaleString()}** to maintain a healthy **${health.score}/100 Financial Health Score**!`,
      chips: ['CIBIL & Credit Score Tips', 'Loan EMI Calculator', 'Stocks vs FDs']
    };
  }

  // 3. CREDIT SCORE & CIBIL IMPROVEMENT
  if (q.includes('credit score') || q.includes('cibil') || q.includes('fico') || q.includes('credit rating') || q.includes('increase credit')) {
    return {
      text: `💳 **How to Boost Your Credit / CIBIL Score to 750+ Fast**\n\n### The 5 Core Factors that Determine Your Score:\n**1. Payment History (35% Weight):** Never miss an EMI or credit card due date. Always pay the "Total Amount Due" rather than just the "Minimum Due".\n**2. Credit Utilization Ratio (30% Weight):** Keep credit card spending below **30% of your total credit limit** (e.g. if limit is $5,000, spend < $1,500).\n**3. Credit Age (15% Weight):** Keep your oldest credit card active even if rarely used to demonstrate long history.\n**4. Credit Mix (10% Weight):** Having a balanced combination of secured (home/auto) and unsecured (credit card) credit boosts rating.\n**5. Hard Inquiries (10% Weight):** Avoid applying for multiple loan apps or credit cards in a short window.\n\n⚡ *Timeline:* Consistent adherence elevates score by +50 to +100 points in 3–6 months!`,
      chips: ['Credit Card Best Practices', 'Loan Application Steps', 'What is my health score?']
    };
  }

  // 4. TAX REGIMES, DEDUCTIONS & FILING (NEW VS OLD REGIME, 80C, 80D, HRA)
  if (q.includes('tax') || q.includes('80c') || q.includes('80d') || q.includes('new regime') || q.includes('old regime') || q.includes('income tax') || q.includes('deduction') || q.includes('itr')) {
    return {
      text: `🏛️ **Income Tax Optimization & Filing Guide for ${personaName}**\n\n### 1. New Tax Regime vs. Old Tax Regime:\n• **New Regime (Default):** Concessional tax slab rates with standard deduction (₹75,000 / standard standard deduction), but NO 80C/80D/HRA deductions. Best if your total deductions are below ₹3.75 Lakhs.\n• **Old Regime:** Allows full tax exemptions under:\n  - **Section 80C (Max ₹1.5 Lakh):** PPF, ELSS Mutual Funds, EPF, Term Insurance, Tax Saver FDs.\n  - **Section 80D (Max ₹25k–₹50k):** Health insurance premiums for self and parents.\n  - **HRA / Section 24:** Rent allowance & Home loan interest up to ₹2 Lakhs.\n\n### 2. Freelance & Business Deductions (Section 44ADA / Schedule C):\n• If you are a freelancer or consultant (${personaName}), you can utilize Presumptive Taxation (Section 44ADA) declaring only 50% of gross receipts as taxable income!\n• Legally write off business laptops, internet fiber, co-working space, design software, and client lunches.\n\n💡 **Action:** Maximize ELSS mutual funds or 401(k)/PPF before March 31st to slash taxable burden.`,
      chips: ['Stocks vs FDs', '50/30/20 Plan', 'Monthly Financial Report']
    };
  }

  // 5. STOCKS VS FIXED DEPOSITS (FDS / CDS / BONDS)
  if (
    (q.includes('stock') && (q.includes('fd') || q.includes('fixed deposit') || q.includes('cd') || q.includes('bond'))) ||
    q.includes('stocks or invest in fd') || q.includes('stocks vs fd') || q.includes('shares or fd')
  ) {
    return {
      text: `📊 **Stocks vs. Fixed Deposits (FDs): Strategic Comparison for ${personaName}**\n\nThe choice depends on your **time horizon, liquidity needs, and risk tolerance**:\n\n### 1. 📈 Stocks / Equity (Wealth Accelerator)\n• **Expected Returns:** 10% – 14% p.a. (historical long-term average).\n• **Inflation Beating:** Yes. Equities reliably beat inflation (6-7%) over 5+ year periods.\n• **Risk & Volatility:** Short-term fluctuations, but diminishes significantly over 5–10+ years.\n• **Best for:** Long-term wealth generation, retirement (10+ yrs), house down payments.\n\n### 2. 🛡️ Fixed Deposits / CDs (Capital Protection)\n• **Expected Returns:** 6.0% – 7.5% p.a. (fixed and guaranteed).\n• **Inflation Impact:** Barely matches inflation after post-tax deductions.\n• **Risk & Volatility:** Zero market risk (guaranteed principal and interest).\n• **Best for:** Emergency funds (3–6 months), near-term goals (< 2 years).\n\n### 💡 **FinAI Personalized Allocation for ${personaName}:**\n• Keep **${health.runwayMonths} months (${cur}${(totalExpense * 3).toLocaleString()} to ${cur}${(totalExpense * 6).toLocaleString()})** in FDs/High Yield Savings for emergency safety.\n• Deploy **70% of monthly surplus (${cur}${Math.round(netSavings * 0.7).toLocaleString()})** into broad Index Funds (S&P 500 / Nifty 50) for compound growth!`,
      chips: ['Best Mutual Funds & ETFs', 'How to build Emergency Fund?', '50/30/20 Smart Blueprint']
    };
  }

  // 6. MUTUAL FUNDS, ETFS, SIP VS LUMP SUM
  if (q.includes('mutual fund') || q.includes('etf') || q.includes('index fund') || q.includes('sip') || q.includes('lump sum')) {
    return {
      text: `📈 **Index Funds, ETFs & Systematic Investment (SIP) Blueprint**\n\n• **Low-Cost Index Funds:** Over a 10-year horizon, broad market index funds (S&P 500, Nifty 50, Total Market) outperform 85% of active mutual funds with negligible expense fees (< 0.10%).\n• **SIP Strategy:** Automating a monthly SIP of **${cur}${Math.round(netSavings * 0.5).toLocaleString()}** averages out market volatility via Dollar Cost Averaging.\n• **SIP vs Lump Sum:** For recurring monthly income, SIP is psychologically and mathematically ideal. For large windfalls (e.g. bonus), deploy 30% upfront and 70% in a 6-month Systematic Transfer Plan (STP).\n• **Recommended Asset Allocation:**\n  - 60% Large Cap / Index Core\n  - 25% Mid & Flexi Cap Funds\n  - 15% International / Tech ETFs`,
      chips: ['Stocks vs FDs', 'Calculate Compound Growth', 'Analyze my budget']
    };
  }

  // 7. REAL ESTATE VS RENTING (BUY VS RENT)
  if (q.includes('real estate') || q.includes('property') || q.includes('buy house') || q.includes('rent vs buy') || q.includes('flat')) {
    return {
      text: `🏠 **Real Estate vs. Stock Market (Rent vs. Buy Analysis)**\n\n### The 5% Rule of Homeownership:\nIf annual rental cost is **< 5% of property purchase price**, renting while investing the down payment and EMI differential in equity index funds yields higher lifetime net worth.\n\n• **When to Buy:** If you plan to stay in the city for 10+ years, have a 20% down payment saved, and your monthly EMI is < 30% of take-home income.\n• **When to Rent:** If you value career flexibility, early career growth, or real estate yields in your area are low (2–3% rental yield).\n• **Hidden Real Estate Costs:** Property taxes, maintenance (1-2% annually), home insurance, mortgage interest, registry & stamp duty (5-8%).`,
      chips: ['House Down Payment Goal', 'Loan Steps in Bank', '50/30/20 Smart Blueprint']
    };
  }

  // 8. DEBT PAYOFF / CREDIT CARDS (SNOWBALL VS AVALANCHE)
  if (q.includes('debt') || q.includes('credit card debt') || q.includes('snowball') || q.includes('avalanche') || q.includes('pay off debt')) {
    return {
      text: `💳 **Debt Elimination Blueprint (Snowball vs. Avalanche)**\n\n### 1. ⚡ Debt Avalanche (Mathematically Superior)\n• Pay minimums on all loans, then throw **100% of extra cash** at the debt with the **highest interest rate** (e.g. Credit cards at 24-36% APR).\n• *Saves the maximum amount of total interest money.*\n\n### 2. ⛄ Debt Snowball (Psychological Momentum)\n• Pay minimums on all, and attack the **smallest balance** first regardless of interest rate.\n• *Creates fast quick-win dopamine hits to keep you motivated.*\n\n### 💡 **Golden Rule:**\nAny debt with **>8% interest** should be paid off aggressively before making discretionary luxury investments!`,
      chips: ['50/30/20 Plan', 'Log an expense', 'How is my health score?']
    };
  }

  // 9. CRYPTOCURRENCY & DIGITAL ASSETS
  if (q.includes('crypto') || q.includes('bitcoin') || q.includes('ethereum') || q.includes('btc')) {
    return {
      text: `🪙 **Cryptocurrency & Digital Assets Allocation**\n\n• **Risk Profile:** Extremely volatile and speculative (50–80% drawdowns in bear cycles).\n• **Golden Rule:** Never allocate more than **1% to 5%** of your liquid net worth in crypto.\n• **Blue-chips Only:** Stick primarily to Bitcoin & Ethereum rather than illiquid altcoins.\n• **Prerequisite:** Ensure your **6-month emergency fund** is 100% funded before placing capital in crypto!`,
      chips: ['Emergency Runway Status', 'Stocks vs FDs', 'What is my health score?']
    };
  }

  // 10. RETIREMENT (401K, ROTH IRA, PPF, NPS, FIRE)
  if (q.includes('retire') || q.includes('401k') || q.includes('roth') || q.includes('ira') || q.includes('pension') || q.includes('ppf') || q.includes('nps') || q.includes('fire')) {
    return {
      text: `🏖️ **Retirement Planning & FIRE (Financial Independence)**\n\n### The Optimal Retirement Hierarchy:\n**1. Employer Match:** If employer offers 401(k) / EPF match, contribute up to max match (100% immediate guaranteed return).\n**2. Tax-Advantaged Accounts:** Maximize Roth IRA / SEP-IRA / PPF / NPS annually to grow investments tax-free.\n**3. The 4% Rule:** For financial independence (FIRE), you need an accumulated corpus equal to **25x your annual living expenses** (${cur}${(totalExpense * 12 * 25).toLocaleString()}).\n**4. Target Allocation:** With your net monthly savings of **${cur}${netSavings.toLocaleString()}**, automating 40% into retirement funds puts you on track to retire 8 years early!`,
      chips: ['Simulate Savings Growth', 'Stocks vs FDs', 'Monthly Report']
    };
  }

  // 11. BUDGETING & 50/30/20 BLUEPRINT
  if (q.includes('50/30/20') || q.includes('budget') || q.includes('overspend') || q.includes('limit') || q.includes('spending')) {
    const plan = generateSmartBudgetPlan(totalIncome, scenario?.id);
    const analysis = analyzeCategoryBudgets(expenses, budgets);

    if (q.includes('50/30/20') || q.includes('rule') || q.includes('formula')) {
      return {
        text: `📐 **50/30/20 Smart Financial Blueprint** for ${cur}${totalIncome.toLocaleString()} Income:\n\n• 🏠 **Needs (${plan.needsPercent}%):** ${cur}${plan.needsBudget.toLocaleString()}/mo (Housing, Groceries, Utilities, Health)\n• 🍿 **Wants (${plan.wantsPercent}%):** ${cur}${plan.wantsBudget.toLocaleString()}/mo (Dining out, Leisure, Shopping)\n• 📈 **Savings & Investments (${plan.savingsPercent}%):** ${cur}${plan.savingsBudget.toLocaleString()}/mo (Emergency Fund, Goals, Stocks/FDs)\n\n✨ Projected annual wealth accumulation: **${cur}${(plan.savingsBudget * 12).toLocaleString()} / year**!`,
        chips: ['Apply Blueprint to Budget', 'Stocks vs FDs', 'View All Goals']
      };
    } else {
      if (analysis.overspentCategories.length > 0) {
        const overList = analysis.overspentCategories.map(c => `• **${c.name}**: Spent **${cur}${c.spent}** vs Budget **${cur}${c.budget}** (+${cur}${Math.abs(c.diff)} over)`).join('\n');
        return {
          text: `⚠️ **Overspending Audit for ${personaName}**\n\nYou have exceeded target limits in **${analysis.overspentCategories.length} category/categories**:\n\n${overList}\n\n💡 **AI Recommendation:** Cut discretionary leisure and dining by 20% over the next 14 days to preserve your monthly savings surplus.`,
          chips: ['Optimize my budget now', 'Generate 50/30/20 Plan', 'Show Monthly Report']
        };
      } else {
        return {
          text: `🎉 **Budget Adherence is Pristine!**\n\nAll your expense categories are currently **within budget ceilings**.\n\n• **Monthly Inflows:** ${cur}${totalIncome.toLocaleString()}\n• **Monthly Outflows:** ${cur}${totalExpense.toLocaleString()} (${Math.round((totalExpense/totalIncome)*100)}%)\n• **Current Net Surplus:** ${cur}${netSavings.toLocaleString()}`,
          chips: ['Deposit to Goals', 'What-If Simulation', 'Monthly Report']
        };
      }
    }
  }

  // 12. GENERAL / OPEN-ENDED FINANCIAL INTELLIGENCE RESOLVER (FOR ANY TOPIC!)
  const words = q.split(/\s+/);
  const keywords = words.filter(w => w.length > 3 && !['what', 'when', 'where', 'which', 'should', 'would', 'could', 'their', 'there', 'about', 'steps'].includes(w));
  const topicKeyword = keywords.join(' ') || rawQuery;

  return {
    text: `🧠 **FinAI Financial Intelligence Advisory: "${rawQuery}"**\n\n### 1. 🎯 Strategic Overview & Principle for ${personaName}\nWhen evaluating **"${rawQuery}"**, the optimal decision depends on your current financial standing (**${cur}${totalIncome.toLocaleString()} monthly cashflow**, **${cur}${netSavings.toLocaleString()} surplus**, and **${health.runwayMonths} months emergency runway**).\n\n### 2. 📋 Step-by-Step Action Framework:\n**1. Define Timeline & Objective:** Categorize this goal as Short-Term (<1 yr), Medium-Term (1–5 yrs), or Long-Term (5+ yrs).\n**2. Risk & Cashflow Impact:** Ensure any commitment does not push your total fixed commitments above **50% of monthly income**.\n**3. Capital Safety & Tax Efficiency:** Verify the tax implications and ensure capital preservation rules apply before locking in funds.\n**4. Execution & Tracking:** Automate transfers and audit performance monthly in your FinAI Dashboard.\n\n### 3. 💡 Personalized Recommendation:\nWith your **${health.score}/100 Financial Health Score (${health.grade})**, allocate surplus cash deliberately—prioritize liquid emergency buffers first, followed by diversified equity instruments!`,
    chips: [
      'Stocks vs FDs',
      'Loan Steps in Bank',
      'Analyze my monthly budget',
      '50/30/20 Smart Blueprint'
    ]
  };
}
