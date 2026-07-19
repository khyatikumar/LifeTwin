import React, { useState } from "react";
import { FinancialProfile } from "../types";
import { DollarSign, Percent, PiggyBank, ArrowDownRight, Scale, ShieldAlert, Save, CheckCircle2 } from "lucide-react";

interface FinancialFormProps {
  financial: FinancialProfile;
  onUpdateFinancial: (updatedFinancial: FinancialProfile) => Promise<void>;
}

export default function FinancialForm({ financial, onUpdateFinancial }: FinancialFormProps) {
  const [formData, setFormData] = useState<FinancialProfile>({ ...financial });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Derived aggregates
  const monthlySurplus = formData.monthlyIncome - formData.monthlyExpenses;
  const savingsRate = formData.monthlyIncome > 0 ? Math.round((monthlySurplus / formData.monthlyIncome) * 100) : 0;
  const netWealth = formData.currentSavings + formData.currentInvestments;
  const coveredExpensesMonths = formData.monthlyExpenses > 0 ? Math.round(formData.currentSavings / formData.monthlyExpenses) : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSavedSuccess(false);
    try {
      await onUpdateFinancial(formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save financial details:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const riskOptions = [
    { value: "low", label: "Conservative (Capital Preservation)" },
    { value: "medium", label: "Moderate (Balanced Growth)" },
    { value: "high", label: "Aggressive (Capital Appreciation)" }
  ];

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-sm max-w-4xl animate-fade-in space-y-6">
      
      {/* View Header */}
      <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight uppercase font-geist">
            Money Profile
          </h3>
          <p className="text-xs text-slate-500 font-sans">
            Update income, expenses, savings, investments, loans, and risk comfort.
          </p>
        </div>
        {savedSuccess && (
          <span className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full font-semibold animate-fade-in">
            <CheckCircle2 className="h-4 w-4" /> Money profile saved successfully!
          </span>
        )}
      </div>

      {/* Dynamic Financial Health Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Monthly Surplus Indicator */}
        <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-1">
          <p className="text-[10px] text-emerald-700 uppercase font-mono font-bold tracking-wider">Monthly Surplus</p>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold font-geist text-slate-900">${monthlySurplus.toLocaleString()}</span>
            <span className="text-xs text-slate-400">/mo</span>
          </div>
          <p className="text-[10px] text-emerald-600 font-sans font-medium">
            Savings rate: {savingsRate}%
          </p>
        </div>

        {/* Total Liquidity Asset Value */}
        <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-1">
          <p className="text-[10px] text-indigo-700 uppercase font-mono font-bold tracking-wider">Total Wealth</p>
          <span className="text-xl font-bold font-geist text-slate-900">${netWealth.toLocaleString()}</span>
          <p className="text-[10px] text-indigo-600 font-sans font-medium">
            Savings + investments
          </p>
        </div>

        {/* Emergency Fund Threshold Covered */}
        <div className="p-4 bg-pink-50/50 border border-pink-100 rounded-xl space-y-1">
          <p className="text-[10px] text-pink-700 uppercase font-mono font-bold tracking-wider">Emergency Buffer Covered</p>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold font-geist text-slate-900">{coveredExpensesMonths}</span>
            <span className="text-xs text-slate-400">Months</span>
          </div>
          <p className="text-[10px] text-pink-600 font-sans font-medium">
            {coveredExpensesMonths >= 6 ? "Meets safety benchmark (6mo)" : "Below recommended safety margin"}
          </p>
        </div>

      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Monthly Gross Income */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Monthly Income (USD)</label>
            <div className="relative">
              <DollarSign className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="number"
                value={formData.monthlyIncome || ""}
                onChange={(e) => setFormData({ ...formData, monthlyIncome: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
                placeholder="18450"
                min="0"
                required
              />
            </div>
          </div>

          {/* Monthly Expenses */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Monthly Expenses (USD)</label>
            <div className="relative">
              <ArrowDownRight className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="number"
                value={formData.monthlyExpenses || ""}
                onChange={(e) => setFormData({ ...formData, monthlyExpenses: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
                placeholder="4200"
                min="0"
                required
              />
            </div>
          </div>

          {/* Liquid Savings */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Savings (USD)</label>
            <div className="relative">
              <PiggyBank className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="number"
                value={formData.currentSavings || ""}
                onChange={(e) => setFormData({ ...formData, currentSavings: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
                placeholder="245000"
                min="0"
                required
              />
            </div>
          </div>

          {/* Investments */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Investments (USD)</label>
            <div className="relative">
              <DollarSign className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="number"
                value={formData.currentInvestments || ""}
                onChange={(e) => setFormData({ ...formData, currentInvestments: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
                placeholder="1200000"
                min="0"
                required
              />
            </div>
          </div>

          {/* Outstanding Loans */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Outstanding Loans</label>
            <div className="relative">
              <ShieldAlert className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="text"
                value={formData.outstandingLoans}
                onChange={(e) => setFormData({ ...formData, outstandingLoans: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
                placeholder="$450k Mortgage"
                required
              />
            </div>
          </div>

          {/* Risk Tolerance */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Risk Comfort</label>
            <div className="relative">
              <Scale className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <select
                value={formData.riskTolerance}
                onChange={(e) => setFormData({ ...formData, riskTolerance: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all appearance-none"
              >
                {riskOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Emergency Fund Coverage Target (Months)</label>
            <div className="relative">
              <ShieldAlert className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="number"
                value={formData.emergencyFundMonths || ""}
                onChange={(e) => setFormData({ ...formData, emergencyFundMonths: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
                placeholder="6"
                min="0"
                required
              />
            </div>
          </div>

        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-all hover:shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Save className="h-4.5 w-4.5" />
          {isSubmitting ? "Saving..." : "Save Money Profile"}
        </button>

      </form>
    </div>
  );
}
