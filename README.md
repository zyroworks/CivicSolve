# CivicSolve — AI-Powered Societal Innovation Platform
### National Societal Innovation & Civic Collaboration Platform

CivicSolve is a unified digital platform connecting citizens, municipal governments, university research hubs, and industry partners to transform localized grassroots civic pain points into accredited, funded, and deployable public infrastructure.

---

## 8-Stage Innovation Lifecycle

```
1. Citizen Problem (Geotagged + EXIF proof)
   ↓
2. AI Diagnostics (Gemini NLP classification, severity scoring & deduplication)
   ↓
3. Govt Validation (Ward commissioner review & tender sanction)
   ↓
4. Lab Matching (Automated university skill & equipment vector routing)
   ↓
5. R&D Sprints (Faculty PI & student squad collaborative engineering)
   ↓
6. Industry CSR (Corporate cloud & hardware dev kit grants)
   ↓
7. Field Pilot (Municipal testbed deployment & live SCADA telemetry)
   ↓
8. Citizen Impact (Public social audit & quantified outcome verification)
```

---

## Quick Start (Run in 1 Command)

### Prerequisites
- Node.js >= 18.0.0 (Tested on Node v24.20.0, npm 11.19.0)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
> **Note:** If `GEMINI_API_KEY` is provided, the platform queries live Google Gemini 1.5/2.5 models. If omitted, the platform uses its built-in deterministic local neural triage engine without any network dependencies.

### 3. Run Development Server
```bash
npm run dev
```
- **Frontend App:** http://localhost:5173
- **Backend API:** http://localhost:3001

### 4. Build for Production
```bash
npm run build
```

---

## Key Views & Features

| View | Route | Description |
| :--- | :--- | :--- |
| **Public Portal & Stepper** | `/` | 8-stage interactive lifecycle, live platform metrics ticker, stakeholder matrix, featured projects. |
| **Citizen Intake & AI Triage** | `/report` | GPS-locked problem submission with real-time neural domain classification, severity score (0–100), and duplicate detection. |
| **Govt Admin Dashboard** | `/admin` | Municipal triage queue, multi-criteria filtering, 1-click Approve & Route to Lab, live sensor array health, audit logs. |
| **University Project Workspace** | `/workspace` | AquaSense (#CS-8921) IoT dashboard, Quad stakeholder mesh, sprint task checklist, telemetry curve visualizer, mentor discussion thread. |
| **Challenges Repository** | `/challenges` | Searchable national index of verified challenges and citizen endorsements. |
| **Impact & Social Audit** | `/impact` | Quantified societal impact metrics, SDG distribution, municipal cost savings, and patent disclosures. |
| **CivicSolve AI Assistant** | Floating widget | Role-aware chatbot on bottom-right: problem intake, structured draft formulating, duplicate challenge check, and non-executive guidance. |

---

## Multi-Stakeholder Role Switcher
In the top navigation bar, click any role (**Citizens**, **Govt Admin**, **Universities**, **Industry**) to instantly switch personas, views, and permissions during evaluations and demonstrations.

---

## Architecture & Design Tokens
- Follows the complete design specification documented in [`civic_innovation_architecture/DESIGN.md`](./civic_innovation_architecture/DESIGN.md).
- Typography: **Plus Jakarta Sans** (Headlines) & **Inter** (Body/Labels).
- Palette: Royal Blue Primary (`#004ac6`/`#2563eb`), Navy Secondary (`#0f172a`), Vibrant Teal Tertiary (`#006056`/`#14b8a6`), Amber Highlight (`#f59e0b`).