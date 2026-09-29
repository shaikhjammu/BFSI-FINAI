import React from 'react';
import { 
  Bot, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  FileText, 
  RotateCcw, 
  Layers, 
  ChevronDown,
  TrendingUp,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { playSound } from '../utils/effects';

export default function Navbar({ 
  scenarios, 
  currentScenarioId, 
  onSelectScenario, 
  healthScore, 
  settings, 
  onUpdateSettings, 
  onOpenReport, 
  onToggleAiChat,
  onResetData,
  unreadAiCount
}) {
  const currentScenario = scenarios[currentScenarioId] || scenarios.scenario_1;

  const handleScenarioChange = (id) => {
    if (settings.soundEffects) playSound('click');
    onSelectScenario(id);
  };

  const handleToggleSound = () => {
    const next = !settings.soundEffects;
    onUpdateSettings({ ...settings, soundEffects: next });
    if (next) playSound('success');
  };

  const currencies = [
    { code: '₹', label: 'INR (₹)' },
    { code: '$', label: 'USD ($)' },
    { code: '€', label: 'EUR (€)' },
    { code: '£', label: 'GBP (£)' },
    { code: 'C$', label: 'CAD (C$)' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#050813]/60 backdrop-blur-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo with Neon Cyber Glow */}
        <div className="flex items-center gap-3.5 cursor-pointer group" onClick={() => onToggleAiChat()}>
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-400 via-teal-400 to-cyan-400 p-[1.5px] shadow-[0_0_25px_rgba(16,185,129,0.35)] group-hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] transition-all">
              <div className="w-full h-full bg-[#070c1a]/90 backdrop-blur-md rounded-[14px] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Bot className="w-6 h-6 text-emerald-300 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 shadow-[0_0_10px_#10b981]"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center">
                Fin<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-400">AI</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                Gen-Z AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">Intelligent Personal Finance &amp; Budgeting</p>
          </div>
        </div>

        {/* Center: Persona Switcher Dropdown with Glass Backing */}
        <div className="flex items-center">
          <div className="relative group">
            <div className="flex items-center gap-3 bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl text-sm font-medium text-slate-200 cursor-pointer transition-all hover:border-emerald-500/40 shadow-lg">
              <span className="text-xl p-1 bg-white/5 rounded-xl border border-white/5">{currentScenario.avatar}</span>
              <div className="text-left hidden md:block">
                <div className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold leading-none">Active Persona</div>
                <div className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                  {currentScenario.name}
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 md:hidden" />
            </div>

            {/* Dropdown Menu */}
            <div className="absolute top-full mt-2 left-0 w-72 md:w-80 bg-[#0c1326]/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl p-2.5 hidden group-hover:block transition-all z-50 animate-slide-up">
              <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/10 flex items-center justify-between">
                <span>Select Scenario Profile</span>
                <span className="text-emerald-400">4 Scenarios</span>
              </div>
              <div className="space-y-1.5 mt-1.5">
                {Object.values(scenarios).map(sc => {
                  const isSelected = sc.id === currentScenarioId;
                  return (
                    <button
                      key={sc.id}
                      onClick={() => handleScenarioChange(sc.id)}
                      className={`w-full text-left p-3 rounded-2xl flex items-start gap-3 transition-all ${
                        isSelected 
                          ? 'bg-emerald-500/20 border border-emerald-500/50 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                          : 'hover:bg-white/5 text-slate-300'
                      }`}
                    >
                      <span className="text-2xl p-1.5 bg-white/5 rounded-xl border border-white/5">{sc.avatar}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-bold text-sm text-white truncate">{sc.name}</div>
                          {isSelected && (
                            <span className="text-[9px] font-extrabold text-emerald-300 bg-emerald-400/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 truncate mt-0.5">{sc.persona} &bull; {sc.role}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Currency Switcher */}
          <select
            value={settings.currency || '$'}
            onChange={(e) => {
              onUpdateSettings({ ...settings, currency: e.target.value });
              if (settings.soundEffects) playSound('click');
            }}
            className="bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl border border-white/10 rounded-2xl px-3 py-2 text-xs font-bold text-emerald-400 focus:outline-none focus:border-emerald-500 hidden sm:block cursor-pointer transition-all"
          >
            {currencies.map(c => (
              <option key={c.code} value={c.code} className="bg-[#0b1224] text-white">
                {c.label}
              </option>
            ))}
          </select>

          {/* Monthly Report Button */}
          <button
            onClick={() => {
              if (settings.soundEffects) playSound('click');
              onOpenReport();
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/[0.04] hover:bg-white/[0.09] backdrop-blur-xl border border-white/10 text-xs font-bold text-slate-200 transition-all hover:text-white hover:border-emerald-500/30 shadow-sm"
            title="View Monthly Financial Statement Report"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span className="hidden md:inline">Monthly Report</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.09] backdrop-blur-xl border border-white/10 text-slate-300 hover:text-white transition-all shadow-sm"
            title={settings.soundEffects ? 'Sound FX Enabled' : 'Sound FX Muted'}
          >
            {settings.soundEffects ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Ask AI Bot Button */}
          <button
            onClick={() => {
              if (settings.soundEffects) playSound('ai-message');
              onToggleAiChat();
            }}
            className="relative flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white text-xs font-extrabold shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all transform hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span className="hidden sm:inline">Ask AI Bot</span>
            {unreadAiCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-extrabold animate-bounce shadow-md">
                {unreadAiCount}
              </span>
            )}
          </button>

          {/* Reset State Button */}
          <button
            onClick={() => {
              if (window.confirm('Reset all demo data back to default scenarios?')) {
                onResetData();
              }
            }}
            className="p-2.5 rounded-2xl bg-white/[0.04] hover:bg-rose-500/20 backdrop-blur-xl border border-white/10 text-slate-400 hover:text-rose-400 transition-all hidden lg:block"
            title="Reset Scenarios"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
