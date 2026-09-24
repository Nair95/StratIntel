/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Layers, Search, CheckCircle2, ChevronRight } from 'lucide-react';
import { ENTERPRISE_FRAMEWORKS, FrameworkCategory } from '../types/frameworks.ts';

interface FrameworksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFramework?: (name: string) => void;
}

export const FrameworksModal: React.FC<FrameworksModalProps> = ({
  isOpen,
  onClose,
  onSelectFramework
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories: string[] = [
    'All',
    'Macro/Market Assessment',
    'Growth & Product Strategy',
    'Execution & Operations',
    'Financial Strategy'
  ];

  const filtered = ENTERPRISE_FRAMEWORKS.filter(f => {
    const matchesCategory = activeCategory === 'All' || f.category === activeCategory;
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.typicalTrigger.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Enterprise Framework Dynamic Selection Toolkit</h2>
              <p className="text-xs text-slate-400 font-mono">
                12+ executive diagnostic frameworks automatically selected by the committee engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Categories Bar */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-950/50 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search frameworks by name, trigger condition, or diagnostic purpose..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-semibold'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Frameworks Grid */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filtered.map((fw) => (
              <div
                key={fw.id}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-800/40 px-2 py-0.5 rounded">
                      {fw.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">{fw.components.length} Pillars</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {fw.name}
                  </h3>

                  <p className="text-xs text-slate-300 mt-1 leading-relaxed font-sans">
                    {fw.description}
                  </p>

                  <div className="mt-3 p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block mb-0.5">
                      Diagnostic Trigger Condition:
                    </span>
                    <span className="text-xs text-slate-300">
                      {fw.typicalTrigger}
                    </span>
                  </div>
                </div>

                {onSelectFramework && (
                  <button
                    onClick={() => {
                      onSelectFramework(fw.name);
                      onClose();
                    }}
                    className="mt-4 w-full py-1.5 rounded-lg bg-slate-900 hover:bg-cyan-500/20 text-xs font-mono text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Enforce Framework in Analysis</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
