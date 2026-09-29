import React from 'react';
import { Sparkles, ArrowRight, Zap, ShieldCheck, Flame } from 'lucide-react';
import { playSound } from '../utils/effects';

export default function ScenarioBanner({ scenarios, currentScenarioId, onSelectScenario, soundEffects }) {
  const current = scenarios[currentScenarioId] || scenarios.scenario_1;

  const scenarioTabs = [
    { id: 'scenario_1', name: 'Salaried Pro', icon: '💼', badge: 'Alex Morgan', tag: 'High Surplus' },
    { id: 'scenario_2', name: 'College Student', icon: '🎓', badge: 'Maya Chen', tag: 'Micro-Budget' },
    { id: 'scenario_3', name: 'Freelancer', icon: '💻', badge: 'Devon Vance', tag: 'Variable Inflows' },
    { id: 'scenario_4', name: 'Household', icon: '👨‍👩‍👧‍👦', badge: 'Sharma Family', tag: 'Shared Vaults' }
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl glass-panel-ultra p-6 sm:p-8 mb-8 transition-all">
      
      {/* Dynamic Background Glow Rings */}
      <div className="absolute -right-24 -top-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -left-24 -bottom-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8">
        
        {/* Left: Persona Details */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 flex-1">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/[0.04] backdrop-blur-2xl border border-white/15 flex items-center justify-center text-4xl sm:text-5xl shadow-[0_0_30px_rgba(255,255,255,0.05)] shrink-0 hover:scale-105 transition-transform duration-300">
            {current.avatar}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <span className="text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full bg-emerald-400/15 text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Sparkles className="w-3.5 h-3.5" />
                Active Persona: {current.name}
              </span>
              <span className="text-xs text-slate-300 font-semibold bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                {current.persona} &bull; {current.role}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {current.tagline}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
              {current.description}
            </p>
          </div>
        </div>

        {/* Right: Quick Switcher Tabs */}
        <div className="w-full xl:w-auto shrink-0 bg-white/[0.03] backdrop-blur-2xl p-3 rounded-3xl border border-white/10 shadow-inner">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 pb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              Switch Financial Scenario
            </span>
            <span className="text-emerald-400 text-[10px] font-extrabold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Live Simulation
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 xl:flex gap-2">
            {scenarioTabs.map(tab => {
              const isSelected = tab.id === currentScenarioId;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (soundEffects) playSound('click');
                    onSelectScenario(tab.id);
                  }}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 ${
                    isSelected 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-[1.02] border border-emerald-400/40' 
                      : 'bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/5'
                  }`}
                >
                  <span className="text-xl p-1 bg-white/5 rounded-xl">{tab.icon}</span>
                  <div className="text-left">
                    <div className="leading-tight text-white font-bold">{tab.name}</div>
                    <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-emerald-100 font-semibold' : 'text-slate-400'}`}>
                      {tab.badge}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
