import { Diagram } from './types';

// Shared class for risk/exception nodes in Mermaid diagrams
const CLASSDEF = "classDef risk fill:#fff3cd,stroke:#f0ad4e,color:#8a6d3b;\n";

export const diagrams: Diagram[] = [
  // GROUP: DexCheck — System Architecture
  {
    id: "DC_SYS_01",
    group: "DexCheck — System Architecture",
    title: "Platform Overview (Use-Case)",
    code: `flowchart LR
  A1([Trader/Analyst])
  A2([Developer/Project])
  A3([Community Member])

  subgraph DC[DexCheck AI Platform]
    F1((Whale Tracker V2))
    F2((Smart Money Insights))
    F3((InsightsGPT))
    F4((KOL Performance Index))
    F5((Staking & Governance))
    F6((B2B Data API))
  end

  A1 --> F1
  A1 --> F2
  A1 --> F3
  A2 --> F6
  A3 --> F4
  A1 & A2 & A3 --> F5`,
  },
  {
    id: "DC_SYS_02",
    group: "DexCheck — System Architecture",
    title: "Technology Stack (Activity)",
    code: `flowchart TD
  ${CLASSDEF}
  subgraph DataSources[Multi-Chain Data Sources]
    direction LR
    B1[BNB Chain]
    B2[Ethereum]
    B3[Polygon]
    B4[25+ Other Chains]
  end

  subgraph Engine[DexCheck Core Engine]
    direction TB
    P1[Modular Data Engine]
    P2[Proprietary AI Algorithms]
    P3[Unified API Layer]
  end

  subgraph Endpoints[User & B2B Endpoints]
    direction LR
    E1[Web DApp]
    E2[Telegram Bots]
    E3[B2B API Clients]
  end

  DataSources --> P1
  P1 --> P2
  P2 --> P3
  P3 --> Endpoints
  
  R1{{Data Latency}}:::risk
  P1 --> R1`,
  },
  {
    id: "DC_TOKEN_01",
    group: "DCK Token Economy",
    title: "Token Utility Flow",
    code: `graph TD
  DCK[DCK Token]

  subgraph UserActions[User Actions]
    A1[Stake DCK]
    A2[Pay with DCK]
    A3[Hold DCK]
  end

  subgraph PlatformFeatures[Platform Features & Benefits]
    B1["Access PRO Tools<br/>(InsightsGPT, Smart Money)"]
    B2[Use B2B API Services]
    B3[Participate in DAO Governance]
    B4["Earn Staking Rewards (APY)"]
  end
  
  subgraph Deflation[Deflationary Mechanism]
      Y1["Platform Revenue<br/>(e.g., API Fees)"]
      Y2{Quarterly Token Burn}
      Y1 --> Y2
  end

  A1 --> B1
  A1 --> B4
  A2 --> B2
  A3 --> B3
  
  DCK --> UserActions
  B2 --> Y1`,
  },
  {
    id: "DC_FEAT_01",
    group: "Core Features",
    title: "KOL Intelligence Engine (Sequence)",
    code: `sequenceDiagram
  autonumber
  participant U as User/Investor
  participant DC as DexCheck Platform
  participant X as X.com (Twitter) API
  participant BC as Blockchain Data

  U->>DC: Search for a KOL's performance
  DC->>X: Fetch recent token mentions by KOL
  X-->>DC: Return list of mentioned tokens & timestamps
  DC->>BC: Query price data for tokens around mention time
  BC-->>DC: Return historical price data
  DC->>DC: Analyze price movement post-mention & calculate ROI
  DC-->>U: Display KOL Performance Card (Avg ROI, Win Rate)
`,
  },
  {
    id: "DC_FEAT_02",
    group: "Core Features",
    title: "Due Diligence Workflow (Flowchart)",
    code: `flowchart LR
  ${CLASSDEF}
  S([Start DD on Project X]) --> D1[Analyze On-Chain Data via Whale Tracker]
  D1 --> D2[Check Holder Distribution & Smart Money Activity]
  D2 --> D3[Review Token Unlock Schedule on DexCheck]
  D3 --> D4[Assess Social Sentiment & KOL Mentions]
  
  subgraph ExternalVerification[External Verification]
    E1[Check CertiK Audit]
    E2[Verify Team Doxxing Status]
  end

  D4 --> E1
  E1 --> E2
  E2 --> F([Investment Decision])

  D2 -- Suspicious Activity --> R1{{Risk: Market Manipulation}}:::risk
  E2 -- Partially Anonymous --> R2{{Risk: Lack of Transparency}}:::risk
`,
  },
  {
    id: "DC_API_01",
    group: "B2B Integration",
    title: "API Integration & Payment (Sequence)",
    code: `sequenceDiagram
  participant Dev as 3rd-Party Developer
  participant App as Developer's Application
  participant DC as DexCheck API
  participant Wallet as Dev's Wallet

  Dev->>DC: Subscribe to an API Plan
  DC-->>Dev: Provide API Key
  Dev->>Wallet: Pay subscription fee with $DCK
  Wallet-->>DC: Confirm payment
  
  loop Real-time Data Fetch
    App->>DC: Request data (e.g., top traders) with API Key
    DC-->>App: Return JSON data
  end`,
  },
];