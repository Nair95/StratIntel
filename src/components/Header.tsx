/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Building2, 
  Layers, 
  Swords, 
  Sparkles, 
  Globe2, 
  RotateCcw,
  BookOpen,
  Download,
  History
} from 'lucide-react';

interface HeaderProps {
  viewMode: 'virtual_tabs' | 'boardroom';
  onToggleViewMode: (mode: 'virtual_tabs' | 'boardroom') => void;
  onOpenFrameworksCatalog: () => void;
  onOpenExport?: () => void;
  onOpenHistory?: () => void;
  onResetSession: () => void;
  turn: number;
  hasAnalysis?: boolean;
  historyCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  onToggleViewMode,
  onOpenFrameworksCatalog,
  onOpenExport,
  onOpenHistory,
  onResetSession,
  turn,
  hasAnalysis = false,
  historyCount = 0
}) => {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-400/30">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 tracking-tight text-base font-sans flex items-center gap-1.5">
                StratIntel <span className="text-cyan-400 font-mono text-xs font-semibold px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-800/60">EXECUTIVE</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Grounding
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
              Multi-Agent Executive Committee: [Strategist] × [Adversary]
            </p>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2.5">
          {/* History drawer trigger button */}
          {onOpenHistory && (
            <button
              onClick={onOpenHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors relative"
              title="Open past boardroom session history"
            >
              <History className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">History</span>
              {historyCount > 0 && (
                <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800/70 px-1.5 py-0.2 rounded-full font-bold">
                  {historyCount}
                </span>
              )}
            </button>
          )}

          {/* Frameworks Catalog button */}
          <button
            onClick={onOpenFrameworksCatalog}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Frameworks Toolkit</span>
          </button>


          {/* Export Dossier button */}
          {hasAnalysis && onOpenExport && (
            <button
              onClick={onOpenExport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-800/80 text-xs font-mono text-cyan-300 hover:text-cyan-100 transition-colors shadow-sm"
              title="Export board analysis to Markdown, Plain Text, or JSON"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Export Dossier</span>
            </button>
          )}

          {/* View mode toggle */}
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => onToggleViewMode('virtual_tabs')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                viewMode === 'virtual_tabs'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="View output strictly formatted in virtual tabs (<details> layout)"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Virtual Tabs</span>
            </button>
            <button
              onClick={() => onToggleViewMode('boardroom')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                viewMode === 'boardroom'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="View visual boardroom cockpit"
            >
              <Swords className="w-3.5 h-3.5" />
              <span>Boardroom UI</span>
            </button>
          </div>

          {/* Reset session button */}
          <button
            onClick={onResetSession}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors"
            title="Start New Executive Session"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
