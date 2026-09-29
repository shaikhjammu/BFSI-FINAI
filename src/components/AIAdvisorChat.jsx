import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  X, 
  Volume2, 
  VolumeX, 
  Trash2, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  Zap,
  Mic,
  MicOff
} from 'lucide-react';
import { processAIChatQuery } from '../services/aiAdvisorEngine';
import { playSound, speakText, stopSpeaking } from '../utils/effects';

export default function AIAdvisorChat({ 
  isOpen, 
  onClose, 
  scenario, 
  transactions = [], 
  budgets = {}, 
  savingsGoals = [], 
  onLogTransaction,
  currency = '$',
  soundEffects = true,
  initialQuery = null
}) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome-msg',
      sender: 'bot',
      text: `👋 Hi there! I'm **FinAI**, your intelligent financial advisor.\n\nI'm currently assisting with **${scenario?.name || 'your'}** portfolio ($${scenario?.monthlyIncome?.toLocaleString()} monthly cashflow).\n\nAsk me anything or pick a quick prompt below to analyze your budget, optimize expenses, or track savings goals!`,
      chips: [
        'Analyze my monthly budget',
        'What is my health score?',
        '50/30/20 Smart Plan',
        'Emergency Runway',
        'Log $45 for groceries'
      ],
      time: 'Just now'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isSpeakingNow, setIsSpeakingNow] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    if (initialQuery && isOpen) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  const handleSendMessage = (textToSend = null) => {
    const text = (textToSend || inputQuery).trim();
    if (!text) return;

    if (soundEffects) playSound('click');

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate AI processing delay with dynamic response
    setTimeout(() => {
      const response = processAIChatQuery({
        query: text,
        scenario,
        transactions,
        budgets,
        savingsGoals
      });

      if (response.action && response.action.type === 'LOG_TRANSACTION' && onLogTransaction) {
        onLogTransaction(response.action.payload);
        if (soundEffects) playSound('success');
      } else {
        if (soundEffects) playSound('ai-message');
      }

      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        chips: response.chips,
        action: response.action,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      if (isVoiceEnabled) {
        setIsSpeakingNow(true);
        speakText(response.text);
        setTimeout(() => setIsSpeakingNow(false), 5000);
      }
    }, 600);
  };

  const handleToggleVoice = () => {
    const next = !isVoiceEnabled;
    setIsVoiceEnabled(next);
    if (!next) {
      stopSpeaking();
      setIsSpeakingNow(false);
    } else {
      if (soundEffects) playSound('click');
    }
  };

  const handleClearChat = () => {
    stopSpeaking();
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: `Chat cleared! Ready for new financial queries for **${scenario?.name}**.`,
        chips: ['Analyze my budget', 'What is my health score?', 'Give me saving tips'],
        time: 'Just now'
      }
    ]);
  };

  // Helper to format bot markdown text with bolding, headers, and bullet points
  const renderFormattedText = (content) => {
    return content.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={idx} className="h-1.5" />;
      
      // Headers
      if (trimmed.startsWith('### ')) {
        const title = trimmed.replace(/^###\s+/, '');
        return (
          <h4 key={idx} className="text-xs sm:text-sm font-bold text-emerald-300 mt-3 mb-1 border-b border-emerald-500/20 pb-0.5 flex items-center gap-1">
            <span>{title}</span>
          </h4>
        );
      }
      if (trimmed.startsWith('## ')) {
        const title = trimmed.replace(/^##\s+/, '');
        return (
          <h3 key={idx} className="text-sm sm:text-base font-extrabold text-white mt-3 mb-1">
            {title}
          </h3>
        );
      }

      // Bullet points
      const isBullet = trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ');
      const cleanLine = isBullet ? trimmed.replace(/^[•\-\*]\s+/, '') : trimmed;

      const parts = cleanLine.split(/(\*\*[^*]+\*\*)/g);
      const parsedText = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="text-white font-bold">{part.slice(2, -2)}</strong>;
        } else if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={pIdx} className="text-emerald-300 italic">{part.slice(1, -1)}</em>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <div key={idx} className="flex items-start gap-2 my-0.5 text-xs sm:text-sm leading-relaxed">
            <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
            <div className="flex-1">{parsedText}</div>
          </div>
        );
      }

      return (
        <p key={idx} className="mb-1 leading-relaxed text-xs sm:text-sm">
          {parsedText}
        </p>
      );
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-lg bg-[#0d1527] border-l border-white/10 h-full flex flex-col shadow-2xl animate-slide-left">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-[#111c33] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1.5px] shadow-neon-emerald">
                <div className="w-full h-full bg-[#0d1527] rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0d1527]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">FinAI Assistant</h3>
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Online
                </span>
              </div>
              <p className="text-xs text-slate-400">Context: {scenario?.name} ({scenario?.persona})</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Voice Synthesizer Toggle */}
            <button
              onClick={handleToggleVoice}
              className={`p-2 rounded-xl border transition-all ${
                isVoiceEnabled 
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 shadow-neon-emerald' 
                  : 'bg-slate-800 border-white/10 text-slate-400 hover:text-white'
              }`}
              title={isVoiceEnabled ? 'Voice Reader Active (Mute)' : 'Enable AI Voice Reader'}
            >
              {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Clear Chat */}
            <button
              onClick={handleClearChat}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-400 hover:text-rose-400 transition-colors"
              title="Clear Conversation"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Speaking Audio Wave Equalizer Bar (if speaking) */}
        {isSpeakingNow && (
          <div className="bg-emerald-950/60 border-b border-emerald-500/30 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-end gap-1 h-5">
                <div className="w-1 bg-emerald-400 rounded-full wave-bar" />
                <div className="w-1 bg-emerald-400 rounded-full wave-bar" />
                <div className="w-1 bg-emerald-400 rounded-full wave-bar" />
                <div className="w-1 bg-emerald-400 rounded-full wave-bar" />
                <div className="w-1 bg-emerald-400 rounded-full wave-bar" />
              </div>
              <span className="text-xs font-semibold text-emerald-300">FinAI is speaking...</span>
            </div>
            <button 
              onClick={() => { stopSpeaking(); setIsSpeakingNow(false); }}
              className="text-[11px] text-emerald-400 hover:text-white underline font-semibold"
            >
              Stop Voice
            </button>
          </div>
        )}

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => {
            const isBot = msg.sender === 'bot';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isBot ? 'items-start' : 'items-end justify-end'}`}
              >
                {isBot && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] rounded-2xl p-4 shadow-lg ${
                  isBot 
                    ? 'bg-slate-900/90 border border-white/10 text-slate-200 rounded-tl-none' 
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-none'
                }`}>
                  <div className="text-slate-100">
                    {renderFormattedText(msg.text)}
                  </div>

                  {/* Quick Action Chips */}
                  {msg.chips && msg.chips.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                      {msg.chips.map((chip, cIdx) => (
                        <button
                          key={cIdx}
                          onClick={() => handleSendMessage(chip)}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-medium transition-all text-left flex items-center gap-1"
                        >
                          <Zap className="w-3 h-3 text-emerald-400" />
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className={`text-[10px] mt-1.5 text-right ${isBot ? 'text-slate-500' : 'text-emerald-100/70'}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-xl bg-slate-800 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-900 border border-white/10 rounded-2xl rounded-tl-none p-4 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer */}
        <div className="p-3.5 border-t border-white/10 bg-[#111c33]/90">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask advice, e.g. 'Log $50 for groceries' or 'Budget tips'..."
              className="flex-1 bg-slate-950/80 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />

            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-neon-emerald transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-2 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>FinAI analyzes real-time spending, budgets, and savings goals.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
