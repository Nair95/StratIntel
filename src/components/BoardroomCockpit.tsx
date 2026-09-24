/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BarChart3, 
  Swords, 
  Lightbulb, 
  Globe2, 
  Target, 
  ShieldAlert, 
  Flame, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  Zap,
  TrendingUp,
  AlertTriangle,
  Download
} from 'lucide-react';
import { AnalysisResponseData } from '../types/frameworks.ts';
import { FrameworkVisualizer } from './FrameworkVisualizer.tsx';

interface BoardroomCockpitProps {
  data: AnalysisResponseData;
  companyName: string;
  onOpenExport?: () => void;
}

export const BoardroomCockpit: React.FC<BoardroomCockpitProps> = ({
  data,
  companyName,
  onOpenExport
}) => {
  const [activeTab, setActiveTab] = useState<'insights' | 'arena' | 'solutions' | 'grounding'>('insights');

  const {
    frameworksSelected = [],
    diagnosticRationale = '',
    searchQueries = [],
    citations = [],
    meceBottleneck = [],
    strategistInitiative = '',
    adversarialCounter = '',
    optionA,
    optionB,
    optionC,
    turn = 1
  } = data;

  const frameworkName = frameworksSelected[0] || "Porter's Five Forces & DuPont Analysis";

  return (
    <div className="space-y-5">
      {/* Cockpit Header Navigation */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2 shadow-2xl backdrop-blur-md flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800/80">
          <button
            onClick={() => setActiveTab('insights')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
              activeTab === 'insights'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Tab 1: Market Insights</span>
          </button>

          <button
            onClick={() => setActiveTab('arena')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all relative ${
              activeTab === 'arena'
                ? 'bg-rose-500/15 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Swords className="w-3.5 h-3.5 text-rose-400" />
            <span>Tab 2: Debate Arena</span>
            <span className="flex h-1.5 w-1.5 rounded-full bg-rose-400 animate-ping absolute top-1.5 right-1.5" />
          </button>

          <button
            onClick={() => setActiveTab('solutions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
              activeTab === 'solutions'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tab 3: Board Solutions</span>
          </button>

          <button
            onClick={() => setActiveTab('grounding')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
              activeTab === 'grounding'
                ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Grounding ({citations.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-2.5 px-2">
          {onOpenExport && (
            <button
              onClick={onOpenExport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800/80 text-xs font-mono text-cyan-300 hover:text-cyan-100 transition-colors shadow-sm"
              title="Export complete boardroom briefing to text, markdown, or JSON"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export Dossier</span>
            </button>
          )}

          <div className="hidden md:flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Target: <strong className="text-slate-200">{companyName}</strong></span>
            <span className="text-xs font-mono bg-cyan-950 text-cyan-300 border border-cyan-800/60 px-2 py-0.5 rounded">
              Turn {turn}
            </span>
          </div>
        </div>
      </div>

      {/* Tab 1: Dynamic Market Insights */}
      {activeTab === 'insights' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Framework Visualizer component */}
          <FrameworkVisualizer 
            frameworkName={frameworkName}
            rationale={diagnosticRationale}
            mecePoints={meceBottleneck}
          />

          {/* MECE Core Structural Bottleneck Cards */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3 font-semibold">
              <Target className="w-4 h-4" />
              Core Structural Bottleneck (MECE Decomposition)
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Mutually Exclusive, Collectively Exhaustive diagnosis isolating non-overlapping existential constraints:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {meceBottleneck.length > 0 ? (
                meceBottleneck.map((point, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800/60 text-cyan-300 flex-shrink-0 mt-0.5">
                      Pillar 0{idx + 1}
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      {point.replace(/^[*#-]\s*/, '')}
                    </p>
                  </div>
                ))
              ) : (
                <div className="col-span-2 p-4 text-xs text-slate-400 bg-slate-950/50 rounded-lg">
                  Structural analysis populated from live grounding data.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Agentic Debate Arena */}
      {activeTab === 'arena' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Arena Ring Banner */}
          <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-rose-950/40 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
                  <Swords className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    Executive Committee Crossfire Ring
                  </h3>
                  <p className="text-xs text-slate-400">
                    Bipolar stress-testing between growth alpha and macro risk exposure
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                  [Strategist: Offensive Alpha]
                </span>
                <span className="text-slate-500">VS</span>
                <span className="text-rose-400 bg-rose-950/60 border border-rose-800/40 px-2 py-0.5 rounded">
                  [Adversary: Red Team Reality]
                </span>
              </div>
            </div>

            {/* Duel Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
              {/* Strategist Card */}
              <div className="bg-slate-950/90 border border-emerald-800/40 rounded-xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
                        Strategist Agent Formulation
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400/80 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/40">
                      Offensive Initiative
                    </span>
                  </div>

                  <p className="text-sm text-slate-200 leading-relaxed font-sans mb-4 whitespace-pre-line">
                    {strategistInitiative || "Proposes bold market offensive to solve the structural dilemma highlighted by the framework."}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-900 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <TrendingUp className="w-3.5 h-3.5" /> High Alpha Target
                  </span>
                  <span>Execution Horizon: 12-24 Mo</span>
                </div>
              </div>

              {/* Adversarial Card */}
              <div className="bg-slate-950/90 border border-rose-800/40 rounded-xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-rose-900/40 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-sm shadow-rose-400" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-300">
                        Adversarial Agent Counter
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-rose-400/80 bg-rose-950 px-2 py-0.5 rounded border border-rose-800/40">
                      Red Team Stress-Test
                    </span>
                  </div>

                  <p className="text-sm text-slate-200 leading-relaxed font-sans mb-4 whitespace-pre-line">
                    {adversarialCounter || "Weaponizes competitor retaliations, macroeconomic friction, and cash-burn velocity to expose strategy blindspots."}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-900 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1 text-rose-400">
                    <AlertTriangle className="w-3.5 h-3.5" /> Blindspot Flagged
                  </span>
                  <span>Probability of Headwind: High</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Board Solutions & Options */}
      {activeTab === 'solutions' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="text-sm font-bold text-slate-100">Boardroom Strategic Blueprint</h3>
                <p className="text-xs text-slate-400">Formulated actionable options with phased execution roadmaps</p>
              </div>
            </div>
            <span className="text-xs font-mono bg-emerald-950 text-emerald-300 border border-emerald-800/60 px-2.5 py-1 rounded-lg">
              Steering Ready
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Option A Card */}
            <div className="bg-slate-900/90 border border-cyan-800/40 rounded-xl p-5 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/50">
                    Option A (Core Pivot)
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Primary Vector</span>
                </div>
                <h4 className="text-base font-bold text-slate-100 mb-2">
                  {optionA?.title || "Core Strategic Transformation"}
                </h4>
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 mb-4">
                  <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-1">Strategic Hypothesis</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {optionA?.hypothesis || "Leverages distinct structural advantages to capture emerging profit pools."}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Phased Execution Vectors</div>
                  {optionA?.executionVectors?.map((vec, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/50">
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>{vec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Option B Card */}
            <div className="bg-slate-900/90 border border-amber-800/40 rounded-xl p-5 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800/50">
                    Option B (Alternative Hedge)
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Downside Protected</span>
                </div>
                <h4 className="text-base font-bold text-slate-100 mb-2">
                  {optionB?.title || "Defensive Capital & Operational Hedge"}
                </h4>
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 mb-4">
                  <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-1">Strategic Hypothesis</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {optionB?.hypothesis || "Preserves cash liquidity and protects market positioning against severe macro headwinds."}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Phased Execution Vectors</div>
                  {optionB?.executionVectors?.map((vec, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/50">
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span>{vec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Grounding & Sources */}
      {activeTab === 'grounding' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-100">Live Google Search Grounding Engine</h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800/40">
                Live Grounding: ACTIVE
              </span>
            </div>

            {/* Queries executed */}
            <div className="mb-5">
              <div className="text-xs font-mono uppercase text-slate-400 mb-2">Search Queries Dispatched:</div>
              <div className="flex flex-wrap gap-2">
                {searchQueries.length > 0 ? (
                  searchQueries.map((q, idx) => (
                    <span key={idx} className="text-xs font-mono bg-slate-950 text-indigo-300 border border-indigo-900/40 px-3 py-1.5 rounded-lg">
                      {q}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 font-mono">Real-time parameters grounded directly from web knowledge.</span>
                )}
              </div>
            </div>

            {/* Citations List */}
            <div>
              <div className="text-xs font-mono uppercase text-slate-400 mb-2">Retrieved Market Intelligence Citations:</div>
              {citations.length > 0 ? (
                <div className="space-y-2">
                  {citations.map((cite, idx) => (
                    <a
                      key={idx}
                      href={cite.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-xs text-slate-200 hover:text-indigo-300 transition-colors group"
                    >
                      <span className="truncate pr-4 font-mono">{cite.title || cite.url}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 flex-shrink-0" />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">Live intelligence retrieved and synthesized into market insights.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
