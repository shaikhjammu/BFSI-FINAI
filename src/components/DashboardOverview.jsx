import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  PiggyBank, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  PlusCircle,
  Zap,
  Flame
} from 'lucide-react';
import { playSound } from '../utils/effects';

export default function DashboardOverview({ 
  income, 
  expenses, 
  budgets, 
  health, 
  currency = '$', 
  onOpenAddExpense, 
  onOpenAddIncome,
  onOpenAiChat,
  onOpenReport,
  soundEffects 
}) {
  const totalIncome = typeof income === 'number' ? income : (income || []).reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
  const totalExpense = typeof expenses === 'number' ? expenses : (expenses || []).reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const netSavings = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? (netSavings / totalIncome) * 100 : 0;
  const expenseRatio = totalIncome > 0 ? (totalExpense / totalIncome) * 100 : 0;

  return (
    <section className="mb-10 space-y-6">
      
      {/* 4 Key Financial Metrics Bento Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* 1. Monthly Income Card */}
        <div className="glass-card-neo rounded-3xl p-6 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Total Inflows</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {currency}{totalIncome.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full flex items-center border border-emerald-500/20">
              <ArrowUpRight className="w-3.5 h-3.5" /> 100%
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/5">
            <span>{Array.isArray(income) ? income.length : 1} Income Stream(s)</span>
            <button 
              onClick={() => {
                if (soundEffects) playSound('click');
                onOpenAddIncome();
              }}
              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5 transition-colors bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1 rounded-xl border border-emerald-500/30"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Add
            </button>
          </div>
        </div>

        {/* 2. Monthly Expenses Card */}
        <div className="glass-card-neo rounded-3xl p-6 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Total Outflows</span>
            <div className="w-10 h-10 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-110 shadow-[0_0_15px_rgba(244,63,94,0.25)] transition-all">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {currency}{totalExpense.toLocaleString()}
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center border ${expenseRatio > 85 ? 'bg-rose-500/15 text-rose-300 border-rose-500/30' : 'bg-white/5 text-slate-300 border-white/10'}`}>
              <ArrowDownRight className="w-3.5 h-3.5" /> {expenseRatio.toFixed(0)}%
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/5">
            <span>{Array.isArray(expenses) ? expenses.length : 0} Logged Items</span>
            <button 
              onClick={() => {
                if (soundEffects) playSound('click');
                onOpenAddExpense();
              }}
              className="text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1.5 transition-colors bg-rose-500/10 hover:bg-rose-500/20 px-2.5 py-1 rounded-xl border border-rose-500/30"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Log
            </button>
          </div>
        </div>

        {/* 3. Net Savings Surplus Card */}
        <div className="glass-card-neo rounded-3xl p-6 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Monthly Surplus</span>
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all">
              <PiggyBank className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl sm:text-4xl font-black tracking-tight ${netSavings >= 0 ? 'text-white' : 'text-rose-400'}`}>
              {netSavings < 0 ? '-' : ''}{currency}{Math.abs(netSavings).toLocaleString()}
            </span>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${savingsRate >= 20 ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : savingsRate > 0 ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-rose-500/20 text-rose-300 border-rose-500/40'}`}>
              {savingsRate.toFixed(1)}% Rate
            </span>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5">
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 h-2 rounded-full transition-all duration-700 shadow-[0_0_10px_#06b6d4]" 
                style={{ width: `${Math.min(100, Math.max(0, savingsRate))}%` }}
              />
            </div>
          </div>
        </div>

        {/* 4. Emergency Runway Card */}
        <div className="glass-card-neo rounded-3xl p-6 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Emergency Buffer</span>
            <div className="w-10 h-10 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 shadow-[0_0_15px_rgba(168,85,247,0.25)] transition-all">
              {Number(health?.runwayMonths) >= 4 ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {health?.runwayMonths || '0.0'} <span className="text-sm font-semibold text-slate-400">Months</span>
            </span>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${Number(health?.runwayMonths) >= 6 ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : Number(health?.runwayMonths) >= 3 ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' : 'bg-amber-500/20 text-amber-300 border-amber-500/40'}`}>
              {Number(health?.runwayMonths) >= 6 ? 'Resilient' : Number(health?.runwayMonths) >= 3 ? 'Adequate' : 'Building'}
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/5">
            <span>Target: 6.0 Months</span>
            <button 
              onClick={() => {
                if (soundEffects) playSound('ai-message');
                onOpenAiChat('What is my emergency fund runway and how do I improve it?');
              }}
              className="text-purple-300 hover:text-purple-200 font-bold flex items-center gap-1.5 transition-colors bg-purple-500/10 hover:bg-purple-500/20 px-2.5 py-1 rounded-xl border border-purple-500/30"
            >
              <Sparkles className="w-3.5 h-3.5" /> AI Tip
            </button>
          </div>
        </div>

      </div>

      {/* Financial Health Score Bento Banner */}
      <div className="glass-panel-ultra rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Radial Score Meter & Details */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left flex-1">
            <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
              <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  className="text-white/10" 
                  fill="transparent" 
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  className={health?.score >= 80 ? 'text-emerald-400' : health?.score >= 60 ? 'text-cyan-400' : health?.score >= 40 ? 'text-amber-400' : 'text-rose-400'} 
                  fill="transparent" 
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - (health?.score || 50) / 100)}`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-white leading-none tracking-tight">{health?.score || 0}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Score</span>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <span className={`text-xs font-extrabold uppercase px-3 py-1 rounded-full border shadow-sm ${health?.badgeColor || 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'}`}>
                  {health?.grade || 'Good'}
                </span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Financial Rizz &amp; Health Rating
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white mt-2">
                {health?.score >= 80 ? 'Unstoppable Financial Velocity 🚀' : health?.score >= 65 ? 'Balanced & Steady Cashflow ⚡' : 'Opportunity to Optimize Discretionary Spend 🎯'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1.5 leading-relaxed">
                {health?.summary}
              </p>
            </div>
          </div>

          {/* 4 Pillars Progress Bento Cards */}
          <div className="w-full lg:w-96 grid grid-cols-2 gap-3.5 bg-white/[0.03] p-4 rounded-2xl border border-white/10 shrink-0">
            {health?.pillars?.map((pillar, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400 font-medium truncate">{pillar.name}</span>
                  <span className="font-extrabold text-white">{pillar.value}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-emerald-400 to-teal-300 h-2 rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                    style={{ width: `${(pillar.score / pillar.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
