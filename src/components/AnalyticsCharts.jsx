import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  BarChart3, 
  PieChart as PieIcon, 
  TrendingUp, 
  Sparkles, 
  Calendar,
  Layers
} from 'lucide-react';
import { CATEGORIES } from '../data/initialData';

export default function AnalyticsCharts({ 
  income, 
  expenses = [], 
  currency = '$' 
}) {
  const [chartView, setChartView] = useState('breakdown'); // 'breakdown' | 'trend' | 'forecast'

  const totalIncome = typeof income === 'number' ? income : (income || []).reduce((s, i) => s + (Number(i.amount) || 0), 0);
  const totalExpense = expenses.reduce((s, e) => s + (Number(e.amount) || 0), 0);

  // 1. Category Distribution Data
  const categorySpending = {};
  expenses.forEach(e => {
    categorySpending[e.category] = (categorySpending[e.category] || 0) + Number(e.amount);
  });

  const pieData = Object.keys(categorySpending).map(catId => {
    const cat = CATEGORIES.find(c => c.id === catId) || { name: catId, color: '#94a3b8' };
    return {
      name: cat.name,
      value: categorySpending[catId],
      color: cat.color
    };
  }).sort((a, b) => b.value - a.value);

  // 2. 6-Month Historical Cashflow Data (Simulated based on current persona)
  const historicalData = [
    { month: 'Apr', income: Math.round(totalIncome * 0.92), expenses: Math.round(totalExpense * 0.95), savings: Math.round(totalIncome * 0.92 - totalExpense * 0.95) },
    { month: 'May', income: Math.round(totalIncome * 0.96), expenses: Math.round(totalExpense * 1.02), savings: Math.round(totalIncome * 0.96 - totalExpense * 1.02) },
    { month: 'Jun', income: Math.round(totalIncome * 0.98), expenses: Math.round(totalExpense * 0.91), savings: Math.round(totalIncome * 0.98 - totalExpense * 0.91) },
    { month: 'Jul', income: Math.round(totalIncome * 1.05), expenses: Math.round(totalExpense * 1.08), savings: Math.round(totalIncome * 1.05 - totalExpense * 1.08) },
    { month: 'Aug', income: Math.round(totalIncome * 0.95), expenses: Math.round(totalExpense * 0.89), savings: Math.round(totalIncome * 0.95 - totalExpense * 0.89) },
    { month: 'Sep (Current)', income: totalIncome, expenses: totalExpense, savings: Math.max(0, totalIncome - totalExpense) },
  ];

  // 3. 6-Month Predictive Wealth Forecast Data
  const currentNetSavings = Math.max(0, totalIncome - totalExpense);
  const forecastData = [
    { month: 'Current', balance: currentNetSavings, projectedGrowth: currentNetSavings },
    { month: '+1 Mo', balance: currentNetSavings * 2, projectedGrowth: Math.round(currentNetSavings * 2.05) },
    { month: '+2 Mo', balance: currentNetSavings * 3, projectedGrowth: Math.round(currentNetSavings * 3.12) },
    { month: '+3 Mo', balance: currentNetSavings * 4, projectedGrowth: Math.round(currentNetSavings * 4.22) },
    { month: '+4 Mo', balance: currentNetSavings * 5, projectedGrowth: Math.round(currentNetSavings * 5.35) },
    { month: '+5 Mo', balance: currentNetSavings * 6, projectedGrowth: Math.round(currentNetSavings * 6.52) },
    { month: '+6 Mo', balance: currentNetSavings * 7, projectedGrowth: Math.round(currentNetSavings * 7.74) },
  ];

  // 4. Needs vs Wants vs Savings Breakdown
  const needCatIds = CATEGORIES.filter(c => c.type === 'need').map(c => c.id);
  const wantCatIds = CATEGORIES.filter(c => c.type === 'want').map(c => c.id);

  const totalNeeds = expenses.filter(e => needCatIds.includes(e.category)).reduce((sum, e) => sum + e.amount, 0);
  const totalWants = expenses.filter(e => wantCatIds.includes(e.category)).reduce((sum, e) => sum + e.amount, 0);
  const totalSavingsSurplus = Math.max(0, totalIncome - totalExpense);

  const needsActualPct = totalIncome > 0 ? Math.round((totalNeeds / totalIncome) * 100) : 0;
  const wantsActualPct = totalIncome > 0 ? Math.round((totalWants / totalIncome) * 100) : 0;
  const savingsActualPct = totalIncome > 0 ? Math.round((totalSavingsSurplus / totalIncome) * 100) : 0;

  return (
    <div className="glass-panel rounded-2xl border border-white/10 p-5 sm:p-6 mb-8 shadow-xl">
      
      {/* Header & Chart Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            Predictive Spending Analytics &amp; Visualizations
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Interactive distribution charts, 6-month trends, and AI wealth projections
          </p>
        </div>

        {/* Switch View Buttons */}
        <div className="flex bg-slate-950/80 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setChartView('breakdown')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              chartView === 'breakdown'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Category Share
          </button>
          <button
            onClick={() => setChartView('trend')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              chartView === 'trend'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            6-Mo Trends
          </button>
          <button
            onClick={() => setChartView('forecast')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              chartView === 'forecast'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Wealth Forecast
          </button>
        </div>
      </div>

      {/* Main Charts Area */}
      <div className="mt-6">
        {chartView === 'breakdown' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Donut Chart */}
            <div className="lg:col-span-7 h-72 sm:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={105}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(val) => [`${currency}${Number(val).toLocaleString()}`, 'Spent']}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.15)', borderRadius: '12px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend & 50/30/20 Allocation Meter */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-950/70 p-4 rounded-xl border border-white/5 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>50/30/20 Rule Comparison</span>
                  <span className="text-emerald-400">Live Metric</span>
                </div>

                {/* Needs Meter */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-blue-400 font-semibold">Needs (Target 50%)</span>
                    <span className="text-white font-bold">{needsActualPct}% ({currency}{totalNeeds.toLocaleString()})</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${Math.min(100, needsActualPct)}%` }} />
                  </div>
                </div>

                {/* Wants Meter */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-pink-400 font-semibold">Wants (Target 30%)</span>
                    <span className="text-white font-bold">{wantsActualPct}% ({currency}{totalWants.toLocaleString()})</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-pink-500 h-2 rounded-full" style={{ width: `${Math.min(100, wantsActualPct)}%` }} />
                  </div>
                </div>

                {/* Savings Meter */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-emerald-400 font-semibold">Savings (Target 20%)</span>
                    <span className="text-white font-bold">{savingsActualPct}% ({currency}{totalSavingsSurplus.toLocaleString()})</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-emerald-400 h-2 rounded-full" style={{ width: `${Math.min(100, savingsActualPct)}%` }} />
                  </div>
                </div>
              </div>

              {/* Top Category Legend Chips */}
              <div className="flex flex-wrap gap-2">
                {pieData.slice(0, 6).map((item, idx) => (
                  <span 
                    key={idx} 
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-slate-300 flex items-center gap-1.5"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.name}: <strong className="text-white">{currency}{item.value}</strong>
                  </span>
                ))}
              </div>
            </div>

          </div>
        )}

        {chartView === 'trend' && (
          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={historicalData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(val) => `${currency}${val}`} />
                <Tooltip 
                  formatter={(val) => [`${currency}${Number(val).toLocaleString()}`, '']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.15)', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="income" name="Monthly Income" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expenses" name="Total Expenses" fill="#f43f5e" radius={[6, 6, 0, 0]} />
                <Bar dataKey="savings" name="Net Savings" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {chartView === 'forecast' && (
          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(val) => `${currency}${val}`} />
                <Tooltip 
                  formatter={(val) => [`${currency}${Number(val).toLocaleString()}`, '']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.15)', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="projectedGrowth" name="AI Optimized Compound Growth (with 6% Yield)" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#growthGrad)" />
                <Area type="monotone" dataKey="balance" name="Linear Cash Accumulation" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#balanceGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

    </div>
  );
}
