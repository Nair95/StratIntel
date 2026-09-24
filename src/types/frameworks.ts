/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type FrameworkCategory = 
  | 'Macro/Market Assessment'
  | 'Growth & Product Strategy'
  | 'Execution & Operations'
  | 'Financial Strategy';

export interface FrameworkDefinition {
  id: string;
  name: string;
  category: FrameworkCategory;
  tagline: string;
  description: string;
  typicalTrigger: string;
  components: string[];
  visualType: 'five_forces' | 'matrix_2x2' | 'pestle' | 'value_chain' | 'mece_tree' | 'dupont' | 'unit_econ' | 'blue_ocean';
}

export const ENTERPRISE_FRAMEWORKS: FrameworkDefinition[] = [
  // Macro/Market Assessment
  {
    id: 'porters_five_forces',
    name: "Porter's Five Forces",
    category: 'Macro/Market Assessment',
    tagline: 'Industry structural attractiveness & profit pools',
    description: 'Evaluates competitive rivalry, supplier leverage, buyer bargaining power, threat of substitutes, and barriers to new entry to diagnose margin compression.',
    typicalTrigger: 'Erosion of industry profit margins, commoditization, or aggressive cross-industry encroachment.',
    components: ['Competitive Rivalry', 'Threat of New Entrants', 'Bargaining Power of Buyers', 'Bargaining Power of Suppliers', 'Threat of Substitutes'],
    visualType: 'five_forces'
  },
  {
    id: 'pestle',
    name: 'PESTLE Analysis',
    category: 'Macro/Market Assessment',
    tagline: 'Exogenous macro-environmental vectors',
    description: 'Systematically assesses Political, Economic, Social, Technological, Legal, and Environmental vectors reshaping the macro operational landscape.',
    typicalTrigger: 'Geopolitical upheaval, regulatory crackdowns, supply chain localization mandates, or sweeping tech disruptions (e.g. Generative AI).',
    components: ['Political', 'Economic', 'Sociocultural', 'Technological', 'Legal & Regulatory', 'Environmental'],
    visualType: 'pestle'
  },
  {
    id: 'blue_ocean',
    name: 'Blue Ocean Strategy (Strategy Canvas & ERRC)',
    category: 'Macro/Market Assessment',
    tagline: 'Value innovation & uncontested market space',
    description: 'Deploys the Eliminate-Reduce-Raise-Create (ERRC) grid to break the value-cost trade-off and unlock uncontested market demand.',
    typicalTrigger: 'Bloody red-ocean price wars, feature parity traps, and stagnating industry growth.',
    components: ['Eliminate (Cost drivers)', 'Reduce (Over-engineered factors)', 'Raise (Customer friction reducers)', 'Create (Novel industry factors)'],
    visualType: 'blue_ocean'
  },

  // Growth & Product Strategy
  {
    id: 'ansoff_matrix',
    name: 'Ansoff Growth Matrix',
    category: 'Growth & Product Strategy',
    tagline: 'Market vs Product growth trajectory mapping',
    description: 'Categorizes strategic growth vectors into Market Penetration, Market Development, Product Development, and Diversification.',
    typicalTrigger: 'Core product maturity, TAM exhaustion, or international expansion dilemmas.',
    components: ['Market Penetration (Existing/Existing)', 'Product Development (New/Existing)', 'Market Development (Existing/New)', 'Diversification (New/New)'],
    visualType: 'matrix_2x2'
  },
  {
    id: 'bcg_matrix',
    name: 'BCG Growth-Share Matrix',
    category: 'Growth & Product Strategy',
    tagline: 'Corporate portfolio capital allocation',
    description: 'Maps strategic business units across Market Growth Rate and Relative Market Share (Stars, Cash Cows, Question Marks, Dogs).',
    typicalTrigger: 'Multi-business unit conglomerate with cross-subsidization and capital allocation friction.',
    components: ['Stars (High Growth, High Share)', 'Cash Cows (Low Growth, High Share)', 'Question Marks (High Growth, Low Share)', 'Dogs (Low Growth, Low Share)'],
    visualType: 'matrix_2x2'
  },
  {
    id: 'mckinsey_7s',
    name: 'McKinsey 7S Framework',
    category: 'Growth & Product Strategy',
    tagline: 'Organizational alignment & strategy coherence',
    description: 'Analyzes alignment between Hard Elements (Strategy, Structure, Systems) and Soft Elements (Shared Values, Style, Staff, Skills).',
    typicalTrigger: 'Failed post-merger integration, strategic reorganization inertia, or execution paralysis.',
    components: ['Strategy', 'Structure', 'Systems', 'Shared Values', 'Style', 'Staff', 'Skills'],
    visualType: 'mece_tree'
  },
  {
    id: 'jobs_to_be_done',
    name: 'Jobs-to-be-Done (JTBD)',
    category: 'Growth & Product Strategy',
    tagline: 'Customer underlying progress & hiring criteria',
    description: 'Identifies the functional, emotional, and social jobs customers hire products to accomplish, cutting through vanity demographic metrics.',
    typicalTrigger: 'Customer churn despite feature releases, misaligned product roadmaps, or disruptive stealth substitutes.',
    components: ['Functional Job', 'Emotional & Social Job', 'Struggling Moments', 'Anxieties & Habits of Present'],
    visualType: 'value_chain'
  },

  // Execution & Operations
  {
    id: 'value_chain',
    name: "Porter's Value Chain Analysis",
    category: 'Execution & Operations',
    tagline: 'Cost-driver decomposition & competitive differentiation',
    description: 'Dissects primary activities (Inbound Logistics, Operations, Outbound, Marketing/Sales, Service) and support activities to pinpoint margin leakage.',
    typicalTrigger: 'Supply chain vulnerability, margin degradation, or manufacturing vs outsourcing dilemmas.',
    components: ['Inbound Logistics', 'Operations & Manufacturing', 'Outbound Fulfillment', 'Marketing & Sales', 'Customer Support & Service'],
    visualType: 'value_chain'
  },
  {
    id: 'mece_breakdown',
    name: 'MECE Structural Issue Tree',
    category: 'Execution & Operations',
    tagline: 'Mutually Exclusive, Collectively Exhaustive root causes',
    description: 'Hierarchical deductive breakdown guaranteeing zero analytical overlap and 100% problem coverage.',
    typicalTrigger: 'Complex multidimensional performance crisis where symptoms obscure root structural failure.',
    components: ['Top-Line Revenue Drivers', 'Variable Cost Levers', 'Fixed Overhead Inefficiencies', 'Capital Efficiency Barriers'],
    visualType: 'mece_tree'
  },
  {
    id: 'core_competency',
    name: 'Core Competency Mapping (Prahalad & Hamel)',
    category: 'Execution & Operations',
    tagline: 'Defensible crown-jewel capabilities',
    description: 'Evaluates whether operational capabilities are rare, inimitable, non-substitutable, and provide access to wide variety of future markets.',
    typicalTrigger: 'Threat of being commoditized by hyperscalers or deciding whether to build vs partner vs buy.',
    components: ['Access to Wide Variety of Markets', 'Customer-Perceived Value Contribution', 'Difficult for Competitors to Imitate'],
    visualType: 'five_forces'
  },

  // Financial Strategy
  {
    id: 'dupont_analysis',
    name: 'DuPont ROE Deconstruction',
    category: 'Financial Strategy',
    tagline: 'Return on Equity levers (Margin x Turnover x Leverage)',
    description: 'Deconstructs Return on Equity into Net Profit Margin (Operating Efficiency), Asset Turnover (Asset Utilization), and Financial Leverage multiplier.',
    typicalTrigger: 'Lagging shareholder returns, activist investor campaigns, or balance sheet re-capitalization decisions.',
    components: ['Net Profit Margin (Efficiency)', 'Asset Turnover (Velocity)', 'Equity Multiplier (Financial Leverage)', 'Return on Equity (ROE)'],
    visualType: 'dupont'
  },
  {
    id: 'unit_economics_ltv_cac',
    name: 'Unit Economics / LTV-CAC Matrix',
    category: 'Financial Strategy',
    tagline: 'Cohort scalability, payback velocity & churn drag',
    description: 'Stress-tests Customer Acquisition Cost (CAC), Lifetime Value (LTV), Payback Period, Net Revenue Retention (NRR), and Gross Margins under scale.',
    typicalTrigger: 'Unprofitable hypergrowth, slowing cohort payback, or shifting from venture-funded growth to GAAP cash-flow generation.',
    components: ['CAC Payback Period', 'LTV/CAC Ratio (>3x Benchmark)', 'Gross Margin Floor', 'Net Revenue Retention (NRR)'],
    visualType: 'unit_econ'
  },
  {
    id: 'capital_allocation',
    name: 'Capital Allocation Framework (Mauboussin)',
    category: 'Financial Strategy',
    tagline: 'Organic reinvestment vs M&A vs Dividends vs Buybacks',
    description: 'Disciplined framework evaluating ROIC vs WACC across organic Capex, strategic R&D, programmatic M&A, share repurchases, and debt paydown.',
    typicalTrigger: 'Large cash balances with no clear ROIC hurdle, or overleveraged balance sheets amidst elevated interest rate environments.',
    components: ['Organic Capex & R&D (ROIC > WACC)', 'M&A Pipeline Discipline', 'Debt Optimization & Rating Defense', 'Shareholder Return (Buybacks/Dividends)'],
    visualType: 'dupont'
  }
];

export interface ExecutiveScenario {
  id: string;
  companyName: string;
  ticker?: string;
  industry: string;
  dilemma: string;
  summary: string;
  keyMetrics: Record<string, string>;
  recommendedFrameworks: string[];
}

export const PRELOADED_SCENARIOS: ExecutiveScenario[] = [
  {
    id: 'intel_crisis',
    companyName: 'Intel Corporation',
    ticker: 'NASDAQ: INTC',
    industry: 'Semiconductors & Foundry Systems',
    dilemma: 'Should Intel spin off Intel Foundry Services (IFS) into an independent entity, or double down on IDM 2.0 while hyperscalers (Amazon, Google, Microsoft) design custom ASICs and TSMC dominates sub-3nm packaging?',
    summary: 'Intel faces severe cash burn from multi-billion foundry buildouts, declining x86 datacenter share to AMD, and absence from leading AI accelerator training clusters.',
    keyMetrics: {
      'Foundry Operating Loss': '-$7B+ annual burn',
      'x86 Server Share': 'Fell from ~95% to ~71%',
      'TSMC Advanced Packaging': '>85% market monopoly'
    },
    recommendedFrameworks: ["Porter's Five Forces", 'DuPont ROE Deconstruction', 'Capital Allocation Framework']
  },
  {
    id: 'boeing_overhaul',
    companyName: 'The Boeing Company',
    ticker: 'NYSE: BA',
    industry: 'Aerospace & Defense Commercial Aviation',
    dilemma: 'How should Boeing re-engineer its fragmented tiered supply chain (Spirit AeroSystems reintegration), resolve FAA safety caps on 737 MAX production rates, and service $50B+ debt burden while Airbus captures single-aisle market share?',
    summary: 'Operational delivery halts, negative free cash flow, credit rating near non-investment grade, and fierce competition from Airbus A321neo / XLR.',
    keyMetrics: {
      'Total Debt Load': '>$52 Billion',
      'Single-Aisle Order Backlog': 'Airbus leads 62% to 38%',
      'FAA Rate Cap': 'Restricted at 38/month on 737'
    },
    recommendedFrameworks: ["Porter's Value Chain Analysis", 'MECE Structural Issue Tree', 'Capital Allocation Framework']
  },
  {
    id: 'nike_realignment',
    companyName: 'Nike, Inc.',
    ticker: 'NYSE: NKE',
    industry: 'Athletic Footwear & Consumer Apparel',
    dilemma: 'Should Nike reverse its aggressive direct-to-consumer (DTC) pivot and restore wholesale retailer shelf-space (Foot Locker, Dick’s), while fighting market share erosion against high-growth challengers On Running, Hoka, and Lululemon?',
    summary: 'Nike cut off key wholesale partners to prioritize Nike Direct and app sales, resulting in lost shelf dominance, high promotional discounting, and stagnation in performance running innovation.',
    keyMetrics: {
      'Running Shoe Market Share': '-380 bps year-over-year',
      'Direct-to-Consumer Margin': 'Diluted by shipping & returns',
      'Wholesale Relationship Deficit': 'Loss of primary wall presence'
    },
    recommendedFrameworks: ['Ansoff Growth Matrix', 'Jobs-to-be-Done (JTBD)', 'Unit Economics / LTV-CAC Matrix']
  },
  {
    id: 'disney_streaming',
    companyName: 'The Walt Disney Company',
    ticker: 'NYSE: DIS',
    industry: 'Media, Streaming & Entertainment',
    dilemma: 'How to manage the steep structural decline and cash flow erosion of linear cable networks (ESPN, ABC, Disney Channel) while scaling Disney+ / Hulu to sustained double-digit operating margins against Netflix and YouTube?',
    summary: 'Accelerating cord-cutting destroys legacy cash cows, sports rights inflation strains margins, and park capital expenditures face higher hurdle rates.',
    keyMetrics: {
      'Linear Pay-TV Churn': '-8% annual cord-cutting',
      'Direct-to-Consumer Margin': 'Breakeven to low single-digit',
      'Sports Rights Inflation': '+12-15% per renewal cycle'
    },
    recommendedFrameworks: ['BCG Growth-Share Matrix', 'Blue Ocean Strategy (Strategy Canvas & ERRC)', 'DuPont ROE Deconstruction']
  }
];

export interface SearchCitation {
  title: string;
  url: string;
  snippet?: string;
}

export interface AnalysisResponseData {
  rawOutput: string;
  frameworksSelected: string[];
  diagnosticRationale: string;
  searchQueries: string[];
  citations: SearchCitation[];
  meceBottleneck: string[];
  strategistInitiative: string;
  adversarialCounter: string;
  optionA: {
    title: string;
    hypothesis: string;
    executionVectors: string[];
  };
  optionB: {
    title: string;
    hypothesis: string;
    executionVectors: string[];
  };
  optionC?: {
    title: string;
    hypothesis: string;
    executionVectors: string[];
  };
  turn: number;
  groundingStatus?: 'active' | 'quota_fallback' | 'internal_knowledge';
  groundingNotice?: string;
}

export interface BoardroomSessionRecord {
  id: string;
  timestamp: string;
  createdAt: number;
  companyName: string;
  industry: string;
  dilemma: string;
  turn: number;
  forcedFramework?: string;
  data: AnalysisResponseData;
}
