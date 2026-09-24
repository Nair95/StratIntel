/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ShieldAlert, 
  TrendingUp, 
  Layers, 
  PieChart, 
  Workflow, 
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { ENTERPRISE_FRAMEWORKS } from '../types/frameworks.ts';

interface FrameworkVisualizerProps {
  frameworkName: string;
  rationale: string;
  mecePoints?: string[];
}

export const FrameworkVisualizer: React.FC<FrameworkVisualizerProps> = ({
  frameworkName,
  rationale,
  mecePoints = []
}) => {
  // Find matching framework or detect category
  const matched = ENTERPRISE_FRAMEWORKS.find(f => 
    frameworkName.toLowerCase().includes(f.name.toLowerCase()) ||
    f.name.toLowerCase().includes(frameworkName.toLowerCase()) ||
    frameworkName.toLowerCase().includes(f.id.replace(/_/g, ' '))
  ) || ENTERPRISE_FRAMEWORKS[0];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-2xl relative overflow-hidden backdrop-blur-md">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            {matched.category === 'Macro/Market Assessment' && <PieChart className="w-5 h-5" />}
            {matched.category === 'Growth & Product Strategy' && <TrendingUp className="w-5 h-5" />}
            {matched.category === 'Execution & Operations' && <Workflow className="w-5 h-5" />}
            {matched.category === 'Financial Strategy' && <DollarSign className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                {matched.category}
              </span>
              <span className="text-xs text-slate-400">Dynamic Diagnostic Engine</span>
            </div>
            <h3 className="text-lg font-bold text-slate-100 mt-1 flex items-center gap-2">
              {frameworkName || matched.name}
            </h3>
          </div>
        </div>

        <div className="text-xs text-slate-400 font-mono bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
          Status: <span className="text-emerald-400 font-semibold">Enforced in Analysis</span>
        </div>
      </div>

      {/* Rationale Callout */}
      <div className="mb-5 p-3.5 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-900/50 border-l-4 border-cyan-500 rounded-r-lg">
        <div className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold mb-1 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" />
          Diagnostic Rationale
        </div>
        <p className="text-sm text-slate-200 leading-relaxed font-sans">
          {rationale || matched.description}
        </p>
      </div>

      {/* Dynamic Framework Matrix / Diagram Component */}
      <div className="mt-4">
        {/* Five Forces Visual */}
        {(matched.visualType === 'five_forces' || frameworkName.toLowerCase().includes('porter')) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-3 flex justify-center">
              <div className="w-full max-w-sm p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-center shadow">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Threat of New Entrants</span>
                <p className="text-xs text-slate-300 mt-1">Capital intensity & hyperscaler ecosystem moats</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-center shadow">
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">Supplier Power</span>
              <p className="text-xs text-slate-300 mt-1">ASML, TSMC tooling & specialized IP leverage</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-b from-cyan-950/60 to-slate-950 border-2 border-cyan-500/40 text-center shadow-lg shadow-cyan-950/30">
              <div className="inline-block p-1.5 rounded-full bg-cyan-500/20 text-cyan-300 mb-1">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wide">Industry Rivalry</h4>
              <p className="text-xs text-cyan-200/90 mt-1 font-medium">Core battleground for market share & pricing discipline</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-center shadow">
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">Buyer Bargaining Power</span>
              <p className="text-xs text-slate-300 mt-1">Enterprise consolidation & alternative architectures</p>
            </div>
            <div className="md:col-span-3 flex justify-center">
              <div className="w-full max-w-sm p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-center shadow">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Threat of Substitutes</span>
                <p className="text-xs text-slate-300 mt-1">Next-gen paradigms, custom ASICs & cloud disintermediation</p>
              </div>
            </div>
          </div>
        )}

        {/* 2x2 Matrix (Ansoff or BCG) */}
        {matched.visualType === 'matrix_2x2' && (
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-emerald-400 font-mono mb-1">
                <span>{frameworkName.includes('BCG') ? '⭐ Stars' : '🎯 Market Penetration'}</span>
                <span className="text-[10px] bg-emerald-950/80 text-emerald-300 px-1.5 py-0.5 rounded">Core Growth</span>
              </div>
              <p className="text-xs text-slate-300">Maximize reinvestment to protect leadership position and expand gross margins.</p>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-cyan-400 font-mono mb-1">
                <span>{frameworkName.includes('BCG') ? '❓ Question Marks' : '🚀 Product Development'}</span>
                <span className="text-[10px] bg-cyan-950/80 text-cyan-300 px-1.5 py-0.5 rounded">High Alpha</span>
              </div>
              <p className="text-xs text-slate-300">Targeted R&D capital injection to transform high TAM potential into defensible share.</p>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-amber-400 font-mono mb-1">
                <span>{frameworkName.includes('BCG') ? '🐄 Cash Cows' : '🌍 Market Development'}</span>
                <span className="text-[10px] bg-amber-950/80 text-amber-300 px-1.5 py-0.5 rounded">Cash Engine</span>
              </div>
              <p className="text-xs text-slate-300">Harvest operational cash flows while minimizing discretionary overhead reinvestment.</p>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-rose-400 font-mono mb-1">
                <span>{frameworkName.includes('BCG') ? '🐕 Dogs' : '🔀 Diversification'}</span>
                <span className="text-[10px] bg-rose-950/80 text-rose-300 px-1.5 py-0.5 rounded">Divest/Pivot</span>
              </div>
              <p className="text-xs text-slate-300">Evaluate carve-outs, selective joint ventures, or sunsetting unprofitable lines.</p>
            </div>
          </div>
        )}

        {/* DuPont / Financial Strategy */}
        {(matched.visualType === 'dupont' || matched.visualType === 'unit_econ') && (
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800">
            <div className="text-xs font-mono uppercase text-slate-400 mb-3 flex items-center justify-between">
              <span>Financial Value Architecture</span>
              <span className="text-amber-400">ROE = Net Margin × Asset Turnover × Leverage Multiplier</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <div className="text-xs text-slate-400 font-mono">Operating Efficiency</div>
                <div className="text-sm font-bold text-slate-100 mt-0.5">Net Profit Margin</div>
                <div className="text-[11px] text-cyan-400 mt-1">Pricing power & COGS containment</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <div className="text-xs text-slate-400 font-mono">Asset Velocity</div>
                <div className="text-sm font-bold text-slate-100 mt-0.5">Asset Turnover</div>
                <div className="text-[11px] text-indigo-400 mt-1">CapEx productivity & inventory churn</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <div className="text-xs text-slate-400 font-mono">Capital Structure</div>
                <div className="text-sm font-bold text-slate-100 mt-0.5">Financial Leverage</div>
                <div className="text-[11px] text-amber-400 mt-1">Debt coverage & WACC optimization</div>
              </div>
            </div>
          </div>
        )}

        {/* Value Chain / Operations / PESTLE / Blue Ocean / Default */}
        {!['five_forces', 'matrix_2x2', 'dupont', 'unit_econ'].includes(matched.visualType) && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {matched.components.slice(0, 4).map((comp, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                <div className="text-xs font-mono text-cyan-400 mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Pillar 0{idx + 1}
                </div>
                <div className="text-xs font-semibold text-slate-200 line-clamp-2">{comp}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MECE Breakdown summary if present */}
      {mecePoints.length > 0 && (
        <div className="mt-5 pt-4 border-t border-slate-800/80">
          <div className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            MECE Structural Root Causes
          </div>
          <div className="space-y-1.5">
            {mecePoints.slice(0, 4).map((point, index) => (
              <div key={index} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-950/40 p-2 rounded border border-slate-800/40">
                <span className="text-cyan-400 font-mono font-bold mt-0.5">#{index + 1}</span>
                <span>{point.replace(/^[*#-]\s*/, '')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
