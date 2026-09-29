export const CATEGORIES = [
  { id: 'housing', name: 'Housing & Rent', icon: 'Home', color: '#3b82f6', type: 'need' },
  { id: 'groceries', name: 'Groceries & Supermarket', icon: 'ShoppingBag', color: '#10b981', type: 'need' },
  { id: 'dining', name: 'Dining Out & Cafes', icon: 'Utensils', color: '#f59e0b', type: 'want' },
  { id: 'transport', name: 'Transport & Fuel', icon: 'Car', color: '#8b5cf6', type: 'need' },
  { id: 'utilities', name: 'Utilities & Bills', icon: 'Zap', color: '#06b6d4', type: 'need' },
  { id: 'entertainment', name: 'Entertainment & Subscriptions', icon: 'Film', color: '#ec4899', type: 'want' },
  { id: 'health', name: 'Healthcare & Fitness', icon: 'HeartPulse', color: '#ef4444', type: 'need' },
  { id: 'education', name: 'Education & Books', icon: 'GraduationCap', color: '#6366f1', type: 'need' },
  { id: 'shopping', name: 'Shopping & Apparel', icon: 'ShoppingBag', color: '#f97316', type: 'want' },
  { id: 'work', name: 'Business & Freelance Tools', icon: 'Briefcase', color: '#14b8a6', type: 'need' },
  { id: 'misc', name: 'Miscellaneous', icon: 'MoreHorizontal', color: '#94a3b8', type: 'want' }
];

export const PAYMENT_METHODS = [
  'Bank Transfer', 'Credit Card', 'Debit Card', 'UPI / Instant Pay', 'Cash', 'Digital Wallet'
];

export const SCENARIOS = {
  scenario_1: {
    id: 'scenario_1',
    name: 'Salaried Professional',
    persona: 'Alex Morgan',
    role: 'Senior Software Engineer',
    avatar: '💼',
    tagline: 'Fixed monthly paycheck, optimizing investments & curbing lifestyle inflation',
    currency: '₹',
    description: 'A salaried professional logging regular monthly income and daily expenses across rent, food, transport, and leisure. The AI identifies overspending in entertainment and dining, creating an optimized 50/30/20 budget plan.',
    summaryBadge: 'High Income &bull; High Leisure Overspending',
    monthlyIncome: 6500,
    incomeSources: [
      { id: 'inc-1', title: 'Tech Corp Primary Salary', amount: 5800, type: 'Monthly Fixed', date: '2026-09-01', status: 'Received' },
      { id: 'inc-2', title: 'Quarterly Performance Bonus (Prorated)', amount: 700, type: 'Bonus', date: '2026-09-15', status: 'Received' }
    ],
    expenses: [
      { id: 'exp-1', title: 'Downtown Apartment Rent', amount: 1850, category: 'housing', date: '2026-09-02', paymentMethod: 'Bank Transfer', notes: 'Monthly rent & maintenance' },
      { id: 'exp-2', title: 'Organic Supermarket Groceries', amount: 550, category: 'groceries', date: '2026-09-05', paymentMethod: 'Credit Card', notes: 'Weekly groceries' },
      { id: 'exp-3', title: 'Weekend Dinners & Fine Dining', amount: 480, category: 'dining', date: '2026-09-08', paymentMethod: 'Credit Card', notes: 'Sushi & bistro dinners' },
      { id: 'exp-4', title: 'Car Lease & Supercharging', amount: 460, category: 'transport', date: '2026-09-10', paymentMethod: 'Debit Card', notes: 'Tesla lease & charging' },
      { id: 'exp-5', title: 'Electric, Water & High-Speed Fiber', amount: 210, category: 'utilities', date: '2026-09-12', paymentMethod: 'Bank Transfer', notes: 'Utilities' },
      { id: 'exp-6', title: 'Concert Tickets & VIP Club Pass', amount: 380, category: 'entertainment', date: '2026-09-14', paymentMethod: 'Credit Card', notes: 'Weekend festival' },
      { id: 'exp-7', title: 'Streaming Subscriptions (Netflix, HBO, Spotify)', amount: 65, category: 'entertainment', date: '2026-09-15', paymentMethod: 'Credit Card', notes: 'Monthly digital perks' },
      { id: 'exp-8', title: 'Luxury Gym & Personal Trainer', amount: 160, category: 'health', date: '2026-09-16', paymentMethod: 'Credit Card', notes: 'Equinox membership' },
      { id: 'exp-9', title: 'Designer Clothing & Tech Gadgets', amount: 340, category: 'shopping', date: '2026-09-18', paymentMethod: 'Credit Card', notes: 'Noise-canceling headphones' },
      { id: 'exp-10', title: 'Artisan Coffee & Lunches at Work', amount: 175, category: 'dining', date: '2026-09-20', paymentMethod: 'UPI / Instant Pay', notes: 'Daily coffee runs' }
    ],
    budgets: {
      housing: 1900,
      groceries: 600,
      dining: 400,
      transport: 500,
      utilities: 250,
      entertainment: 250,
      health: 200,
      education: 100,
      shopping: 200,
      work: 50,
      misc: 100
    },
    savingsGoals: [
      { id: 'goal-1', title: '🏡 Dream House Down Payment', target: 60000, current: 24500, deadline: '2027-12-31', category: 'Property', monthlyContribution: 800 },
      { id: 'goal-2', title: '🛡️ 6-Month Emergency Fund', target: 20000, current: 18000, deadline: '2026-12-31', category: 'Emergency', monthlyContribution: 400 },
      { id: 'goal-3', title: '✈️ Japan Cherry Blossom Vacation', target: 5000, current: 3800, deadline: '2027-04-15', category: 'Travel', monthlyContribution: 250 }
    ],
    aiRecommendations: [
      'Your Entertainment & Dining spend ($1,100 total) accounts for 24% of your total budget, exceeding the recommended 15% threshold for discretionary indulgence.',
      'By capping weekend dining out at $300 and cutting redundant streaming subscriptions, you can free up $350/month.',
      'Directing that extra $350/mo into your Dream House Down Payment will accelerate your timeline by 9 full months!'
    ]
  },

  scenario_2: {
    id: 'scenario_2',
    name: 'College Student',
    persona: 'Maya Chen',
    role: 'Undergraduate Computer Science Junior',
    avatar: '🎓',
    tagline: 'Limited monthly allowance, building financial discipline & micro-savings',
    currency: '₹',
    description: 'A college student managing a tight allowance across campus dining, textbooks, and social events. The platform helps set strict budget ceilings and micro-saving goals to avoid debt.',
    summaryBadge: 'Constrained Allowance &bull; Micro-Savings Discipline',
    monthlyIncome: 850,
    incomeSources: [
      { id: 'inc-1', title: 'Parents Monthly Allowance', amount: 500, type: 'Allowance', date: '2026-09-01', status: 'Received' },
      { id: 'inc-2', title: 'Campus Library Work-Study', amount: 350, type: 'Part-time Wage', date: '2026-09-15', status: 'Received' }
    ],
    expenses: [
      { id: 'exp-1', title: 'Campus Dining Hall & Snacks', amount: 240, category: 'groceries', date: '2026-09-03', paymentMethod: 'Debit Card', notes: 'Campus meal plan top-up' },
      { id: 'exp-2', title: 'Boba & Campus Cafe Study Sessions', amount: 95, category: 'dining', date: '2026-09-06', paymentMethod: 'UPI / Instant Pay', notes: 'Study group snacks' },
      { id: 'exp-3', title: 'Semester Algorithm Textbooks (Used)', amount: 110, category: 'education', date: '2026-09-09', paymentMethod: 'Debit Card', notes: 'CS textbooks & lab kit' },
      { id: 'exp-4', title: 'Student Metro Pass', amount: 55, category: 'transport', date: '2026-09-11', paymentMethod: 'Debit Card', notes: 'Subway & bus monthly pass' },
      { id: 'exp-5', title: 'Student Spotify & Cloud Storage', amount: 15, category: 'entertainment', date: '2026-09-13', paymentMethod: 'Credit Card', notes: 'Discounted student pack' },
      { id: 'exp-6', title: 'Friday Night Pizza & Campus Socials', amount: 115, category: 'entertainment', date: '2026-09-16', paymentMethod: 'Cash', notes: 'Dorm pizza parties' },
      { id: 'exp-7', title: 'Thrift Store Winter Jacket', amount: 45, category: 'shopping', date: '2026-09-19', paymentMethod: 'Debit Card', notes: 'Warm clothes' },
      { id: 'exp-8', title: 'Dorm Toiletries & Essentials', amount: 35, category: 'misc', date: '2026-09-21', paymentMethod: 'Debit Card', notes: 'Laundry & personal care' }
    ],
    budgets: {
      housing: 0,
      groceries: 250,
      dining: 60,
      transport: 60,
      utilities: 0,
      entertainment: 80,
      health: 20,
      education: 120,
      shopping: 40,
      work: 0,
      misc: 40
    },
    savingsGoals: [
      { id: 'goal-1', title: '💻 M3 MacBook for Thesis Project', target: 1200, current: 750, deadline: '2027-01-30', category: 'Tech', monthlyContribution: 75 },
      { id: 'goal-2', title: '🛡️ Post-Grad Relocation Buffer', target: 2000, current: 620, deadline: '2027-06-01', category: 'Emergency', monthlyContribution: 50 }
    ],
    aiRecommendations: [
      'Cafe coffee & boba drinks ($95) represent 11% of your total allowance. Brewing coffee in your dorm can save $65/mo.',
      'Check university library digital reserves before purchasing course books—could save $110 next semester.',
      'Your savings streak is 4 months strong! Reaching $1,000 will provide a full month buffer upon graduation.'
    ]
  },

  scenario_3: {
    id: 'scenario_3',
    name: 'Freelancer / Consultant',
    persona: 'Devon Vance',
    role: 'Independent Product Designer',
    avatar: '💻',
    tagline: 'Variable monthly cash flow, tax safe-harbors & emergency runway index',
    currency: '₹',
    description: 'A freelance creative with fluctuating multi-client revenues. The AI dynamically recalibrates budgets based on 3-month rolling averages and builds an ironclad 6-month living runway.',
    summaryBadge: 'Variable Revenue &bull; Tax Reserve &amp; Runway Protection',
    monthlyIncome: 7400,
    incomeSources: [
      { id: 'inc-1', title: 'Fintech Startup UI/UX Retainer', amount: 3500, type: 'Client Contract', date: '2026-09-02', status: 'Received' },
      { id: 'inc-2', title: 'E-commerce Redesign Milestone #2', amount: 2400, type: 'Project Milestone', date: '2026-09-14', status: 'Received' },
      { id: 'inc-3', title: 'Figma UI Component Kit Royalties', amount: 650, type: 'Passive Income', date: '2026-09-20', status: 'Received' },
      { id: 'inc-4', title: 'Design Mentorship Sessions', amount: 850, type: 'Hourly Consulting', date: '2026-09-22', status: 'Received' }
    ],
    expenses: [
      { id: 'exp-1', title: 'Live/Work Studio Loft Rent', amount: 1650, category: 'housing', date: '2026-09-03', paymentMethod: 'Bank Transfer', notes: 'Home studio space' },
      { id: 'exp-2', title: 'Private Freelancer Health & Dental Plan', amount: 420, category: 'health', date: '2026-09-05', paymentMethod: 'Bank Transfer', notes: 'Monthly premium' },
      { id: 'exp-3', title: 'Co-working Hot Desk & Coffee Membership', amount: 320, category: 'work', date: '2026-09-07', paymentMethod: 'Credit Card', notes: 'WeWork access' },
      { id: 'exp-4', title: 'Design Software (Figma, Adobe CC, Midjourney)', amount: 185, category: 'work', date: '2026-09-09', paymentMethod: 'Credit Card', notes: 'Design stack' },
      { id: 'exp-5', title: 'High-Speed Fiber & Cloud Servers', amount: 140, category: 'utilities', date: '2026-09-11', paymentMethod: 'Credit Card', notes: 'Studio internet & AWS' },
      { id: 'exp-6', title: 'Fresh Food & Meal Delivery Prep', amount: 680, category: 'groceries', date: '2026-09-13', paymentMethod: 'Credit Card', notes: 'Healthy meals' },
      { id: 'exp-7', title: 'Client Business Lunches & Networking', amount: 280, category: 'dining', date: '2026-09-17', paymentMethod: 'Credit Card', notes: 'Tax-deductible meals' },
      { id: 'exp-8', title: 'Uber & Ride-hailing for Client Meets', amount: 190, category: 'transport', date: '2026-09-19', paymentMethod: 'Credit Card', notes: 'Transport' },
      { id: 'exp-9', title: 'Ergonomic Standing Desk Upgrade', amount: 310, category: 'work', date: '2026-09-21', paymentMethod: 'Credit Card', notes: 'Studio equipment' }
    ],
    budgets: {
      housing: 1700,
      groceries: 700,
      dining: 300,
      transport: 250,
      utilities: 160,
      entertainment: 200,
      health: 450,
      education: 150,
      shopping: 200,
      work: 750,
      misc: 150
    },
    savingsGoals: [
      { id: 'goal-1', title: '🛡️ 6-Month Freelance Runway Vault', target: 24000, current: 16800, deadline: '2027-03-31', category: 'Emergency', monthlyContribution: 1200 },
      { id: 'goal-2', title: '🏛️ IRS Quarterly Tax Safe-box (25%)', target: 7500, current: 5500, deadline: '2026-10-15', category: 'Tax', monthlyContribution: 1850 },
      { id: 'goal-3', title: '📈 Solo 401(k) / SEP-IRA Growth', target: 22000, current: 12400, deadline: '2027-12-31', category: 'Retirement', monthlyContribution: 800 }
    ],
    aiRecommendations: [
      'This was a high-revenue month ($7,400 vs $5,200 average). Automatically lock away 28% ($2,072) for tax reserves before allocating discretionary funds.',
      'Your baseline lean burn rate is $3,200/mo. Your current runway stands at 5.25 months—within 1 month of full target stability.',
      'Ensure all business software and 50% of client dining expenses are categorized for tax write-offs.'
    ]
  },

  scenario_4: {
    id: 'scenario_4',
    name: 'Household Manager',
    persona: 'The Sharma Family (Priya & Rahul)',
    role: 'Dual Income Family (Marketing Director + Biotech Manager)',
    avatar: '👨‍👩‍👧‍👦',
    tagline: 'Multi-earner shared finances, children education, mortgage & joint goals',
    currency: '₹',
    description: 'A household manager monitoring multi-source family income, mortgage payments, children education, utilities, and grocery bills with real-time overrun alerts.',
    summaryBadge: 'Dual Income &bull; Family Budget &amp; College Funds',
    monthlyIncome: 9800,
    incomeSources: [
      { id: 'inc-1', title: 'Priya Senior Role Salary', amount: 5600, type: 'Monthly Fixed', date: '2026-09-01', status: 'Received' },
      { id: 'inc-2', title: 'Rahul Biotech Lead Salary', amount: 3700, type: 'Monthly Fixed', date: '2026-09-01', status: 'Received' },
      { id: 'inc-3', title: 'Suburban Rental Property Dividend', amount: 500, type: 'Real Estate', date: '2026-09-05', status: 'Received' }
    ],
    expenses: [
      { id: 'exp-1', title: 'Primary Residence Mortgage & Escrow', amount: 2850, category: 'housing', date: '2026-09-02', paymentMethod: 'Bank Transfer', notes: 'Fixed rate mortgage' },
      { id: 'exp-2', title: 'Wholesale Club & Family Groceries', amount: 1250, category: 'groceries', date: '2026-09-04', paymentMethod: 'Credit Card', notes: 'Costco & Trader Joes' },
      { id: 'exp-3', title: 'Private School Tuition & Karate Club', amount: 920, category: 'education', date: '2026-09-07', paymentMethod: 'Bank Transfer', notes: 'Two children tuition & extracurriculars' },
      { id: 'exp-4', title: 'Household Utilities (Power, Gas, Water, Solar, Gig-Fiber)', amount: 460, category: 'utilities', date: '2026-09-09', paymentMethod: 'Bank Transfer', notes: 'Seasonal air conditioning spike' },
      { id: 'exp-5', title: 'Family Health & Dental Comprehensive', amount: 480, category: 'health', date: '2026-09-12', paymentMethod: 'Bank Transfer', notes: 'Family insurance premium' },
      { id: 'exp-6', title: 'Two Family SUVs (Loan & Petrol/Service)', amount: 720, category: 'transport', date: '2026-09-14', paymentMethod: 'Debit Card', notes: 'Commute & school runs' },
      { id: 'exp-7', title: 'Weekend Family Dinners & Kids Birthdays', amount: 450, category: 'dining', date: '2026-09-18', paymentMethod: 'Credit Card', notes: 'Family gatherings' },
      { id: 'exp-8', title: 'Kids Clothes & Seasonal Wardrobe', amount: 280, category: 'shopping', date: '2026-09-20', paymentMethod: 'Credit Card', notes: 'Back-to-school wear' },
      { id: 'exp-9', title: 'Home Maintenance & Lawn Service', amount: 220, category: 'housing', date: '2026-09-22', paymentMethod: 'Bank Transfer', notes: 'Gardener & HVAC filter replacement' }
    ],
    budgets: {
      housing: 3100,
      groceries: 1200,
      dining: 400,
      transport: 750,
      utilities: 400,
      entertainment: 250,
      health: 500,
      education: 950,
      shopping: 300,
      work: 100,
      misc: 200
    },
    savingsGoals: [
      { id: 'goal-1', title: '🎓 529 Children College Education Fund', target: 80000, current: 39500, deadline: '2032-06-30', category: 'Education', monthlyContribution: 1100 },
      { id: 'goal-2', title: '🛡️ Family Safety Vault (8 Months)', target: 45000, current: 34200, deadline: '2027-08-31', category: 'Emergency', monthlyContribution: 650 },
      { id: 'goal-3', title: '☀️ Rooftop Solar + Battery System', target: 14000, current: 8200, deadline: '2027-03-31', category: 'Home Improvement', monthlyContribution: 450 }
    ],
    aiRecommendations: [
      'Your family groceries and utilities were 12% above seasonal targets ($1,710 vs $1,600). Bulk meal planning could save $180/mo.',
      'Your shared savings rate is a stellar 22.8% of combined net revenue ($2,200+ monthly surplus).',
      'At current deposit velocity, your 529 College Fund will reach 100% target 1.5 years ahead of your children entering high school.'
    ]
  }
};
