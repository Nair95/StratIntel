/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Building2, 
  Swords, 
  Layers, 
  Sparkles, 
  Compass, 
  AlertCircle, 
  ChevronDown, 
  FileText,
  SlidersHorizontal,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  Search,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { Header } from './components/Header.tsx';
import { BriefingForm, UploadedDocPayload } from './components/BriefingForm.tsx';
import { VirtualTabsView } from './components/VirtualTabsView.tsx';
import { BoardroomCockpit } from './components/BoardroomCockpit.tsx';
import { SteeringConsole } from './components/SteeringConsole.tsx';
import { FrameworksModal } from './components/FrameworksModal.tsx';
import { ExportModal } from './components/ExportModal.tsx';
import { HistoryDrawer } from './components/HistoryDrawer.tsx';
import { AnalysisResponseData, BoardroomSessionRecord } from './types/frameworks.ts';
import { History } from 'lucide-react';

const SESSIONS_STORAGE_KEY = 'stratintel_boardroom_sessions_v1';

function loadSavedSessions(): BoardroomSessionRecord[] {
  try {
    const raw = localStorage.getItem(SESSIONS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load saved sessions from storage:', e);
    return [];
  }
}

function saveSessionsToStorage(sessions: BoardroomSessionRecord[]): void {
  try {
    localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
  } catch (e) {
    console.error('Failed to save sessions to storage:', e);
  }
}

export default function App() {
  const [viewMode, setViewMode] = useState<'virtual_tabs' | 'boardroom'>('virtual_tabs');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [frameworksModalOpen, setFrameworksModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);

  // History state: stored sessions in local state and localStorage
  const [sessions, setSessions] = useState<BoardroomSessionRecord[]>(loadSavedSessions);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(() => {
    const initial = loadSavedSessions();
    return initial.length > 0 ? initial[0].id : null;
  });
  const [exportTargetSession, setExportTargetSession] = useState<BoardroomSessionRecord | null>(null);

  // Active executive session state
  const [currentCompany, setCurrentCompany] = useState(() => {
    const initial = loadSavedSessions();
    return initial.length > 0 ? initial[0].companyName : 'Intel Corporation';
  });
  const [currentIndustry, setCurrentIndustry] = useState(() => {
    const initial = loadSavedSessions();
    return initial.length > 0 ? initial[0].industry : 'Semiconductors & Advanced Foundry Systems';
  });
  const [currentDilemma, setCurrentDilemma] = useState(() => {
    const initial = loadSavedSessions();
    return initial.length > 0 ? initial[0].dilemma : '';
  });
  const [uploadedDoc, setUploadedDoc] = useState<UploadedDocPayload | undefined>(undefined);
  const [forcedFramework, setForcedFramework] = useState<string | undefined>(undefined);
  const [turn, setTurn] = useState<number>(() => {
    const initial = loadSavedSessions();
    return initial.length > 0 ? initial[0].turn : 1;
  });
  const [analysisData, setAnalysisData] = useState<AnalysisResponseData | null>(() => {
    const initial = loadSavedSessions();
    return initial.length > 0 ? initial[0].data : null;
  });
  const [showBriefingEditor, setShowBriefingEditor] = useState(false);

  // Switch between past boardroom sessions in local state without page reload
  const handleSelectSession = (session: BoardroomSessionRecord) => {
    setCurrentCompany(session.companyName);
    setCurrentIndustry(session.industry);
    setCurrentDilemma(session.dilemma);
    setForcedFramework(session.forcedFramework);
    setTurn(session.turn);
    setAnalysisData(session.data);
    setActiveSessionId(session.id);
    setShowBriefingEditor(false);
    setError(null);
  };

  // Delete an individual session from local history
  const handleDeleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = sessions.filter(s => s.id !== id);
    setSessions(updated);
    saveSessionsToStorage(updated);

    if (activeSessionId === id) {
      if (updated.length > 0) {
        handleSelectSession(updated[0]);
      } else {
        handleResetSession();
      }
    }
  };

  // Clear all saved history
  const handleClearAllSessions = () => {
    setSessions([]);
    saveSessionsToStorage([]);
    setActiveSessionId(null);
  };

  // Execute Turn 1 Analysis
  const handleInitiateAnalysis = async (payload: {
    companyName: string;
    industry: string;
    dilemma: string;
    uploadedDoc?: UploadedDocPayload;
    forcedFramework?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    setCurrentCompany(payload.companyName);
    setCurrentIndustry(payload.industry);
    setCurrentDilemma(payload.dilemma);
    setUploadedDoc(payload.uploadedDoc);
    setForcedFramework(payload.forcedFramework);
    setTurn(1);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: payload.companyName,
          industry: payload.industry,
          dilemma: payload.dilemma,
          uploadedDoc: payload.uploadedDoc,
          forcedFramework: payload.forcedFramework,
          turn: 1
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to convene executive committee.');
      }

      const data = await response.json();
      const newAnalysisData: AnalysisResponseData = {
        rawOutput: data.rawOutput,
        frameworksSelected: [data.parsed.frameworkSelected],
        diagnosticRationale: data.parsed.diagnosticRationale,
        searchQueries: data.searchQueries || [],
        citations: data.citations || [],
        meceBottleneck: data.parsed.meceBottleneck || [],
        strategistInitiative: data.parsed.strategistInitiative || '',
        adversarialCounter: data.parsed.adversarialCounter || '',
        optionA: data.parsed.optionA,
        optionB: data.parsed.optionB,
        turn: 1
      };

      setAnalysisData(newAnalysisData);
      setShowBriefingEditor(false);

      // Archive into local state sessions list
      const newSession: BoardroomSessionRecord = {
        id: `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        createdAt: Date.now(),
        companyName: payload.companyName,
        industry: payload.industry,
        dilemma: payload.dilemma,
        turn: 1,
        forcedFramework: payload.forcedFramework,
        data: newAnalysisData
      };

      const updated = [newSession, ...sessions.filter(s => s.id !== newSession.id)];
      setSessions(updated);
      saveSessionsToStorage(updated);
      setActiveSessionId(newSession.id);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Analysis failed. Please verify API configuration.');
    } finally {
      setIsLoading(false);
    }
  };

  // Execute Turn 2+ Steering Directive
  const handleSteeringDirective = async (directive: string) => {
    if (!analysisData) return;
    setIsLoading(true);
    setError(null);
    const nextTurn = turn + 1;

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: currentCompany,
          industry: currentIndustry,
          dilemma: currentDilemma,
          uploadedDoc: uploadedDoc,
          forcedFramework: forcedFramework,
          turn: nextTurn,
          steeringDirective: directive,
          previousOutput: analysisData.rawOutput
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to execute steering directive.');
      }

      const data = await response.json();
      setTurn(nextTurn);
      const updatedAnalysisData: AnalysisResponseData = {
        rawOutput: data.rawOutput,
        frameworksSelected: [data.parsed.frameworkSelected],
        diagnosticRationale: data.parsed.diagnosticRationale,
        searchQueries: data.searchQueries || [],
        citations: data.citations || [],
        meceBottleneck: data.parsed.meceBottleneck || [],
        strategistInitiative: data.parsed.strategistInitiative || '',
        adversarialCounter: data.parsed.adversarialCounter || '',
        optionA: data.parsed.optionA,
        optionB: data.parsed.optionB,
        turn: nextTurn
      };

      setAnalysisData(updatedAnalysisData);

      // Save new turn as a distinct record in local history
      const newTurnSession: BoardroomSessionRecord = {
        id: `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        createdAt: Date.now(),
        companyName: currentCompany,
        industry: currentIndustry,
        dilemma: currentDilemma,
        turn: nextTurn,
        forcedFramework: forcedFramework,
        data: updatedAnalysisData
      };

      const updated = [newTurnSession, ...sessions];
      setSessions(updated);
      saveSessionsToStorage(updated);
      setActiveSessionId(newTurnSession.id);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Steering execution failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSession = () => {
    setAnalysisData(null);
    setTurn(1);
    setError(null);
    setActiveSessionId(null);
    setShowBriefingEditor(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header */}
      <Header
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        onOpenFrameworksCatalog={() => setFrameworksModalOpen(true)}
        onOpenExport={() => {
          setExportTargetSession(null);
          setExportModalOpen(true);
        }}
        onOpenHistory={() => setHistoryDrawerOpen(true)}
        onResetSession={handleResetSession}
        turn={turn}
        hasAnalysis={!!analysisData}
        historyCount={sessions.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-800 text-xs text-rose-200 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-rose-400 hover:text-rose-100 text-xs font-mono font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Landing Hero & Briefing Dossier (When No Session Active or Editor Expanded) */}
        {(!analysisData || showBriefingEditor) && (
          <div className="space-y-6">
            {!analysisData && (
              <div className="text-center max-w-3xl mx-auto pt-4 pb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/50 text-cyan-300 text-xs font-mono mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Multi-Agent Executive Committee • Dynamic Framework Engine
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                  Executive Market Intelligence Platform
                </h1>
                <p className="mt-3 text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  Convene the <strong className="text-emerald-400">[Strategist Agent]</strong> and <strong className="text-rose-400">[Adversarial Agent]</strong>. 
                  Dynamically selects the surgical business framework from 12+ enterprise toolkits, backed by real-time Google Search grounding and PDF document ingestion.
                </p>

                {/* Key feature chips */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs font-mono">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                    <Search className="w-3.5 h-3.5 text-cyan-400" /> Live Web Grounding
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" /> 12+ Global Frameworks
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                    <Swords className="w-3.5 h-3.5 text-rose-400" /> Agentic Debate Arena
                  </span>
                  {sessions.length > 0 && (
                    <button
                      onClick={() => setHistoryDrawerOpen(true)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 hover:text-cyan-100 transition-colors cursor-pointer"
                    >
                      <History className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{sessions.length} Past Sessions Archived</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Briefing Dossier Form */}
            <BriefingForm
              isLoading={isLoading}
              onAnalyze={handleInitiateAnalysis}
            />
          </div>
        )}

        {/* Active Analysis Dashboard */}
        {analysisData && (
          <div className="space-y-6">
            {/* Context Sticky Summary Bar */}
            <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 shadow-xl backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-slate-100">{currentCompany}</h2>
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/40">
                      {currentIndustry}
                    </span>
                    <span className="text-xs font-mono text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800/40">
                      Turn {turn} Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate max-w-xl font-mono mt-0.5">
                    {currentDilemma}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setHistoryDrawerOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 text-xs font-mono border border-slate-800 transition-colors flex items-center gap-1.5"
                  title="View past sessions history"
                >
                  <History className="w-3.5 h-3.5 text-cyan-400" />
                  <span>History ({sessions.length})</span>
                </button>
                <button
                  onClick={() => {
                    setExportTargetSession(null);
                    setExportModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 hover:text-cyan-100 text-xs font-mono font-medium border border-cyan-800/80 transition-colors flex items-center gap-1.5 shadow-sm"
                  title="Export analysis to Markdown, Structured Text, or JSON"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Export Dossier</span>
                </button>
                <button
                  onClick={() => setShowBriefingEditor(!showBriefingEditor)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono border border-slate-700/60 transition-colors"
                >
                  {showBriefingEditor ? 'Hide Dossier' : 'Edit Dossier / Attach PDF'}
                </button>
              </div>
            </div>

            {/* Render Selected View Mode */}
            {viewMode === 'virtual_tabs' ? (
              <VirtualTabsView
                rawOutput={analysisData.rawOutput}
                searchQueries={analysisData.searchQueries}
                citations={analysisData.citations}
                turn={turn}
                onOpenExport={() => {
                  setExportTargetSession(null);
                  setExportModalOpen(true);
                }}
              />
            ) : (
              <BoardroomCockpit
                data={analysisData}
                companyName={currentCompany}
                onOpenExport={() => {
                  setExportTargetSession(null);
                  setExportModalOpen(true);
                }}
              />
            )}

            {/* Human-in-the-Loop Steering Console */}
            <SteeringConsole
              turn={turn}
              isLoading={isLoading}
              onSubmitDirective={handleSteeringDirective}
            />
          </div>
        )}
      </main>

      {/* Slide-out History Panel */}
      <HistoryDrawer
        isOpen={historyDrawerOpen}
        onClose={() => setHistoryDrawerOpen(false)}
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={handleSelectSession}
        onDeleteSession={handleDeleteSession}
        onClearAllSessions={handleClearAllSessions}
        onStartNewSession={handleResetSession}
        onExportSession={(session) => {
          setExportTargetSession(session);
          setExportModalOpen(true);
        }}
      />

      {/* Frameworks Catalog Modal */}
      <FrameworksModal
        isOpen={frameworksModalOpen}
        onClose={() => setFrameworksModalOpen(false)}
        onSelectFramework={(name) => {
          setForcedFramework(name);
        }}
      />

      {/* Export Boardroom Dossier Modal */}
      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => {
          setExportModalOpen(false);
          setExportTargetSession(null);
        }}
        data={exportTargetSession ? exportTargetSession.data : analysisData}
        metadata={{
          companyName: exportTargetSession ? exportTargetSession.companyName : currentCompany,
          industry: exportTargetSession ? exportTargetSession.industry : currentIndustry,
          dilemma: exportTargetSession ? exportTargetSession.dilemma : currentDilemma,
          turn: exportTargetSession ? exportTargetSession.turn : turn
        }}
      />
    </div>
  );
}

