/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Building2, 
  FileText, 
  Upload, 
  X, 
  Sparkles, 
  Cpu, 
  Layers, 
  Loader2, 
  Compass,
  CheckCircle2,
  FileCheck,
  Search
} from 'lucide-react';
import { PRELOADED_SCENARIOS, ExecutiveScenario, ENTERPRISE_FRAMEWORKS } from '../types/frameworks.ts';

export interface UploadedDocPayload {
  fileName: string;
  fileType: string;
  fileSize: number;
  base64Data?: string;
  textContent?: string;
}

interface BriefingFormProps {
  isLoading: boolean;
  onAnalyze: (payload: {
    companyName: string;
    industry: string;
    dilemma: string;
    uploadedDoc?: UploadedDocPayload;
    forcedFramework?: string;
  }) => void;
}

export const BriefingForm: React.FC<BriefingFormProps> = ({
  isLoading,
  onAnalyze,
}) => {
  const [companyName, setCompanyName] = useState('Intel Corporation');
  const [industry, setIndustry] = useState('Semiconductors & Advanced Foundry Systems');
  const [dilemma, setDilemma] = useState(
    'Should Intel spin off Intel Foundry Services (IFS) into an independent commercial entity, or double down on IDM 2.0 while hyperscalers design custom ARM/RISC-V silicon and TSMC monopolizes 3nm advanced packaging?'
  );
  const [selectedFrameworkOverride, setSelectedFrameworkOverride] = useState('');
  const [uploadedDoc, setUploadedDoc] = useState<UploadedDocPayload | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleSelectScenario = (scenario: ExecutiveScenario) => {
    setCompanyName(scenario.companyName);
    setIndustry(scenario.industry);
    setDilemma(scenario.dilemma);
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();

    if (file.type === 'application/pdf') {
      reader.onload = () => {
        const result = reader.result as string;
        // Strip data:application/pdf;base64, prefix for raw base64
        const base64Data = result.split(',')[1] || result;
        setUploadedDoc({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          base64Data: base64Data
        });
      };
      reader.readAsDataURL(file);
    } else {
      // Plain text or json
      reader.onload = () => {
        const text = reader.result as string;
        setUploadedDoc({
          fileName: file.name,
          fileType: file.type || 'text/plain',
          fileSize: file.size,
          textContent: text
        });
      };
      reader.readAsText(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !dilemma.trim() || isLoading) return;

    onAnalyze({
      companyName,
      industry,
      dilemma,
      uploadedDoc: uploadedDoc || undefined,
      forcedFramework: selectedFrameworkOverride || undefined
    });
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Title & Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/40">
              Executive Briefing Dossier
            </span>
            <span className="text-[11px] font-mono text-slate-400">Turn 1 Initiation</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            Target Dilemma & Evidence Grounding
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1.5 rounded-lg">
          <Search className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
          <span>Google Search Grounding: READY</span>
        </div>
      </div>

      {/* Pre-loaded Case Studies */}
      <div className="mb-5">
        <label className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          Pre-Loaded Executive Boardroom Scenarios:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {PRELOADED_SCENARIOS.map((scenario) => {
            const isSelected = companyName === scenario.companyName;
            return (
              <button
                key={scenario.id}
                type="button"
                onClick={() => handleSelectScenario(scenario)}
                className={`p-3 rounded-xl border text-left transition-all text-xs font-mono ${
                  isSelected
                    ? 'bg-cyan-950/60 border-cyan-500/60 text-cyan-200 shadow-md shadow-cyan-950/50'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="font-bold truncate text-slate-100 flex items-center justify-between">
                  <span>{scenario.companyName}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 ml-1" />}
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{scenario.industry}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-mono uppercase text-slate-300 mb-1.5 block">
              Company Name & Ticker
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Intel Corporation (INTC)"
                required
                disabled={isLoading}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-300 mb-1.5 block">
              Industry / Operating Sector
            </label>
            <div className="relative">
              <Cpu className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Semiconductors, Aerospace, Retail, Cloud Computing"
                disabled={isLoading}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 font-mono"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs font-mono uppercase text-slate-300 mb-1.5 block">
            Target Dilemma & Existential Bottleneck
          </label>
          <textarea
            value={dilemma}
            onChange={(e) => setDilemma(e.target.value)}
            rows={3}
            placeholder="Describe the company's core strategic conflict, market disruption, financial margin pressure, or capital allocation crossroad..."
            required
            disabled={isLoading}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 font-sans leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Document / PDF Ingestion Area */}
          <div>
            <label className="text-xs font-mono uppercase text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Attach Briefing Document / 10-K (Optional)</span>
              <span className="text-[11px] text-slate-500 font-mono">PDF, TXT, DOCX</span>
            </label>

            {!uploadedDoc ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                  dragActive
                    ? 'border-cyan-400 bg-cyan-950/20'
                    : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-950/70'
                }`}
                onClick={() => document.getElementById('briefing-file-input')?.click()}
              >
                <input
                  id="briefing-file-input"
                  type="file"
                  accept=".pdf,.txt,.json,.doc,.docx"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                />
                <Upload className="w-5 h-5 text-slate-500 mx-auto mb-1.5" />
                <p className="text-xs text-slate-300 font-mono">
                  Drop PDF or click to browse
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Parsed directly by Gemini to extract numbers & metrics
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-cyan-500/40 text-xs">
                <div className="flex items-center gap-2.5 truncate">
                  <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <p className="font-mono text-slate-200 truncate">{uploadedDoc.fileName}</p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      {(uploadedDoc.fileSize / 1024).toFixed(1)} KB • Ingested for Analysis
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setUploadedDoc(null)}
                  className="p-1 text-slate-400 hover:text-rose-400 transition-colors ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Framework Dynamic Selector / Override */}
          <div>
            <label className="text-xs font-mono uppercase text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Framework Engine Policy</span>
              <span className="text-[11px] text-cyan-400 font-mono">12+ Global Frameworks</span>
            </label>
            <div className="relative">
              <Layers className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <select
                value={selectedFrameworkOverride}
                onChange={(e) => setSelectedFrameworkOverride(e.target.value)}
                disabled={isLoading}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 font-mono appearance-none"
              >
                <option value="">⚡ Auto-Detect Dynamic Selection Engine (Recommended)</option>
                <optgroup label="Macro / Market Assessment">
                  <option value="Porter's Five Forces">Porter's Five Forces</option>
                  <option value="PESTLE Analysis">PESTLE Analysis</option>
                  <option value="Blue Ocean Strategy (Strategy Canvas & ERRC)">Blue Ocean Strategy</option>
                </optgroup>
                <optgroup label="Growth & Product Strategy">
                  <option value="Ansoff Growth Matrix">Ansoff Growth Matrix</option>
                  <option value="BCG Growth-Share Matrix">BCG Growth-Share Matrix</option>
                  <option value="McKinsey 7S Framework">McKinsey 7S Framework</option>
                  <option value="Jobs-to-be-Done (JTBD)">Jobs-to-be-Done (JTBD)</option>
                </optgroup>
                <optgroup label="Execution & Operations">
                  <option value="Porter's Value Chain Analysis">Value Chain Analysis</option>
                  <option value="MECE Structural Issue Tree">MECE Structural Breakdown</option>
                  <option value="Core Competency Mapping">Core Competency Mapping</option>
                </optgroup>
                <optgroup label="Financial Strategy">
                  <option value="DuPont ROE Deconstruction">DuPont ROE Deconstruction</option>
                  <option value="Unit Economics / LTV-CAC Matrix">Unit Economics / LTV-CAC Matrix</option>
                  <option value="Capital Allocation Framework">Capital Allocation Framework</option>
                </optgroup>
              </select>
            </div>
            <p className="text-[10px] text-slate-500 mt-1 font-mono">
              The engine dynamically selects the most surgical 1-2 frameworks if left on Auto.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !companyName.trim() || !dilemma.trim()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-mono text-xs font-bold shadow-xl shadow-cyan-500/25 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Executive Committee in Session (Grounding & Reasoning)...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Convene Executive Committee (Execute Turn 1)</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
