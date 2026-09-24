/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  History, 
  Trash2, 
  ChevronRight, 
  Building2, 
  CheckCircle2, 
  Layers, 
  Download, 
  PlusCircle, 
  Search,
  Sparkles,
  ArrowRight,
  Clock
} from 'lucide-react';
import { BoardroomSessionRecord } from '../types/frameworks.ts';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: BoardroomSessionRecord[];
  activeSessionId: string | null;
  onSelectSession: (session: BoardroomSessionRecord) => void;
  onDeleteSession: (id: string, e: React.MouseEvent) => void;
  onClearAllSessions: () => void;
  onStartNewSession: () => void;
  onExportSession?: (session: BoardroomSessionRecord) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  sessions,
  activeSessionId,
  onSelectSession,
  onDeleteSession,
  onClearAllSessions,
  onStartNewSession,
  onExportSession
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmClear, setConfirmClear] = useState(false);

  if (!isOpen) return null;

  const filteredSessions = sessions.filter(s => 
    s.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.dilemma.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.data.frameworksSelected.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  Session History
                  <span className="text-xs font-mono font-normal bg-slate-800 text-cyan-300 px-2 py-0.5 rounded-full border border-slate-700">
                    {sessions.length}
                  </span>
                </h2>
                <p className="text-[11px] text-slate-400 font-mono">
                  Switch between past boardroom analyses
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action Ribbon & Search */}
          <div className="p-4 border-b border-slate-800/80 bg-slate-950/40 space-y-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onStartNewSession();
                  onClose();
                }}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-mono font-bold shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>New Executive Session</span>
              </button>

              {sessions.length > 0 && (
                confirmClear ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        onClearAllSessions();
                        setConfirmClear(false);
                      }}
                      className="px-2.5 py-2 rounded-xl bg-rose-950 text-rose-300 hover:bg-rose-900 border border-rose-800 text-xs font-mono transition-colors font-bold"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setConfirmClear(false)}
                      className="px-2 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmClear(true)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors"
                    title="Clear All History"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )
              )}
            </div>

            {sessions.length > 2 && (
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter sessions by company, industry, or framework..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            )}
          </div>

          {/* Session Cards List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredSessions.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center mx-auto mb-3 text-slate-500">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-300 mb-1">
                  {searchTerm ? 'No Matching Sessions' : 'No History Recorded'}
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed font-sans">
                  {searchTerm 
                    ? 'No previous boardroom sessions match your search filter.' 
                    : 'Whenever you convene the executive committee or submit a steering directive, your session is saved here for offline review.'}
                </p>
              </div>
            ) : (
              filteredSessions.map((session) => {
                const isActive = session.id === activeSessionId;
                const framework = session.data.frameworksSelected?.[0] || 'Dynamic Framework';

                return (
                  <div
                    key={session.id}
                    onClick={() => {
                      onSelectSession(session);
                      onClose();
                    }}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative group flex flex-col justify-between ${
                      isActive
                        ? 'bg-slate-950/90 border-cyan-500/70 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400/30'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-950/90'
                    }`}
                  >
                    <div>
                      {/* Top metadata tags */}
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {session.timestamp}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800/50 px-1.5 py-0.5 rounded">
                            Turn {session.turn}
                          </span>

                          {isActive && (
                            <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800/60 px-1.5 py-0.5 rounded font-bold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Active
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Company & Industry */}
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                          <span className="truncate">{session.companyName}</span>
                        </h4>
                      </div>

                      <p className="text-[11px] text-slate-400 truncate mb-2 font-mono">
                        {session.industry}
                      </p>

                      {/* Framework badge */}
                      <div className="mb-2">
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-indigo-300 bg-indigo-950/70 border border-indigo-900/40 px-2 py-0.5 rounded">
                          <Layers className="w-2.5 h-2.5 text-indigo-400" />
                          <span className="truncate">{framework}</span>
                        </span>
                      </div>

                      {/* Dilemma excerpt */}
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-sans mb-3">
                        {session.dilemma}
                      </p>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        {onExportSession && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onExportSession(session);
                            }}
                            className="p-1 rounded text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors flex items-center gap-1 text-[11px]"
                            title="Export this session"
                          >
                            <Download className="w-3 h-3 text-cyan-400" />
                            <span>Export</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={(e) => onDeleteSession(session.id, e)}
                          className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors text-[11px]"
                          title="Delete from history"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1 text-cyan-400 group-hover:translate-x-0.5 transition-transform text-[11px]">
                        <span>{isActive ? 'Currently Loaded' : 'Restore Session'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/90 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Persisted in local browser storage
            </span>
            <button
              onClick={onClose}
              className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
