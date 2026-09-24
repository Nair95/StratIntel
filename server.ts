/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { ENTERPRISE_FRAMEWORKS } from "./src/types/frameworks.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Initialize Gemini API client with required User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Endpoint: Catalog of Enterprise Frameworks
app.get("/api/frameworks", (_req, res) => {
  res.json({ frameworks: ENTERPRISE_FRAMEWORKS });
});

// Helper to parse sections from the structured model output
function parseStructuredOutput(text: string) {
  // Extract Selected Framework
  const frameworkMatch = text.match(/###\s*🛠\s*Selected Framework:\s*([^\n\r]+)/i);
  const frameworkSelected = frameworkMatch ? frameworkMatch[1].trim() : "Porter's Five Forces & DuPont Analysis";

  // Extract Diagnostic Rationale
  const rationaleMatch = text.match(/\*\s*\*\*Diagnostic Rationale:\*\*\s*([^\n\r]+)/i);
  const diagnosticRationale = rationaleMatch ? rationaleMatch[1].trim() : "Dynamically selected to isolate systemic margin erosion and structural bottlenecks.";

  // Extract Strategist Agent Formulation
  const strategistMatch = text.match(/\*\s*\*\*\[Strategist Agent Formulation\]:\*\*\s*([\s\S]*?)(?=\*\s*\*\*\[Adversarial Agent Counter\]|\n###|\n<\/details>)/i);
  const strategistInitiative = strategistMatch ? strategistMatch[1].trim() : "Drive high-alpha pivot into differentiated vertical capabilities with capital-light scaling.";

  // Extract Adversarial Agent Counter
  const adversarialMatch = text.match(/\*\s*\*\*\[Adversarial Agent Counter\]:\*\*\s*([\s\S]*?)(?=\n<\/details>|\n---|\n###)/i);
  const adversarialCounter = adversarialMatch ? adversarialMatch[1].trim() : "Severe exposure to counterparty retaliation, capital-burn headwinds, and execution drag.";

  // Extract Option A
  const optionAMatch = text.match(/\*\s*\*\*Option A:\s*([^*]+?)\*\*([\s\S]*?)(?=\*\s*\*\*Option B|\n👉|\n---|$)/i);
  let optionATitle = "Aggressive Market Dominance";
  let optionAHypothesis = "Scale defensible moat and capture high-margin segment.";
  let optionAVectors: string[] = [];

  if (optionAMatch) {
    optionATitle = optionAMatch[1].trim();
    const hypMatch = optionAMatch[2].match(/\*Strategic Hypothesis:\*\s*([^\n\r]+)/i);
    if (hypMatch) optionAHypothesis = hypMatch[1].trim();
    const vecMatch = optionAMatch[2].match(/\*Execution Vectors:\*\s*([\s\S]*?)(?=\n\s*\*|\n👉|$)/i);
    if (vecMatch) {
      optionAVectors = vecMatch[1]
        .split(/\n-|\n\s*\d+\.|\n\*/)
        .map(v => v.trim())
        .filter(v => v.length > 5);
    }
  }

  // Extract Option B
  const optionBMatch = text.match(/\*\s*\*\*Option B:\s*([^*]+?)\*\*([\s\S]*?)(?=\*\s*\*\*Option C|\n👉|\n---|$)/i);
  let optionBTitle = "Risk-Mitigated Defensive Hedge";
  let optionBHypothesis = "Preserve balance sheet liquidity and protect core profit pool.";
  let optionBVectors: string[] = [];

  if (optionBMatch) {
    optionBTitle = optionBMatch[1].trim();
    const hypMatch = optionBMatch[2].match(/\*Strategic Hypothesis:\*\s*([^\n\r]+)/i);
    if (hypMatch) optionBHypothesis = hypMatch[1].trim();
    const vecMatch = optionBMatch[2].match(/\*Execution Vectors:\*\s*([\s\S]*?)(?=\n\s*\*|\n👉|$)/i);
    if (vecMatch) {
      optionBVectors = vecMatch[1]
        .split(/\n-|\n\s*\d+\.|\n\*/)
        .map(v => v.trim())
        .filter(v => v.length > 5);
    }
  }

  // Extract MECE Breakdown points
  const meceMatch = text.match(/###\s*🎯\s*Core Structural Challenge \(MECE\)([\s\S]*?)(?=\n<\/details>)/i);
  let meceBottleneck: string[] = [];
  if (meceMatch) {
    meceBottleneck = meceMatch[1]
      .split(/\n\s*[\*\-]/)
      .map(item => item.trim())
      .filter(item => item.length > 10);
  }

  return {
    frameworkSelected,
    diagnosticRationale,
    strategistInitiative,
    adversarialCounter,
    meceBottleneck,
    optionA: {
      title: optionATitle,
      hypothesis: optionAHypothesis,
      executionVectors: optionAVectors.length ? optionAVectors : ["Phase 1: Immediate cost optimization and balance sheet containment", "Phase 2: R&D re-allocation to high-ROIC products", "Phase 3: Strategic commercial re-alignment"]
    },
    optionB: {
      title: optionBTitle,
      hypothesis: optionBHypothesis,
      executionVectors: optionBVectors.length ? optionBVectors : ["Phase 1: Protect core cash cow operations", "Phase 2: Establish joint ventures or licensing hedge", "Phase 3: Contingency capital readiness"]
    }
  };
}

// Endpoint: Multi-Agent Executive Analysis with Google Search Grounding & Document Ingestion
app.post("/api/analyze", async (req, res) => {
  try {
    const {
      companyName,
      industry,
      dilemma,
      uploadedDoc, // { fileName, fileType, base64Data, textContent }
      turn = 1,
      steeringDirective,
      previousOutput,
      forcedFramework
    } = req.body;

    if (!companyName || !dilemma) {
      return res.status(400).json({ error: "Company name and strategic dilemma are required." });
    }

    const systemInstruction = `You are an elite, battle-tested Market Intelligence Platform staffed by a multi-agent executive committee:
1. [Strategist Agent]: Chief Strategy Officer & Head of Corporate Development. Champions bold, high-alpha offensive growth vectors, structural transformations, capital redeployment, and competitive leapfrogging.
2. [Adversarial Agent]: Red Team Lead, Skeptical Capital Allocator, & Chief Risk Officer. Aggressively interrogates assumptions, stress-tests balance sheet vulnerability, exposes macroeconomic and regulatory friction, and weaponizes live market data and competitor counter-attacks.

FRAMEWORK DYNAMIC SELECTION ENGINE:
You must NOT rely on a single default framework. Analyze the company's core dilemma, industry context, and uploaded materials, then dynamically select and enforce the 1 or 2 most suitable strategic frameworks from the global enterprise toolkit:
- Macro/Market Assessment: Porter's Five Forces, PESTLE, Blue Ocean Strategy Matrix.
- Growth & Product Strategy: Ansoff Matrix, BCG Matrix, McKinsey 7S, Jobs-to-be-Done (JTBD).
- Execution & Operations: Value Chain Analysis, MECE Breakdown, Core Competency Mapping.
- Financial Strategy: DuPont Analysis, Unit Economics/LTV-CAC Matrix, Capital Allocation Framework.

${forcedFramework ? `Note: The executive user requested focus on: "${forcedFramework}".` : ''}

CRITICAL UI FORMATTING RULE (VIRTUAL TABS):
You must STRICTLY structure your entire output using this exact HTML block layout so the user can interact with the stream like a tabbed application:

<details open>
<summary>📊 <b>[TAB 1: DYNAMIC MARKET INSIGHTS]</b> (Click to expand/collapse)</summary>

### 🛠 Selected Framework: [Insert Name of Selected Framework(s)]
* **Diagnostic Rationale:** [State in 1 crisp sentence why this specific framework is the most suitable diagnostic tool for this company's exact business dilemma.]

### 🔍 Environment Diagnosis & Grounding
[Execute precise Google Search queries here to fetch live market parameters, competitor status, recent quarterly figures, and industry benchmarks. Merge this real data with insights parsed from the company briefing / uploaded documents to flesh out the framework components thoroughly with specific numbers, competitors, and trends.]

### 🎯 Core Structural Challenge (MECE)
* [Provide a clean, Mutually Exclusive, Collectively Exhaustive (MECE) breakdown of the target company's primary existential bottleneck based on the framework analysis. Include 3-4 distinct structural pillars.]
</details>

<details open>
<summary>⚔️ <b>[TAB 2: AGENTIC DEBATE ARENA]</b> (Click to expand/collapse)</summary>

### Multi-Agent Crossfire
* **[Strategist Agent Formulation]:** [Propose an aggressive strategic initiative designed to solve the challenge highlighted by your chosen framework. Quantify expected upside, capital reallocation, and market positioning.]
* **[Adversarial Agent Counter]:** [Immediately challenge the strategist. Weaponize external risk factors, macro headwinds, cash-burn velocity, or competitor retaliations found via live Google Search queries to expose the strategy's fatal blindspots.]
</details>

---

### 💡 [TAB 3: STRATEGIC SOLUTIONS & OPTIONS]
* **Option A: [Core Pivot Title]**
  - *Strategic Hypothesis:* [Why this works based on insights and competitive dynamics]
  - *Execution Vectors:* [Actionable, phased roadmap steps with timelines and KPI gates]
* **Option B: [Alternative Hedges]**
  - *Strategic Hypothesis:* [Risk-mitigated alternative preserving liquidity or downside protection]
  - *Execution Vectors:* [Phased hedge execution steps]
* **Option C: [Asymmetric Opportunity / Optionality]**
  - *Strategic Hypothesis:* [Contingency or high-optionality move if macro conditions pivot]
  - *Execution Vectors:* [Actionable triggers and execution vectors]

👉 **[HUMAN-IN-THE-LOOP INTERVENTION]:**
Please provide your strategic steering directive below. Do you back the Strategist, reinforce the Adversary, or pivot the blueprint entirely?

OPERATIONAL PROCESS:
- Turn 1: Analyze company briefing and uploaded documents, dynamically select the framework, populate all three virtual tabs, and leave the Agentic Debate Arena active.
- Turn 2+: Update the interface tabs as the human inputs steering data, incorporating the human directive into the debate, stress-testing the chosen direction, and refining Tab 3 into boardroom-grade strategic options.`;

    // Construct prompt contents
    const contents: any[] = [];

    // Add user briefing text
    let userPromptText = `EXECUTIVE BRIEFING FOR COMMITTEE REVIEW:
Target Company: ${companyName}
Industry / Sector: ${industry || "Enterprise Corporate Strategy"}
Strategic Dilemma / Situation: ${dilemma}
Current Operational Turn: Turn ${turn}
`;

    if (steeringDirective) {
      userPromptText += `\n[HUMAN-IN-THE-LOOP EXECUTIVE DIRECTIVE]: "${steeringDirective}"\nRefine the analysis and strategic options according to this directive while continuing the multi-agent debate.\n`;
    }

    if (previousOutput && turn > 1) {
      userPromptText += `\nPREVIOUS COMMITTEE OUTPUT TO REFINE:\n${previousOutput}\n`;
    }

    contents.push({ text: userPromptText });

    // Ingest uploaded document if present
    if (uploadedDoc && uploadedDoc.base64Data && uploadedDoc.fileType) {
      contents.push({
        inlineData: {
          mimeType: uploadedDoc.fileType,
          data: uploadedDoc.base64Data
        }
      });
      contents.push({
        text: `Analyze the attached file (${uploadedDoc.fileName}). Extract critical quantitative data, margin structures, balance sheet pressure, or customer churn metrics to ground your chosen framework and multi-agent debate.`
      });
    } else if (uploadedDoc && uploadedDoc.textContent) {
      contents.push({
        text: `ATTACHED DOCUMENT TEXT CONTENT (${uploadedDoc.fileName}):\n${uploadedDoc.textContent.slice(0, 30000)}`
      });
    }

    // Call Gemini 3.8 Flash with Google Search Grounding tool
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        tools: [{ googleSearch: {} }],
      },
    });

    const rawOutput = response.text || "";

    // Extract search queries and grounding citations
    const candidate = response.candidates?.[0];
    const groundingMetadata = candidate?.groundingMetadata;
    const searchQueries: string[] = groundingMetadata?.webSearchQueries || [];
    
    const citations: Array<{ title: string; url: string; snippet?: string }> = [];
    if (groundingMetadata?.groundingChunks) {
      for (const chunk of groundingMetadata.groundingChunks) {
        if (chunk.web?.uri) {
          citations.push({
            title: chunk.web.title || "Market Intelligence Source",
            url: chunk.web.uri,
            snippet: ""
          });
        }
      }
    }

    // Parse structured data for visual components
    const parsedData = parseStructuredOutput(rawOutput);

    res.json({
      rawOutput,
      searchQueries,
      citations,
      turn,
      parsed: {
        ...parsedData,
        searchQueries,
        citations
      }
    });
  } catch (error: any) {
    console.error("Error executing multi-agent executive analysis:", error);
    res.status(500).json({
      error: error?.message || "Failed to execute executive committee analysis",
      details: String(error)
    });
  }
});

// Setup Vite middleware in dev or static files in production
if (process.env.NODE_ENV !== "production") {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static("dist"));
  app.get("*", (_req, res) => {
    res.sendFile(path.resolve("dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`StratIntel Executive Platform running on http://0.0.0.0:${PORT}`);
});
