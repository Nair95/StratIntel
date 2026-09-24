/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  FileCode, 
  Layers, 
  Database,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { AnalysisResponseData } from '../types/frameworks.ts';
import { 
  generateBoardroomMarkdown, 
  generateBoardroomPlainText, 
  downloadFile,
  ExportMetadata 
} from '../utils/exportUtils.ts';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AnalysisResponseData | null;
  metadata: ExportMetadata;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  data,
  metadata
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'md' | 'txt' | 'raw_details' | 'json'>('md');
  const [copied, setCopied] = useState(false);

  // Generate the formatted content based on selected format
  const exportContent = useMemo(() => {
    if (!data) return '';

    if (selectedFormat === 'md') {
      return generateBoardroomMarkdown(data, metadata);
    } else if (selectedFormat === 'txt') {
      return generateBoardroomPlainText(data, metadata);
    } else if (selectedFormat === 'raw_details') {
      return data.rawOutput || '';
    } else if (selectedFormat === 'json') {
      return JSON.stringify({
        metadata,
        analysis: data
      }, null, 2);
    }
    return '';
  }, [data, metadata, selectedFormat]);

  if (!isOpen || !data) return null;

  // Clean company name for filename
  const cleanName = (metadata.companyName || 'Executive_Briefing')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 30);
  
  const getFilename = () => {
    switch (selectedFormat) {
      case 'md':
        return `StratIntel_${cleanName}_Turn${metadata.turn}_Dossier.md`;
      case 'txt':
        return `StratIntel_${cleanName}_Turn${metadata.turn}_Briefing.txt`;
      case 'raw_details':
        return `StratIntel_${cleanName}_Turn${metadata.turn}_VirtualTabs.md`;
      case 'json':
        return `StratIntel_${cleanName}_Turn${metadata.turn}_BoardPacket.json`;
    }
  };

  const getMimeType = () => {
    switch (selectedFormat) {
      case 'md':
      case 'raw_details':
        return 'text/markdown';
      case 'txt':
        return 'text/plain';
      case 'json':
        return 'application/json';
    }
  };

  const handleDownload = () => {
    const filename = getFilename();
    const mimeType = getMimeType();
    downloadFile(exportContent, filename, mimeType);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(exportContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                Export Executive Boardroom Analysis
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                {metadata.companyName} • Turn {metadata.turn} • Structured offline review format
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

        {/* Format Selector Bar */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-950/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase text-slate-400 mr-1">Export Format:</span>
            
            <button
              onClick={() => setSelectedFormat('md')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedFormat === 'md'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Markdown (.md)</span>
            </button>

            <button
              onClick={() => setSelectedFormat('txt')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedFormat === 'txt'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Plain Text (.txt)</span>
            </button>

            <button
              onClick={() => setSelectedFormat('raw_details')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedFormat === 'raw_details'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Virtual Tabs Stream</span>
            </button>

            <button
              onClick={() => setSelectedFormat('json')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedFormat === 'json'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Board Packet (.json)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700/80 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-mono font-bold shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Content Preview Container */}
        <div className="p-5 overflow-hidden flex-1 flex flex-col bg-slate-950">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-2 mb-2 border-b border-slate-900">
            <span>Target Filename: <strong className="text-cyan-400">{getFilename()}</strong></span>
            <span>Character Count: {exportContent.length.toLocaleString()}</span>
          </div>

          <div className="flex-1 overflow-auto rounded-xl bg-slate-900/90 border border-slate-800/80 p-4 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre selection:bg-cyan-500/30 selection:text-cyan-200">
            {exportContent}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Includes Dynamic Framework Diagnosis, Multi-Agent Debate Arena, MECE Root Causes, and Board Solutions.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
