import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Trash2, 
  Edit3, 
  CreditCard, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  Camera,
  Sparkles,
  ArrowDownLeft,
  ArrowUpRight,
  FileSpreadsheet,
  X
} from 'lucide-react';
import { CATEGORIES, PAYMENT_METHODS } from '../data/initialData';
import { playSound, triggerConfetti } from '../utils/effects';

export default function IncomeExpenseTracker({ 
  incomeList = [], 
  expenseList = [], 
  onAddExpense, 
  onDeleteExpense, 
  onAddIncome, 
  onDeleteIncome, 
  currency = '$', 
  soundEffects = true,
  isAddExpenseModalOpen,
  setIsAddExpenseModalOpen,
  isAddIncomeModalOpen,
  setIsAddIncomeModalOpen
}) {
  const [activeTab, setActiveTab] = useState('expenses'); // 'expenses' | 'income'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('all');

  // New Expense Form State
  const [expenseForm, setExpenseForm] = useState({
    title: '',
    amount: '',
    category: 'dining',
    paymentMethod: 'Credit Card',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  // New Income Form State
  const [incomeForm, setIncomeForm] = useState({
    title: '',
    amount: '',
    type: 'Monthly Salary',
    date: new Date().toISOString().split('T')[0],
    status: 'Received'
  });

  const [receiptScanning, setReceiptScanning] = useState(false);

  // Filtered Expense list
  const filteredExpenses = expenseList.filter(e => {
    const matchesSearch = (e.title || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (e.notes || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || e.category === selectedCategory;
    const matchesPayment = selectedPaymentMethod === 'all' || e.paymentMethod === selectedPaymentMethod;
    return matchesSearch && matchesCategory && matchesPayment;
  });

  // Filtered Income list
  const filteredIncome = incomeList.filter(i => {
    return (i.title || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
           (i.type || '').toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    if (!expenseForm.title || !expenseForm.amount) return;

    onAddExpense({
      id: `exp-${Date.now()}`,
      title: expenseForm.title,
      amount: parseFloat(expenseForm.amount),
      category: expenseForm.category,
      paymentMethod: expenseForm.paymentMethod,
      date: expenseForm.date,
      notes: expenseForm.notes
    });

    if (soundEffects) playSound('success');
    setIsAddExpenseModalOpen(false);
    setExpenseForm({
      title: '',
      amount: '',
      category: 'dining',
      paymentMethod: 'Credit Card',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    if (!incomeForm.title || !incomeForm.amount) return;

    onAddIncome({
      id: `inc-${Date.now()}`,
      title: incomeForm.title,
      amount: parseFloat(incomeForm.amount),
      type: incomeForm.type,
      date: incomeForm.date,
      status: incomeForm.status
    });

    if (soundEffects) {
      playSound('success');
      triggerConfetti('medium');
    }
    setIsAddIncomeModalOpen(false);
    setIncomeForm({
      title: '',
      amount: '',
      type: 'Client Invoice',
      date: new Date().toISOString().split('T')[0],
      status: 'Received'
    });
  };

  // Mock Receipt OCR Scan
  const simulateReceiptScan = () => {
    setReceiptScanning(true);
    if (soundEffects) playSound('click');
    setTimeout(() => {
      setReceiptScanning(false);
      const mockReceipts = [
        { title: 'Supermarket Grocery Basket', amount: 84.50, category: 'groceries', notes: 'Auto-scanned via Smart Receipt OCR' },
        { title: 'Artisan Cafe & Bakery', amount: 24.00, category: 'dining', notes: 'Auto-scanned receipt' },
        { title: 'Shell Express Petrol Refuel', amount: 48.20, category: 'transport', notes: 'Auto-scanned fuel slip' },
      ];
      const picked = mockReceipts[Math.floor(Math.random() * mockReceipts.length)];
      setExpenseForm(prev => ({
        ...prev,
        title: picked.title,
        amount: picked.amount.toString(),
        category: picked.category,
        notes: picked.notes
      }));
      if (soundEffects) playSound('success');
    }, 1200);
  };

  // CSV Export
  const handleExportCSV = () => {
    if (soundEffects) playSound('click');
    const headers = 'ID,Type,Title,Amount,Category/Source,Date,PaymentMethod/Status,Notes\n';
    const expenseRows = expenseList.map(e => `"${e.id}","Expense","${e.title}",${e.amount},"${e.category}","${e.date}","${e.paymentMethod || ''}","${e.notes || ''}"`).join('\n');
    const incomeRows = incomeList.map(i => `"${i.id}","Income","${i.title}",${i.amount},"${i.type}","${i.date}","${i.status || ''}",""`).join('\n');
    const csvContent = 'data:text/csv;charset=utf-8,' + headers + expenseRows + '\n' + incomeRows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `FinAI_Transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="glass-panel rounded-2xl border border-white/10 p-5 sm:p-6 mb-8 shadow-xl">
      
      {/* Top Header & Tab Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-400" />
            Financial Activity Ledger
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Log and audit daily expenses and multiple income revenue streams
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              if (soundEffects) playSound('click');
              setIsAddExpenseModalOpen(true);
            }}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" /> Log Expense
          </button>

          <button
            onClick={() => {
              if (soundEffects) playSound('click');
              setIsAddIncomeModalOpen(true);
            }}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-neon-emerald transition-all"
          >
            <Plus className="w-4 h-4" /> Add Income
          </button>

          <button
            onClick={handleExportCSV}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 hover:text-white transition-colors"
            title="Export to CSV"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs & Search Filter Bar */}
      <div className="mt-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Toggle Expenses vs Income */}
        <div className="flex bg-slate-950/80 p-1 rounded-xl border border-white/10 self-start">
          <button
            onClick={() => {
              if (soundEffects) playSound('click');
              setActiveTab('expenses');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'expenses'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ArrowDownLeft className="w-3.5 h-3.5 text-rose-400" />
            Expenses ({expenseList.length})
          </button>

          <button
            onClick={() => {
              if (soundEffects) playSound('click');
              setActiveTab('income');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'income'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
            Income Streams ({incomeList.length})
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 sm:w-56">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950/70 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {activeTab === 'expenses' && (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-950/70 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-300 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Transaction Table / List */}
      <div className="mt-5 overflow-x-auto">
        {activeTab === 'expenses' ? (
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 text-slate-400 uppercase font-semibold text-[11px] tracking-wider border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Transaction / Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredExpenses.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500 text-xs">
                    No expense transactions found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredExpenses.map((exp) => {
                  const catObj = CATEGORIES.find(c => c.id === exp.category) || { name: exp.category, color: '#94a3b8' };
                  return (
                    <tr key={exp.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-white">
                        <div>{exp.title}</div>
                        {exp.notes && <div className="text-[11px] text-slate-400 font-normal">{exp.notes}</div>}
                      </td>
                      <td className="py-3.5 px-4">
                        <span 
                          className="px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 border"
                          style={{ 
                            backgroundColor: `${catObj.color}15`, 
                            borderColor: `${catObj.color}35`, 
                            color: catObj.color 
                          }}
                        >
                          {catObj.name}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 flex items-center gap-1.5 mt-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        {exp.date}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">{exp.paymentMethod || 'Credit Card'}</td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-rose-400 text-sm">
                        -{currency}{Number(exp.amount).toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => {
                            if (soundEffects) playSound('click');
                            onDeleteExpense(exp.id);
                          }}
                          className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 text-slate-400 uppercase font-semibold text-[11px] tracking-wider border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Income Source / Employer</th>
                <th className="py-3 px-4">Classification</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredIncome.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500 text-xs">
                    No income records logged yet.
                  </td>
                </tr>
              ) : (
                filteredIncome.map((inc) => (
                  <tr key={inc.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white">{inc.title}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        {inc.type || 'Fixed Salary'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">{inc.date}</td>
                    <td className="py-3.5 px-4">
                      <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {inc.status || 'Received'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-extrabold text-emerald-400 text-sm">
                      +{currency}{Number(inc.amount).toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => {
                          if (soundEffects) playSound('click');
                          onDeleteIncome(inc.id);
                        }}
                        className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Expense Modal */}
      {isAddExpenseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#111827] border border-white/15 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-rose-400" />
                Log New Expense
              </h3>
              <button 
                onClick={() => setIsAddExpenseModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Smart OCR Simulator Bar */}
            <div className="mb-4 bg-slate-900 border border-emerald-500/30 p-3 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Camera className="w-4 h-4 text-emerald-400" />
                <span>Smart Receipt Scanner (OCR)</span>
              </div>
              <button
                type="button"
                onClick={simulateReceiptScan}
                disabled={receiptScanning}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold border border-emerald-500/40 flex items-center gap-1 transition-all"
              >
                <Sparkles className="w-3 h-3" />
                {receiptScanning ? 'Scanning OCR...' : 'Auto-Fill Receipt'}
              </button>
            </div>

            <form onSubmit={handleExpenseSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Expense Title / Merchant</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Whole Foods Market"
                  value={expenseForm.title}
                  onChange={(e) => setExpenseForm({ ...expenseForm, title: e.target.value })}
                  className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Amount ({currency})</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="45.00"
                    value={expenseForm.amount}
                    onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white font-bold text-rose-400 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Category</label>
                  <select
                    value={expenseForm.category}
                    onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Payment Method</label>
                  <select
                    value={expenseForm.paymentMethod}
                    onChange={(e) => setExpenseForm({ ...expenseForm, paymentMethod: e.target.value })}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                  >
                    {PAYMENT_METHODS.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={expenseForm.date}
                    onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Notes / Tags (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Weekly pantry replenishment"
                  value={expenseForm.notes}
                  onChange={(e) => setExpenseForm({ ...expenseForm, notes: e.target.value })}
                  className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddExpenseModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold shadow-lg transition-all"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Income Modal */}
      {isAddIncomeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#111827] border border-white/15 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-400" />
                Record Income Stream
              </h3>
              <button 
                onClick={() => setIsAddIncomeModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleIncomeSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Source / Employer / Client</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Design Consulting Client Retainer"
                  value={incomeForm.title}
                  onChange={(e) => setIncomeForm({ ...incomeForm, title: e.target.value })}
                  className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Amount ({currency})</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="3500.00"
                    value={incomeForm.amount}
                    onChange={(e) => setIncomeForm({ ...incomeForm, amount: e.target.value })}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Income Type</label>
                  <select
                    value={incomeForm.type}
                    onChange={(e) => setIncomeForm({ ...incomeForm, type: e.target.value })}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Monthly Salary">Monthly Fixed Salary</option>
                    <option value="Client Contract">Client Contract / Retainer</option>
                    <option value="Project Milestone">Project Milestone</option>
                    <option value="Allowance">Parent / Student Allowance</option>
                    <option value="Part-time Wage">Part-Time Wage</option>
                    <option value="Bonus">Bonus &amp; Commission</option>
                    <option value="Real Estate">Rental Property Yield</option>
                    <option value="Investment / Dividend">Dividend / Royalty</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={incomeForm.date}
                    onChange={(e) => setIncomeForm({ ...incomeForm, date: e.target.value })}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Status</label>
                  <select
                    value={incomeForm.status}
                    onChange={(e) => setIncomeForm({ ...incomeForm, status: e.target.value })}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Received">Received / Cleared</option>
                    <option value="Pending">Pending / Invoiced</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddIncomeModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold shadow-neon-emerald transition-all"
                >
                  Record Income
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
