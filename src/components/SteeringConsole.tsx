/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Send, 
  Swords, 
  ShieldAlert, 
  TrendingUp, 
  SlidersHorizontal, 
  Sparkles, 
  Compass,
  Loader2
} from 'lucide-react';

interface SteeringConsoleProps {
  turn: number;
  isLoading: boolean;
  onSubmitDirective: (directive: string) => void;
}

export const SteeringConsole: React.FC<SteeringConsoleProps> = ({
  turn,
  isLoading,
  onSubmitDirective
}) => {
  const [directive, setDirective] = useState('');

  const quickDirectives = [
    {
      label: 'Back the Strategist',
      icon: TrendingUp,
      color: 'border-emerald-700/50 hover:border-emerald-500 text-emerald-300 bg-emerald-950/40',
      text: 'I back the Strategist. Double down on aggressive offensive expansion, prioritize capturing high-alpha market share, and outline an aggressive capital expenditure roadmap with milestone triggers.'
    },
    {
      label: 'Reinforce the Adversary',
      icon: ShieldAlert,
      color: 'border-rose-700/50 hover:border-rose-500 text-rose-300 bg-rose-950/40',
      text: 'I reinforce the Adversary. Protect the balance sheet, hedge against competitor retaliation and macro headwinds, and formulate strict downside kill-switches.'
    },
    {
      label: 'Synthesize Phased Hybrid',
      icon: Swords,
      color: 'border-cyan-700/50 hover:border-cyan-500 text-cyan-300 bg-cyan-950/40',
      text: 'Synthesize a disciplined phased hybrid: launch a targeted offensive wedge in the most profitable niche while maintaining strict liquidity hedges and milestone-gated capital commitments.'
    },
    {
      label: 'Pivot to M&A / Divestiture',
      icon: Compass,
      color: 'border-amber-700/50 hover:border-amber-500 text-amber-300 bg-amber-950/40',
      text: 'Pivot the blueprint toward strategic M&A and portfolio optimization: explore carving out underperforming divisions and acquiring proprietary technological capabilities.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directive.trim() || isLoading) return;
    onSubmitDirective(directive);
  };

  const handleQuickSelect = (text: string) => {
    setDirective(text);
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-2 border-cyan-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                Turn {turn} Intervention
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
                Awaiting Human Steering
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 mt-0.5">
              👉 [HUMAN-IN-THE-LOOP INTERVENTION]
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-400 font-mono hidden sm:block">
          Direct the multi-agent executive committee to refine Tab 3
        </p>
      </div>

      <p className="text-xs text-slate-300 mb-3">
        Please provide your strategic steering directive below. Do you back the Strategist, reinforce the Adversary, or pivot the blueprint entirely?
      </p>

      {/* Quick-Pick Steering Directives */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
        {quickDirectives.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleQuickSelect(item.text)}
              className={`p-2.5 rounded-xl border text-left transition-all text-xs font-mono flex items-center gap-2 shadow-sm ${item.color}`}
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Directive Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <textarea
            value={directive}
            onChange={(e) => setDirective(e.target.value)}
            placeholder="Type your strategic directive (e.g. 'Back the Strategist but cap CapEx at $3B and demand joint venture co-investment from hyperscalers')..."
            rows={3}
            disabled={isLoading}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all font-sans leading-relaxed disabled:opacity-50"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Turn {turn + 1}: Multi-agent crossfire will re-align and refine Tab 3 options.</span>
          </div>

          <button
            type="submit"
            disabled={!directive.trim() || isLoading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-xs font-semibold shadow-lg shadow-cyan-500/20 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Re-convening Committee...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Submit Strategic Directive (Turn {turn + 1})</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
