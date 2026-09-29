import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ScenarioBanner from './components/ScenarioBanner';
import DashboardOverview from './components/DashboardOverview';
import BudgetGenerator from './components/BudgetGenerator';
import SavingsGoalsTracker from './components/SavingsGoalsTracker';
import AnalyticsCharts from './components/AnalyticsCharts';
import IncomeExpenseTracker from './components/IncomeExpenseTracker';
import AIAdvisorChat from './components/AIAdvisorChat';
import MonthlyReportModal from './components/MonthlyReportModal';
import InteractiveBackground from './components/InteractiveBackground';
import { storageService } from './services/storageService';
import { calculateFinancialHealth } from './services/aiAdvisorEngine';
import { playSound, triggerConfetti } from './utils/effects';
import { 
  Bot, 
  Sparkles, 
  PieChart, 
  Target, 
  CreditCard, 
  BarChart3, 
  TrendingUp, 
  CheckCircle2, 
  Zap,
  HelpCircle,
  FileText,
  Flame
} from 'lucide-react';

export default function App() {
  const [scenariosData, setScenariosData] = useState(() => storageService.loadAllData());
  const [currentScenarioId, setCurrentScenarioId] = useState(() => storageService.getCurrentScenarioId());
  const [settings, setSettings] = useState(() => storageService.getSettings());

  // Modals & Drawers
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [aiChatInitialQuery, setAiChatInitialQuery] = useState(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [isAddIncomeModalOpen, setIsAddIncomeModalOpen] = useState(false);
  const [activeViewTab, setActiveViewTab] = useState('all');

  const currentScenario = scenariosData[currentScenarioId] || scenariosData.scenario_1;

  useEffect(() => {
    storageService.saveAllData(scenariosData);
  }, [scenariosData]);

  useEffect(() => {
    storageService.setCurrentScenarioId(currentScenarioId);
  }, [currentScenarioId]);

  useEffect(() => {
    storageService.saveSettings(settings);
  }, [settings]);

  // Calculate dynamic Health Score
  const health = calculateFinancialHealth({
    income: currentScenario.incomeSources || currentScenario.monthlyIncome,
    expenses: currentScenario.expenses,
    budgets: currentScenario.budgets,
    savingsGoals: currentScenario.savingsGoals
  });

  const handleSelectScenario = (id) => {
    setCurrentScenarioId(id);
    if (settings.soundEffects) {
      playSound('click');
    }
  };

  const handleAddExpense = (newExpense) => {
    setScenariosData(prev => {
      const target = { ...prev[currentScenarioId] };
      target.expenses = [newExpense, ...target.expenses];
      return { ...prev, [currentScenarioId]: target };
    });
  };

  const handleDeleteExpense = (expId) => {
    setScenariosData(prev => {
      const target = { ...prev[currentScenarioId] };
      target.expenses = target.expenses.filter(e => e.id !== expId);
      return { ...prev, [currentScenarioId]: target };
    });
  };

  const handleAddIncome = (newIncome) => {
    setScenariosData(prev => {
      const target = { ...prev[currentScenarioId] };
      target.incomeSources = [newIncome, ...(target.incomeSources || [])];
      target.monthlyIncome = target.incomeSources.reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
      return { ...prev, [currentScenarioId]: target };
    });
  };

  const handleDeleteIncome = (incId) => {
    setScenariosData(prev => {
      const target = { ...prev[currentScenarioId] };
      target.incomeSources = (target.incomeSources || []).filter(i => i.id !== incId);
      target.monthlyIncome = target.incomeSources.reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
      return { ...prev, [currentScenarioId]: target };
    });
  };

  const handleUpdateBudgets = (newBudgets) => {
    setScenariosData(prev => {
      const target = { ...prev[currentScenarioId] };
      target.budgets = newBudgets;
      return { ...prev, [currentScenarioId]: target };
    });
  };

  const handleAddGoal = (newGoal) => {
    setScenariosData(prev => {
      const target = { ...prev[currentScenarioId] };
      target.savingsGoals = [...target.savingsGoals, newGoal];
      return { ...prev, [currentScenarioId]: target };
    });
  };

  const handleDepositToGoal = (goalId, amount) => {
    setScenariosData(prev => {
      const target = { ...prev[currentScenarioId] };
      target.savingsGoals = target.savingsGoals.map(g => {
        if (g.id === goalId) {
          return { ...g, current: Math.min(g.target, g.current + amount) };
        }
        return g;
      });
      return { ...prev, [currentScenarioId]: target };
    });
  };

  const handleResetData = () => {
    const fresh = storageService.resetToDefault();
    setScenariosData(fresh);
    if (settings.soundEffects) {
      playSound('success');
      triggerConfetti('medium');
    }
  };

  const openAiChatWithQuery = (query) => {
    setAiChatInitialQuery(query);
    setIsAiChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050813] text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* Interactive Cyber Background with Cursor Glow and Floating Aurora Blobs */}
      <InteractiveBackground />

      {/* Top Navbar */}
      <Navbar
        scenarios={scenariosData}
        currentScenarioId={currentScenarioId}
        onSelectScenario={handleSelectScenario}
        healthScore={health.score}
        settings={settings}
        onUpdateSettings={setSettings}
        onOpenReport={() => setIsReportOpen(true)}
        onToggleAiChat={() => {
          setAiChatInitialQuery(null);
          setIsAiChatOpen(!isAiChatOpen);
        }}
        onResetData={handleResetData}
        unreadAiCount={1}
      />

      {/* Main Spacious Content Canvas */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
        
        {/* Scenario Persona Hero Banner */}
        <ScenarioBanner
          scenarios={scenariosData}
          currentScenarioId={currentScenarioId}
          onSelectScenario={handleSelectScenario}
          soundEffects={settings.soundEffects}
        />

        {/* Top 4 Stat Cards & Financial Health Radial Meter */}
        <DashboardOverview
          income={currentScenario.incomeSources || currentScenario.monthlyIncome}
          expenses={currentScenario.expenses}
          budgets={currentScenario.budgets}
          health={health}
          currency={settings.currency || '$'}
          onOpenAddExpense={() => setIsAddExpenseModalOpen(true)}
          onOpenAddIncome={() => setIsAddIncomeModalOpen(true)}
          onOpenAiChat={openAiChatWithQuery}
          onOpenReport={() => setIsReportOpen(true)}
          soundEffects={settings.soundEffects}
        />

        {/* Section Navigation Tabs (Spacious & Translucent) */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex bg-white/[0.03] backdrop-blur-2xl p-1.5 rounded-3xl border border-white/10 shadow-lg">
            {[
              { id: 'all', label: 'All Modules', icon: Sparkles },
              { id: 'budgets', label: 'AI Budgets & Limits', icon: PieChart },
              { id: 'ledger', label: 'Ledger & Expenses', icon: CreditCard },
              { id: 'goals', label: 'Savings & Vaults', icon: Target },
              { id: 'analytics', label: 'Predictive Analytics', icon: BarChart3 }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeViewTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (settings.soundEffects) playSound('click');
                    setActiveViewTab(tab.id);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)] scale-[1.02]' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2.5 text-xs text-slate-300 font-bold bg-white/[0.03] backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#10b981]" />
            <span>AI Real-time Intelligence Active</span>
          </div>
        </div>

        {/* Tab-driven Content Sections */}
        {(activeViewTab === 'all' || activeViewTab === 'budgets') && (
          <BudgetGenerator
            income={currentScenario.incomeSources || currentScenario.monthlyIncome}
            expenses={currentScenario.expenses}
            budgets={currentScenario.budgets}
            onUpdateBudgets={handleUpdateBudgets}
            scenarioId={currentScenarioId}
            currency={settings.currency || '$'}
            soundEffects={settings.soundEffects}
            onOpenAiChat={openAiChatWithQuery}
          />
        )}

        {(activeViewTab === 'all' || activeViewTab === 'goals') && (
          <SavingsGoalsTracker
            goals={currentScenario.savingsGoals}
            onAddGoal={handleAddGoal}
            onDepositToGoal={handleDepositToGoal}
            currency={settings.currency || '$'}
            soundEffects={settings.soundEffects}
            netMonthlySavings={health.savingsRate}
          />
        )}

        {(activeViewTab === 'all' || activeViewTab === 'ledger') && (
          <IncomeExpenseTracker
            incomeList={currentScenario.incomeSources || []}
            expenseList={currentScenario.expenses || []}
            onAddExpense={handleAddExpense}
            onDeleteExpense={handleDeleteExpense}
            onAddIncome={handleAddIncome}
            onDeleteIncome={handleDeleteIncome}
            currency={settings.currency || '$'}
            soundEffects={settings.soundEffects}
            isAddExpenseModalOpen={isAddExpenseModalOpen}
            setIsAddExpenseModalOpen={setIsAddExpenseModalOpen}
            isAddIncomeModalOpen={isAddIncomeModalOpen}
            setIsAddIncomeModalOpen={setIsAddIncomeModalOpen}
          />
        )}

        {(activeViewTab === 'all' || activeViewTab === 'analytics') && (
          <AnalyticsCharts
            income={currentScenario.incomeSources || currentScenario.monthlyIncome}
            expenses={currentScenario.expenses}
            currency={settings.currency || '$'}
          />
        )}

      </main>

      {/* Floating Bottom AI Assistant Action Button with Neon Cyber Glow */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={() => {
            if (settings.soundEffects) playSound('ai-message');
            setAiChatInitialQuery(null);
            setIsAiChatOpen(true);
          }}
          className="flex items-center gap-3 px-5 py-3.5 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-white font-extrabold text-sm shadow-[0_0_35px_rgba(16,185,129,0.5)] hover:scale-105 active:scale-95 transition-all transform group border border-white/30 backdrop-blur-xl"
        >
          <div className="w-9 h-9 rounded-2xl bg-black/40 backdrop-blur-md flex items-center justify-center">
            <Bot className="w-5 h-5 text-emerald-200 group-hover:rotate-12 transition-transform" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-[10px] text-emerald-100 uppercase tracking-widest leading-none font-bold">FinAI Copilot</div>
            <div className="text-xs font-black leading-tight mt-0.5">Ask Anything &bull; Free Advice</div>
          </div>
          <Sparkles className="w-4 h-4 text-emerald-200 animate-spin-slow" />
        </button>
      </div>

      {/* AI Assistant Chat Drawer */}
      <AIAdvisorChat
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        scenario={currentScenario}
        transactions={currentScenario.expenses}
        budgets={currentScenario.budgets}
        savingsGoals={currentScenario.savingsGoals}
        onLogTransaction={handleAddExpense}
        currency={settings.currency || '$'}
        soundEffects={settings.soundEffects}
        initialQuery={aiChatInitialQuery}
      />

      {/* Monthly Financial Audit Statement Modal */}
      <MonthlyReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        scenario={currentScenario}
        income={currentScenario.incomeSources || currentScenario.monthlyIncome}
        expenses={currentScenario.expenses}
        budgets={currentScenario.budgets}
        savingsGoals={currentScenario.savingsGoals}
        health={health}
        currency={settings.currency || '$'}
        soundEffects={settings.soundEffects}
      />

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#03060f]/80 backdrop-blur-2xl py-10 text-center text-xs text-slate-500 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white text-sm tracking-tight">FinAI Advisor Platform</span>
            <span>&bull; Powered by Flask, SQLAlchemy, Node/Express &amp; AI Intelligence Engine</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-slate-400 font-medium">
            <span className="bg-white/5 px-2.5 py-1 rounded-xl border border-white/5">Scenario 1: Salaried Pro</span>
            <span className="bg-white/5 px-2.5 py-1 rounded-xl border border-white/5">Scenario 2: College Student</span>
            <span className="bg-white/5 px-2.5 py-1 rounded-xl border border-white/5">Scenario 3: Freelancer</span>
            <span className="bg-white/5 px-2.5 py-1 rounded-xl border border-white/5">Scenario 4: Household</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
