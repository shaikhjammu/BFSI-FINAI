import React, { useState } from 'react';
import { 
  PiggyBank, 
  Target, 
  Plus, 
  Calendar, 
  Sparkles, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  ShieldCheck,
  Zap,
  ArrowRight,
  X
} from 'lucide-react';
import { playSound, triggerConfetti } from '../utils/effects';

export default function SavingsGoalsTracker({ 
  goals = [], 
  onAddGoal, 
  onDepositToGoal, 
  onDeleteGoal, 
  currency = '$', 
  soundEffects = true,
  netMonthlySavings = 1000
}) {
  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
  const [selectedDepositGoal, setSelectedDepositGoal] = useState(null);
  const [depositAmount, setDepositAmount] = useState('250');

  const [newGoalForm, setNewGoalForm] = useState({
    title: '',
    target: '',
    current: '',
    deadline: '',
    category: 'Emergency',
    monthlyContribution: ''
  });

  const handleCreateGoal = (e) => {
    e.preventDefault();
    if (!newGoalForm.title || !newGoalForm.target) return;

    onAddGoal({
      id: `goal-${Date.now()}`,
      title: newGoalForm.title,
      target: parseFloat(newGoalForm.target),
      current: parseFloat(newGoalForm.current || 0),
      deadline: newGoalForm.deadline || '2027-12-31',
      category: newGoalForm.category,
      monthlyContribution: parseFloat(newGoalForm.monthlyContribution || 200)
    });

    if (soundEffects) {
      playSound('success');
      triggerConfetti('medium');
    }

    setIsAddGoalModalOpen(false);
    setNewGoalForm({
      title: '',
      target: '',
      current: '',
      deadline: '',
      category: 'Emergency',
      monthlyContribution: ''
    });
  };

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    if (!selectedDepositGoal || !depositAmount) return;

    const amount = parseFloat(depositAmount);
    const updatedCurrent = selectedDepositGoal.current + amount;
    const isCompleted = updatedCurrent >= selectedDepositGoal.target;

    onDepositToGoal(selectedDepositGoal.id, amount);

    if (soundEffects) {
      playSound('success');
      if (isCompleted) {
        triggerConfetti('high');
      } else {
        triggerConfetti('medium');
      }
    }

    setSelectedDepositGoal(null);
    setDepositAmount('250');
  };

  return (
    <div className="glass-panel rounded-2xl border border-white/10 p-5 sm:p-6 mb-8 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-400" />
            Goal-Based Savings &amp; Emergency Vaults
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Milestone trackers, emergency runway builder, and automated savings velocity
          </p>
        </div>

        <button
          onClick={() => {
            if (soundEffects) playSound('click');
            setIsAddGoalModalOpen(true);
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-neon-emerald transition-all"
        >
          <Plus className="w-4 h-4" /> Create New Goal
        </button>
      </div>

      {/* Goals Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {goals.map((goal) => {
          const percent = Math.min(100, Math.round((goal.current / goal.target) * 100));
          const remaining = Math.max(0, goal.target - goal.current);
          const monthsLeft = goal.monthlyContribution > 0 ? Math.ceil(remaining / goal.monthlyContribution) : 'N/A';
          const isComplete = percent >= 100;

          return (
            <div 
              key={goal.id}
              className={`p-5 rounded-2xl border relative overflow-hidden transition-all group ${
                isComplete 
                  ? 'bg-emerald-950/20 border-emerald-500/40 shadow-neon-emerald' 
                  : 'bg-slate-950/70 border-white/10 hover:border-emerald-500/30'
              }`}
            >
              {/* Top Row */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/10">
                    {goal.category || 'Savings'}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-1.5 line-clamp-1">
                    {goal.title}
                  </h3>
                </div>
                
                <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${
                  isComplete ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-white'
                }`}>
                  {percent}%
                </span>
              </div>

              {/* Amount stats */}
              <div className="flex items-baseline justify-between mt-3 mb-1.5 text-xs">
                <span className="text-slate-400">
                  Saved: <strong className="text-white text-sm font-bold">{currency}{goal.current.toLocaleString()}</strong>
                </span>
                <span className="text-slate-400">
                  Target: <strong className="text-slate-300">{currency}{goal.target.toLocaleString()}</strong>
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden relative">
                <div 
                  className={`h-2.5 rounded-full transition-all duration-700 ${
                    isComplete 
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-300' 
                      : 'bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400'
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>

              {/* Time remaining & velocity */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {isComplete ? 'Goal Achieved!' : `~${monthsLeft} months left`}
                </span>
                <span>+{currency}{goal.monthlyContribution || 100}/mo</span>
              </div>

              {/* Deposit Quick Action */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-slate-500">Deadline: {goal.deadline}</span>
                <button
                  onClick={() => {
                    if (soundEffects) playSound('click');
                    setSelectedDepositGoal(goal);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center gap-1 transition-all"
                >
                  <Plus className="w-3 h-3" /> Deposit
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deposit to Goal Modal */}
      {selectedDepositGoal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#111827] border border-white/15 rounded-2xl w-full max-w-sm p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-emerald-400" />
                Deposit to Goal
              </h3>
              <button 
                onClick={() => setSelectedDepositGoal(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <div className="text-xs text-slate-400">Target Goal:</div>
              <div className="text-sm font-bold text-white">{selectedDepositGoal.title}</div>
              <div className="text-xs text-emerald-400 mt-1">
                Current: {currency}{selectedDepositGoal.current.toLocaleString()} / {currency}{selectedDepositGoal.target.toLocaleString()}
              </div>
            </div>

            <form onSubmit={handleDepositSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">Deposit Amount ({currency})</label>
                <input
                  type="number"
                  step="10"
                  required
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white font-extrabold text-lg text-emerald-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex gap-2">
                {['50', '100', '250', '500'].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setDepositAmount(val)}
                    className="flex-1 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-white/5"
                  >
                    +{currency}{val}
                  </button>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDepositGoal(null)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs shadow-neon-emerald"
                >
                  Confirm Deposit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Goal Modal */}
      {isAddGoalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#111827] border border-white/15 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-400" />
                Create New Savings Goal
              </h3>
              <button 
                onClick={() => setIsAddGoalModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGoal} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Goal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 🚗 Electric Vehicle Deposit"
                  value={newGoalForm.title}
                  onChange={(e) => setNewGoalForm({ ...newGoalForm, title: e.target.value })}
                  className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Target Amount ({currency})</label>
                  <input
                    type="number"
                    step="100"
                    required
                    placeholder="15000"
                    value={newGoalForm.target}
                    onChange={(e) => setNewGoalForm({ ...newGoalForm, target: e.target.value })}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Initial Saved ({currency})</label>
                  <input
                    type="number"
                    step="50"
                    placeholder="2000"
                    value={newGoalForm.current}
                    onChange={(e) => setNewGoalForm({ ...newGoalForm, current: e.target.value })}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Category</label>
                  <select
                    value={newGoalForm.category}
                    onChange={(e) => setNewGoalForm({ ...newGoalForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Emergency">Emergency Vault</option>
                    <option value="Property">Real Estate / Down Payment</option>
                    <option value="Travel">Travel &amp; Vacation</option>
                    <option value="Tech">Tech / Gadgets</option>
                    <option value="Education">Education &amp; Tuition</option>
                    <option value="Retirement">Retirement / Pension</option>
                    <option value="Tax">Tax Safe-Harbor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Target Deadline</label>
                  <input
                    type="date"
                    value={newGoalForm.deadline}
                    onChange={(e) => setNewGoalForm({ ...newGoalForm, deadline: e.target.value })}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Planned Monthly Contribution ({currency}/mo)</label>
                <input
                  type="number"
                  placeholder="300"
                  value={newGoalForm.monthlyContribution}
                  onChange={(e) => setNewGoalForm({ ...newGoalForm, monthlyContribution: e.target.value })}
                  className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddGoalModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold shadow-neon-emerald"
                >
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
