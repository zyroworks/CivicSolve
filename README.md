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
| **Google Sign-In & Login** | `/login` | Official Google OAuth 2.0 authentication, stakeholder persona onboarding, session persistence, and secure profile management. |
| **CivicSolve AI Assistant** | Floating widget | Role-aware chatbot on bottom-right: problem intake, structured draft formulating, duplicate challenge check, and non-executive guidance. |

---

## Google Authentication (Firebase Auth)
CivicSolve is equipped with production-ready Google Authentication:
- **Zero-Config Developer Mode**: By default, one-click simulated Google authentication is available out-of-the-box for instant local testing and presentations.
- **Production Live Google OAuth**:
  1. Create a project in [Firebase Console](https://console.firebase.google.com).
  2. Navigate to **Authentication > Sign-in method** and enable **Google**.
  3. Under **Authentication > Settings > Authorized domains**, add `localhost` and your production domain (e.g. `civicsolve.vercel.app`).
  4. Copy your web app keys to `.env` or Vercel Environment Variables:
     - `VITE_FIREBASE_API_KEY`
     - `VITE_FIREBASE_AUTH_DOMAIN`
     - `VITE_FIREBASE_PROJECT_ID`
     - `VITE_FIREBASE_STORAGE_BUCKET`
     - `VITE_FIREBASE_MESSAGING_SENDER_ID`
     - `VITE_FIREBASE_APP_ID`

---

## Multi-Stakeholder Role Switcher & Profile Drawer
In the top navigation bar, users can sign in with Google to view their authenticated profile, verified Google badge, and switch active personas (**Citizens**, **Govt Admin**, **Universities**, **Industry**) to view the platform through different stakeholder perspectives. Clicking the user profile pill opens an interactive drawer with profile settings, quick actions, and **Sign Out**.

---

## Architecture & Design Tokens
- Follows the complete design specification documented in [`civic_innovation_architecture/DESIGN.md`](./civic_innovation_architecture/DESIGN.md).
- Typography: **Plus Jakarta Sans** (Headlines) & **Inter** (Body/Labels).
- Palette: Royal Blue Primary (`#004ac6`/`#2563eb`), Navy Secondary (`#0f172a`), Vibrant Teal Tertiary (`#006056`/`#14b8a6`), Amber Highlight (`#f59e0b`).