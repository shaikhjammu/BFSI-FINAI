import React, { useState } from 'react';
import { 
  PieChart, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Sliders, 
  ArrowRight, 
  TrendingUp, 
  Save, 
  RotateCcw,
  Zap,
  Info
} from 'lucide-react';
import { CATEGORIES } from '../data/initialData';
import { analyzeCategoryBudgets, generateSmartBudgetPlan } from '../services/aiAdvisorEngine';
import { playSound, triggerConfetti } from '../utils/effects';

export default function BudgetGenerator({ 
  income, 
  expenses = [], 
  budgets = {}, 
  onUpdateBudgets, 
  scenarioId, 
  currency = '$', 
  soundEffects = true,
  onOpenAiChat
}) {
  const totalIncome = typeof income === 'number' ? income : (income || []).reduce((s, i) => s + (Number(i.amount) || 0), 0);
  const analysis = analyzeCategoryBudgets(expenses, budgets);
  
  // Simulator State
  const [isSimulatorActive, setIsSimulatorActive] = useState(false);
  const [simulatedCuts, setSimulatedCuts] = useState({
    dining: 0,
    entertainment: 0,
    shopping: 0
  });

  const handleApplySmartPlan = () => {
    const plan = generateSmartBudgetPlan(totalIncome, scenarioId);
    onUpdateBudgets(plan.recommendedBudgets);
    if (soundEffects) {
      playSound('success');
      triggerConfetti('medium');
    }
  };

  const handleBudgetChange = (catId, newAmount) => {
    const val = Math.max(0, parseInt(newAmount) || 0);
    onUpdateBudgets({
      ...budgets,
      [catId]: val
    });
  };

  // Calculate annual savings boost from simulation
  const monthlySimulatedSavings = Object.values(simulatedCuts).reduce((sum, v) => sum + v, 0);
  const annualSimulatedSavings = monthlySimulatedSavings * 12;

  return (
    <div className="glass-panel rounded-2xl border border-white/10 p-5 sm:p-6 mb-8 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <PieChart className="w-5 h-5 text-emerald-400" />
              Dynamic AI Budget Generator &amp; Limits
            </h2>
            {analysis.hasOverspending && (
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse">
                {analysis.overspentCategories.length} Over Budget
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time category spending thresholds with 50/30/20 algorithmic allocation
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              if (soundEffects) playSound('click');
              setIsSimulatorActive(!isSimulatorActive);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              isSimulatorActive
                ? 'bg-purple-500/20 border-purple-500/40 text-purple-300 shadow-neon-purple'
                : 'bg-slate-800 hover:bg-slate-700/80 border-white/10 text-slate-300'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            <span>{isSimulatorActive ? 'Close Simulator' : 'What-If Simulator'}</span>
          </button>

          <button
            onClick={handleApplySmartPlan}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold shadow-neon-emerald transition-all transform active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Auto-Generate 50/30/20 Plan</span>
          </button>
        </div>
      </div>

      {/* Overspending Alert Banner (if any) */}
      {analysis.hasOverspending && (
        <div className="mt-5 p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-slide-up">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-rose-200">
                Budget Overrun Alert in {analysis.overspentCategories.map(c => c.name).join(', ')}
              </h4>
              <p className="text-[11px] text-rose-300/80 mt-0.5">
                Exceeded target limit by an aggregate of {currency}
                {analysis.overspentCategories.reduce((sum, c) => sum + Math.abs(c.diff), 0).toFixed(0)}. Rebalance discretionary spending to prevent depleting your savings goal.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (soundEffects) playSound('ai-message');
              onOpenAiChat('How do I fix my overspent categories this month?');
            }}
            className="text-xs font-bold text-rose-300 bg-rose-500/20 hover:bg-rose-500/30 px-3 py-1.5 rounded-lg border border-rose-500/30 shrink-0 transition-colors"
          >
            AI Fix Advice &rarr;
          </button>
        </div>
      )}

      {/* Interactive "What-If" AI Budget Simulator Panel */}
      {isSimulatorActive && (
        <div className="mt-5 p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-purple-950/40 border border-purple-500/30 animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-400" />
              <h4 className="text-sm font-bold text-white">Interactive "What-If" Spending Optimizer</h4>
            </div>
            <span className="text-xs text-purple-300 font-semibold">Simulate expense cuts</span>
          </div>
          <p className="text-xs text-slate-300 mb-4">
            Slide below to simulate trimming discretionary categories and see the projected compound wealth acceleration.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Cut Dining */}
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-white/10">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-amber-400">Trim Dining Out</span>
                <span className="text-white">-{currency}{simulatedCuts.dining}/mo</span>
              </div>
              <input
                type="range"
                min="0"
                max="300"
                step="25"
                value={simulatedCuts.dining}
                onChange={(e) => setSimulatedCuts({ ...simulatedCuts, dining: parseInt(e.target.value) })}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="text-[10px] text-slate-400 mt-1">E.g., 2 fewer restaurant dinners</div>
            </div>

            {/* Cut Entertainment */}
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-white/10">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-pink-400">Trim Entertainment</span>
                <span className="text-white">-{currency}{simulatedCuts.entertainment}/mo</span>
              </div>
              <input
                type="range"
                min="0"
                max="250"
                step="20"
                value={simulatedCuts.entertainment}
                onChange={(e) => setSimulatedCuts({ ...simulatedCuts, entertainment: parseInt(e.target.value) })}
                className="w-full accent-pink-400 cursor-pointer"
              />
              <div className="text-[10px] text-slate-400 mt-1">E.g., cancel unused subscriptions</div>
            </div>

            {/* Cut Shopping */}
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-white/10">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-orange-400">Trim Shopping</span>
                <span className="text-white">-{currency}{simulatedCuts.shopping}/mo</span>
              </div>
              <input
                type="range"
                min="0"
                max="250"
                step="25"
                value={simulatedCuts.shopping}
                onChange={(e) => setSimulatedCuts({ ...simulatedCuts, shopping: parseInt(e.target.value) })}
                className="w-full accent-orange-400 cursor-pointer"
              />
              <div className="text-[10px] text-slate-400 mt-1">E.g., 30-day impulse purchase delay</div>
            </div>
          </div>

          {/* Simulation Result Card */}
          <div className="mt-4 p-4 rounded-xl bg-purple-900/30 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-purple-200 font-medium">Projected Annual Wealth Acceleration:</div>
              <div className="text-2xl font-black text-white">
                +{currency}{annualSimulatedSavings.toLocaleString()}<span className="text-xs font-normal text-slate-300"> / year</span>
              </div>
            </div>
            <div className="text-xs text-slate-300 text-right sm:max-w-xs">
              🚀 Applying this cut will fund your primary goal <strong className="text-emerald-300 font-bold">{Math.max(1, Math.round(annualSimulatedSavings / 500))} months faster</strong> with compound interest!
            </div>
          </div>
        </div>
      )}

      {/* Category Budgets Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {analysis.allCategories.map((cat) => {
          const isOver = cat.status === 'over';
          const isWarning = cat.status === 'warning';
          return (
            <div 
              key={cat.id} 
              className={`p-4 rounded-xl bg-slate-950/60 border transition-all ${
                isOver 
                  ? 'border-rose-500/50 bg-rose-950/15' 
                  : isWarning 
                    ? 'border-amber-500/40 bg-amber-950/10' 
                    : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5 truncate">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  {cat.name}
                </span>

                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                  isOver 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                    : isWarning 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {isOver ? 'Exceeded' : isWarning ? 'Near Limit' : 'On Track'}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Spent: <strong className="text-white">{currency}{cat.spent}</strong></span>
                  <span className="text-slate-400">Limit: <strong className="text-slate-200">{currency}{cat.budget}</strong></span>
                </div>
                
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      isOver ? 'bg-rose-500' : isWarning ? 'bg-amber-400' : 'bg-emerald-400'
                    }`}
                    style={{ width: `${Math.min(100, cat.percentage)}%` }}
                  />
                </div>

                <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                  <span>{cat.percentage}% used</span>
                  <span className={cat.diff < 0 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {cat.diff < 0 ? `Over by ${currency}${Math.abs(cat.diff)}` : `${currency}${cat.diff} remaining`}
                  </span>
                </div>
              </div>

              {/* Quick Limit Input */}
              <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs">
                <label className="text-slate-400 text-[11px]">Set Budget:</label>
                <div className="flex items-center gap-1 w-24">
                  <span className="text-slate-500">{currency}</span>
                  <input
                    type="number"
                    step="10"
                    value={cat.budget}
                    onChange={(e) => handleBudgetChange(cat.id, e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-2 py-0.5 text-xs text-right text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
