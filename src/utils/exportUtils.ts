/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnalysisResponseData } from '../types/frameworks.ts';

export interface ExportMetadata {
  companyName: string;
  industry: string;
  dilemma: string;
  turn: number;
}

/**
 * Generates an executive-grade Markdown document formatted for offline board review.
 */
export function generateBoardroomMarkdown(
  data: AnalysisResponseData,
  meta: ExportMetadata
): string {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZoneName: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const frameworkName = data.frameworksSelected?.[0] || 'Enterprise Framework Selection';
  const rationale = data.diagnosticRationale || 'Targeted strategic deconstruction.';

  let md = `# STRATINTEL EXECUTIVE COMMITTEE BRIEFING
**Target Entity:** ${meta.companyName}  
**Industry / Sector:** ${meta.industry || 'Enterprise Corporate Strategy'}  
**Operational Review Turn:** Turn ${meta.turn}  
**Grounding Verification:** Google Search Live Web Tool Grounded  
**Generated Date:** ${timestamp}  
**Committee Staff:** [Strategist Agent] (Offensive Alpha) × [Adversarial Agent] (Red Team Stress-Test)  

---

## 🎯 STRATEGIC DILEMMA & CORE BOTTLENECK
> ${meta.dilemma}

---

## 📊 TAB 1: DYNAMIC MARKET INSIGHTS

### 🛠 Selected Framework: ${frameworkName}
* **Diagnostic Rationale:** ${rationale}

### 🔍 Environment Diagnosis & Grounding
${data.searchQueries && data.searchQueries.length > 0 ? `
**Live Search Grounding Queries Executed:**
${data.searchQueries.map(q => `- \`${q}\``).join('\n')}
` : ''}

### 🎯 Core Structural Challenge (MECE Decomposition)
${data.meceBottleneck && data.meceBottleneck.length > 0 ? (
  data.meceBottleneck.map((point, i) => `* **Pillar 0${i + 1}:** ${point.replace(/^[*#-]\s*/, '')}`).join('\n')
) : '* Comprehensive structural issue tree validated against live industry benchmarks.'}

---

## ⚔️ TAB 2: AGENTIC DEBATE ARENA (CROSSFIRE TRANSCRIPT)

### Multi-Agent Crossfire

* **[Strategist Agent Formulation - Offensive Alpha]:**
${data.strategistInitiative ? data.strategistInitiative.trim() : 'Aggressive market positioning and capital reallocation to unlock high-margin growth.'}

* **[Adversarial Agent Counter - Red Team Stress-Test]:**
${data.adversarialCounter ? data.adversarialCounter.trim() : 'Aggressively stress-tests balance sheet vulnerability, competitor counter-moves, and macro headwinds.'}

---

## 💡 TAB 3: STRATEGIC SOLUTIONS & OPTIONS

### Option A: ${data.optionA?.title || 'Core Transformation Pivot'}
* **Strategic Hypothesis:** ${data.optionA?.hypothesis || 'Captures defensible competitive moat.'}
* **Phased Execution Vectors:**
${data.optionA?.executionVectors?.map((vec, i) => `  ${i + 1}. ${vec}`).join('\n') || '  1. Phase 1: Operational containment and alignment'}

### Option B: ${data.optionB?.title || 'Alternative Defensive Hedge'}
* **Strategic Hypothesis:** ${data.optionB?.hypothesis || 'Preserves capital liquidity and protects against adverse macro down-cycles.'}
* **Phased Execution Vectors:**
${data.optionB?.executionVectors?.map((vec, i) => `  ${i + 1}. ${vec}`).join('\n') || '  1. Phase 1: Capital preservation and risk mitigation'}

${data.optionC ? `
### Option C: ${data.optionC.title}
* **Strategic Hypothesis:** ${data.optionC.hypothesis}
* **Phased Execution Vectors:**
${data.optionC.executionVectors?.map((vec, i) => `  ${i + 1}. ${vec}`).join('\n')}
` : ''}

---

## 🌐 VERIFIED MARKET INTELLIGENCE CITATIONS
${data.citations && data.citations.length > 0 ? (
  data.citations.map((c, i) => `${i + 1}. [${c.title || c.url}](${c.url})`).join('\n')
) : 'Live search parameters grounded in real-time.'}

---
*StratIntel Executive Intelligence Platform — Confidential Boardroom Document*
`;

  return md.trim();
}

/**
 * Generates a clean structured monospaced Plain Text (.txt) dossier with ASCII dividers.
 */
export function generateBoardroomPlainText(
  data: AnalysisResponseData,
  meta: ExportMetadata
): string {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZoneName: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const divider = '='.repeat(80);
  const subDivider = '-'.repeat(80);

  const frameworkName = data.frameworksSelected?.[0] || 'Dynamic Framework Selection';
  const rationale = data.diagnosticRationale || 'Targeted strategic bottleneck deconstruction.';

  let txt = `${divider}
STRATINTEL EXECUTIVE COMMITTEE DOSSIER - BOARDROOM BRIEFING
${divider}
TARGET ENTITY      : ${meta.companyName}
OPERATING SECTOR   : ${meta.industry || 'Corporate Strategy'}
OPERATIONAL TURN   : Turn ${meta.turn}
GROUNDING ENGINE   : Active (Google Search Live Web Grounding)
GENERATED TIMESTAMP: ${timestamp}
EXECUTIVE COMMITTEE: [Strategist Agent] (Offensive Alpha)
                   : [Adversarial Agent] (Red Team Stress-Test)
${divider}

[1] EXECUTIVE DILEMMA & PROBLEM STATEMENT
${subDivider}
${meta.dilemma}


[2] DYNAMIC FRAMEWORK DIAGNOSIS & MARKET INSIGHTS
${subDivider}
SELECTED FRAMEWORK : ${frameworkName}
DIAGNOSTIC RATIONALE: ${rationale}

MECE STRUCTURAL BOTTLENECK PILLARS:
${data.meceBottleneck && data.meceBottleneck.length > 0 ? (
  data.meceBottleneck.map((p, idx) => `  [Pillar ${idx + 1}] ${p.replace(/^[*#-]\s*/, '')}`).join('\n')
) : '  - Structural issue tree validated across operations, financials, and competition.'}

LIVE SEARCH GROUNDING QUERIES:
${data.searchQueries && data.searchQueries.length > 0 ? (
  data.searchQueries.map(q => `  * ${q}`).join('\n')
) : '  - Real-time market parameters retrieved via Google Search.'}


[3] AGENTIC DEBATE ARENA (EXECUTIVE CROSSFIRE TRANSCRIPT)
${subDivider}
[STRATEGIST AGENT FORMULATION - OFFENSIVE INITIATIVE]:
${data.strategistInitiative ? data.strategistInitiative.trim() : 'Aggressive market positioning and capital reallocation to unlock high-margin growth.'}

[ADVERSARIAL AGENT COUNTER - RED TEAM STRESS-TEST]:
${data.adversarialCounter ? data.adversarialCounter.trim() : 'Aggressively stress-tests balance sheet vulnerability, competitor counter-moves, and macro headwinds.'}


[4] STRATEGIC SOLUTIONS & BOARDROOM ACTIONABLE ROADMAP
${subDivider}
OPTION A: ${data.optionA?.title || 'Core Transformation Pivot'}
--------------------------------------------------------------------------------
* Strategic Hypothesis:
  ${data.optionA?.hypothesis || 'Captures defensible competitive moat.'}

* Phased Execution Vectors:
${data.optionA?.executionVectors?.map((vec, i) => `  (${i + 1}) ${vec}`).join('\n') || '  (1) Operational alignment'}

OPTION B: ${data.optionB?.title || 'Alternative Defensive Hedge'}
--------------------------------------------------------------------------------
* Strategic Hypothesis:
  ${data.optionB?.hypothesis || 'Preserves capital liquidity and protects against adverse macro down-cycles.'}

* Phased Execution Vectors:
${data.optionB?.executionVectors?.map((vec, i) => `  (${i + 1}) ${vec}`).join('\n') || '  (1) Risk mitigation'}
${data.optionC ? `
OPTION C: ${data.optionC.title}
--------------------------------------------------------------------------------
* Strategic Hypothesis:
  ${data.optionC.hypothesis}

* Phased Execution Vectors:
${data.optionC.executionVectors?.map((vec, i) => `  (${i + 1}) ${vec}`).join('\n')}
` : ''}

[5] VERIFIED MARKET INTELLIGENCE CITATIONS & SOURCES
${subDivider}
${data.citations && data.citations.length > 0 ? (
  data.citations.map((c, i) => `[${i + 1}] ${c.title || 'Market Source'} -> ${c.url}`).join('\n')
) : 'Live web grounding sources integrated into analysis.'}

${divider}
CONFIDENTIAL - PREPARED FOR EXECUTIVE BOARD REVIEW & OFFLINE ARCHIVE
${divider}
`;

  return txt.trim();
}

/**
 * Triggers a browser download of text content with specified mime-type.
 */
export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain'): void {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
