/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { marked } from 'marked';
import { Copy, Check, Download, Sparkles, Search, ExternalLink } from 'lucide-react';
import { SearchCitation } from '../types/frameworks.ts';

interface VirtualTabsViewProps {
  rawOutput: string;
  searchQueries?: string[];
  citations?: SearchCitation[];
  turn?: number;
  onOpenExport?: () => void;
}

export const VirtualTabsView: React.FC<VirtualTabsViewProps> = ({
  rawOutput,
  searchQueries = [],
  citations = [],
  turn = 1,
  onOpenExport
}) => {
  const [copied, setCopied] = React.useState(false);

  // Render markdown to HTML safely
  const renderedHtml = useMemo(() => {
    if (!rawOutput) return '';
    try {
      // Ensure details tag is marked as open by default for immediate readability
      let processed = rawOutput;
      if (!processed.includes('<details open>')) {
        processed = processed.replace(/<details>/g, '<details open>');
      }
      return marked.parse(processed, {
        breaks: true,
        gfm: true,
      }) as string;
    } catch (err) {
      console.error('Error rendering markdown:', err);
      return rawOutput;
    }
  }, [rawOutput]);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([rawOutput], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `StratIntel_Executive_Report_Turn${turn}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Top Action Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono font-medium text-slate-300">
            Stream Format: <strong className="text-cyan-400 font-semibold">Virtual Tabs Stream (&lt;details&gt; specification)</strong>
          </span>
          <span className="text-[11px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800/50 px-2 py-0.5 rounded">
            Turn {turn}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors border border-slate-700/60"
            title="Copy board briefing markdown"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            {copied ? 'Copied' : 'Copy Output'}
          </button>

          {onOpenExport ? (
            <button
              onClick={onOpenExport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800/80 text-cyan-300 hover:text-cyan-100 text-xs font-mono transition-colors shadow-sm"
              title="Export to Markdown, Structured Text, or JSON"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export Dossier (MD / TXT)</span>
            </button>
          ) : (
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors border border-slate-700/60"
              title="Download markdown briefing"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              Export .MD
            </button>
          )}
        </div>
      </div>

      {/* Live Grounding Queries Bar if available */}
      {searchQueries.length > 0 && (
        <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl text-xs">
          <div className="flex items-center gap-2 text-slate-400 mb-2 font-mono">
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span>Google Search Grounding Queries Executed:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {searchQueries.map((query, idx) => (
              <span 
                key={idx} 
                className="bg-slate-900 text-cyan-300/90 border border-cyan-950 px-2.5 py-1 rounded-md text-[11px] font-mono flex items-center gap-1"
              >
                <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                {query}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Main Virtual Tabs Container */}
      <div 
        className="virtual-tabs-container bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 shadow-2xl backdrop-blur-md prose prose-invert max-w-none 
          prose-headings:text-slate-100 prose-headings:font-bold prose-h3:text-cyan-300 prose-h3:mt-4 prose-h3:mb-2
          prose-p:text-slate-300 prose-p:leading-relaxed prose-li:text-slate-300 prose-strong:text-amber-200
          [&_details]:mb-6 [&_details]:rounded-xl [&_details]:border [&_details]:border-slate-800/90 [&_details]:bg-slate-950/80 [&_details]:overflow-hidden [&_details]:transition-all
          [&_summary]:cursor-pointer [&_summary]:px-5 [&_summary]:py-4 [&_summary]:bg-gradient-to-r [&_summary]:from-slate-900 [&_summary]:to-slate-950 [&_summary]:text-slate-100 [&_summary]:font-bold [&_summary]:select-none [&_summary]:border-b [&_summary]:border-slate-800/80 hover:[&_summary]:bg-slate-900 [&_details[open]_summary]:border-cyan-500/30
          [&_details_div]:p-5 [&_details>*:not(summary)]:px-5 [&_details>*:not(summary)]:py-2
          [&_hr]:border-slate-800 [&_hr]:my-6"
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />

      {/* Search Citations Drawer if sources were found */}
      {citations.length > 0 && (
        <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4">
          <div className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              Verified Market Intelligence Sources ({citations.length})
            </span>
            <span className="text-[11px] text-slate-500 font-mono">Real-Time Search Grounding</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            {citations.map((cite, index) => (
              <a
                key={index}
                href={cite.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800/60 text-xs text-slate-300 hover:text-cyan-300 transition-colors group"
              >
                <span className="truncate pr-2 font-mono text-[11px]">{cite.title || cite.url}</span>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
