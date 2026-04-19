# CreditSaathi

> **AI-Powered Credit & Business Intelligence Platform for MSMEs**
> Version: 1.0 | Stack: React + FastAPI + MongoDB | Duration: 3 Months | Team Size: 4

![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python_3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

### 🌐 Live Deployment

| Service | URL |
|---------|-----|
| **Frontend** | [creditsathi.pages.dev](https://creditsathi.pages.dev) |
| **Backend API** | [creditsaathi-api-funi.onrender.com](https://creditsaathi-api-funi.onrender.com/api/v1/health) |
| **API Docs** | [Swagger UI](https://creditsaathi-api-funi.onrender.com/api/v1/docs) |

### 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Bank Officer | `officer@gmail.com` | `12345678` |
| MSME Owner | `owner@gmail.com` | `12345678` |

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Key Features](#2-key-features)
3. [Technology Stack](#3-technology-stack)
4. [System Architecture](#4-system-architecture)
5. [Project Structure](#5-project-structure)
6. [Quick Start](#6-quick-start)
7. [Database Schema](#7-database-schema)
8. [API Architecture](#8-api-architecture)
9. [Frontend Architecture](#9-frontend-architecture)
10. [Security Requirements](#10-security-requirements)
11. [Non-Functional Requirements](#11-non-functional-requirements)
12. [Team Structure & Roles](#12-team-structure--roles)
13. [Sprint Plan — 3 Month Roadmap](#13-sprint-plan--3-month-roadmap)
14. [Environment & DevOps](#14-environment--devops)
15. [Third-Party Integrations](#15-third-party-integrations)
16. [Compliance & Regulatory](#16-compliance--regulatory)
17. [Testing Strategy](#17-testing-strategy)
18. [Risk Register](#18-risk-register)
19. [Definition of Done](#19-definition-of-done)

---

## 1. Project Overview

### 1.1 Background

CreditSaathi is a full-stack AI-powered credit intelligence platform targeting India's MSME sector. The platform evaluates MSME financial health using alternative data sources — GST filing patterns, UPI/bank transaction flows, monthly revenue trends, and payment behaviour — to generate instant credit scores, risk categories, and actionable business intelligence reports for banks, NBFCs, and lenders.

### 1.2 Business Goals

| Goal | Metric |
|------|--------|
| Replace CIBIL dependency for MSME lending | Score generated without CIBIL as input |
| Instant credit scoring | Score delivered in < 10 seconds |
| Regulatory explainability | SHAP panel for every scoring decision |
| Reduce loan rejection rate | Target 40% improvement in approvals for eligible MSMEs |
| Enable bank pilot | POC with 1 bank/NBFC by Month 3 |

### 1.3 Scope — 3 Month Build

| Phase | Scope | Timeline |
|-------|-------|----------|
| Phase 1 — Core MVP | AI credit scoring, risk classification, SHAP explainability, business dashboard | Month 1–2 |
| Phase 2 — High Impact | Loan recommendation engine, early stress detection, eKYC + document upload, basic fraud detection | Month 2–3 |
| Phase 3 & 4 — Stubs | Sector benchmarking, dynamic monitoring, supply chain finance, LLM chatbot, bank API layer | Architecture planned, full build post MVP |

---

## 2. Key Features

- **AI Credit Scoring** — XGBoost model generates scores (300–850) from GST + transaction data
- **SHAP Explainability** — Visual bar-chart breakdown of what drives each score up or down
- **Risk Categorisation** — Low / Medium / High risk with colour-coded badges and tooltips
- **Business Intelligence Dashboard** — Animated score gauge, revenue trends, cash flow charts, score history timeline
- **Dual Dashboard Views** — Role-adaptive: MSME owner sees own profile, bank officer sees portfolio overview
- **Loan Recommendation Engine** — Auto-suggests loan amount, interest rate band, and eligible government schemes (Mudra, CGTMSE, PSB 59 Min)
- **Early Stress Detection** — Flags financial distress signals (GST gaps, revenue decline, negative cash flow streaks)
- **Fraud Detection** — Rule-based anomaly detection for inflated financial data
- **eKYC & Document Verification** — Upload Aadhaar, PAN, bank statements with drag-and-drop; verification workflow for officers
- **LLM Chatbot** — RAG-powered credit advisor using Groq API with multilingual support (English, हिंदी, ಕನ್ನಡ)
- **Demo Mode** — Full offline exploration with realistic Indian MSME data — no backend required
- **Dark/Light Theme** — System-wide theme toggle with CSS variable–based theming
- **Notification System** — In-app notification panel with unread badges and activity feed
- **Admin Panel** — User management, audit log viewer with search/filter/CSV export, ML model config display

---

## 3. Technology Stack

### 3.1 Core Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend** | React | 18.x | SPA framework |
| **Build Tool** | Vite | 5.x | Fast dev server and bundler |
| **State Management** | Redux Toolkit | 2.x | Global state, async thunks |
| **UI Framework** | Tailwind CSS | 3.x | Utility-first styling |
| **Charts** | Recharts | 2.x | Revenue trends, cash flow, score history |
| **Icons** | Lucide React | 1.x | Consistent icon system |
| **HTTP Client** | Axios | 1.x | API calls with JWT interceptors |
| **Backend** | Python + FastAPI | 3.12 / 0.x | REST API server |
| **Database** | MongoDB | 7.x | Primary datastore |
| **ODM** | Beanie (Motor) | — | Async document modelling and validation |

### 3.2 ML Service (Python Microservice)

| Technology | Purpose |
|-----------|---------|
| Python 3.12 | ML runtime |
| FastAPI | ML REST microservice (called by backend) |
| scikit-learn | Preprocessing pipelines |
| XGBoost | Primary credit scoring model |
| SHAP | Explainability panel generation |
| Pandas / NumPy | Feature engineering and data transformation |
| Joblib | Model serialisation |

### 3.3 Supporting Infrastructure

| Tool | Purpose |
|------|---------|
| JWT (python-jose) + bcrypt (passlib) | Authentication and password hashing |
| httpx (async) | Backend → ML service internal HTTP calls |
| Groq API (free tier) | LLM chatbot inference |
| Docker + Docker Compose | Containerisation of all 3 services |
| GitHub Actions (free tier) | CI/CD pipeline |
| Render / Railway (free tier) | Backend + ML service hosting |
| MongoDB Atlas (free tier — M0, 512 MB) | Managed MongoDB in cloud |

### 3.4 Development Tools

| Tool | Purpose |
|------|---------|
| ESLint | Code linting |
| Vitest + Testing Library | Frontend component testing |
| pytest | Backend and ML testing |
| Postman | API design and testing |

---

## 4. System Architecture

### 4.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client (Browser)                      │
│        React 18 + Redux Toolkit + Tailwind + Vite       │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTPS REST (/api/v1)
┌──────────────────────▼──────────────────────────────────┐
│              Python / FastAPI Backend                     │
│      Auth │ MSME APIs │ Score APIs │ Loan APIs │ Chat   │
│                 JWT Middleware                            │
└────────┬─────────────────────────────────┬──────────────┘
         │ Beanie ODM (Motor async)        │ Internal HTTP
┌────────▼───────────┐          ┌──────────▼──────────────┐
│   MongoDB Atlas    │          │   Python / FastAPI       │
│  Users, MSMEs,     │          │   ML Scoring Service     │
│  Scores, Loans     │          │   XGBoost + SHAP         │
└────────────────────┘          └─────────────────────────┘
```

### 4.2 Data Flow

```
MSME Owner uploads GST + Transaction data
    → Backend validates and stores in MongoDB
    → User triggers "Generate Score"
    → Backend assembles feature vector
    → Backend calls ML service via internal HTTP
    → ML service runs XGBoost prediction + SHAP analysis
    → Score (300–850) + risk category + SHAP values returned
    → Backend stores CreditScore document
    → Dashboard renders gauge, SHAP panel, charts
    → Loan recommendations auto-generated from score
```

---

## 5. Project Structure

```
CreditSaathi/
├── client/                          # React frontend (Vite + Tailwind + Redux)
│   └── src/
│       ├── App.jsx                  # Router — public + protected routes
│       ├── main.jsx                 # Entry — Redux Provider, Theme, DemoData, Toast
│       ├── index.css                # Design system — CSS variables, components, animations
│       ├── pages/
│       │   ├── LandingPage.jsx      # Marketing page — scroll reveals, animated counters
│       │   ├── LoginPage.jsx        # Login form with Redux auth
│       │   ├── RegisterPage.jsx     # Registration — name, email, password, role, org
│       │   ├── DashboardPage.jsx    # Main dashboard — MSME owner + bank officer views
│       │   ├── MSMEOnboardingPage.jsx  # 3-step multi-step MSME profile creation
│       │   ├── MSMEListPage.jsx     # Portfolio list/grid — search, filter, pagination
│       │   ├── DataUploadPage.jsx   # GST + transaction data upload + score trigger
│       │   ├── LoanPage.jsx         # Loan application + officer review workflow
│       │   ├── DocumentsPage.jsx    # eKYC document upload with drag-and-drop
│       │   ├── SettingsPage.jsx     # Profile, security, notifications, theme, language
│       │   └── AdminPage.jsx        # Users table, audit logs, ML model config
│       ├── components/
│       │   ├── AppLayout.jsx        # Sidebar nav, header, breadcrumbs, notifications
│       │   ├── ProtectedRoute.jsx   # Auth guard with demo mode bypass
│       │   ├── ScoreGauge.jsx       # Animated SVG semi-circle gauge (300–850)
│       │   ├── SHAPPanel.jsx        # Feature impact horizontal bar chart
│       │   ├── RiskBadge.jsx        # Colour-coded risk badge with tooltip
│       │   ├── RevenueChart.jsx     # Recharts line chart — monthly revenue
│       │   ├── CashFlowChart.jsx    # Recharts grouped bar chart — inflow vs outflow
│       │   ├── ScoreHistoryChart.jsx # Recharts line chart — score timeline
│       │   ├── StatsCard.jsx        # Summary stat card with icon and trend
│       │   ├── ChatbotWidget.jsx    # Floating AI chatbot — 3 languages, markdown
│       │   ├── DemoDataToggle.jsx   # Toggle between live API and demo data
│       │   ├── ThemeToggle.jsx      # Dark/light mode toggle
│       │   ├── Modal.jsx            # Reusable modal dialog
│       │   └── ToastProvider.jsx    # Toast notification system
│       ├── store/
│       │   ├── store.js             # Redux store configuration
│       │   ├── authSlice.js         # Login, register, logout thunks
│       │   ├── msmeSlice.js         # MSME CRUD + data ingestion thunks
│       │   ├── scoreSlice.js        # Score generation + history thunks
│       │   └── loanSlice.js         # Loan submit, fetch, status update thunks
│       ├── contexts/
│       │   ├── ThemeContext.jsx      # Dark/light theme with CSS variable switching
│       │   └── DemoDataContext.jsx   # Demo mode provider — offline data for all pages
│       ├── services/
│       │   └── api.js               # Axios instance — JWT interceptor + auto refresh
│       ├── utils/
│       │   └── demoData.js          # Realistic demo dataset — Indian MSMEs, scores, loans
│       └── __tests__/
│           └── App.test.jsx         # Component tests (Vitest + Testing Library)
│
├── server/                          # Python / FastAPI backend
│   ├── app/
│   │   ├── main.py                  # FastAPI app — CORS, routers, Beanie init
│   │   ├── config.py                # Pydantic settings (env vars)
│   │   ├── database.py              # Motor + Beanie DB init & safe-seed
│   │   ├── models/
│   │   │   ├── user.py              # User document model
│   │   │   ├── msme.py              # MSME profile document
│   │   │   ├── credit_score.py      # Credit score + SHAP + stress signals
│   │   │   ├── gst_record.py        # GST filing records
│   │   │   ├── transaction_record.py  # Bank transaction records
│   │   │   ├── loan_application.py  # Loan applications
│   │   │   └── audit_log.py         # Audit log entries
│   │   ├── routes/
│   │   │   ├── auth.py              # POST /auth/login, /register, /logout, /refresh
│   │   │   ├── msme.py              # GET/POST /msmes
│   │   │   ├── gst.py               # POST /gst/upload, GET /gst/:msmeId
│   │   │   ├── transactions.py      # POST /transactions/upload, GET /transactions/:msmeId
│   │   │   ├── scoring.py           # POST /scoring/generate/:id, GET latest|history
│   │   │   ├── loans.py             # POST /loans, GET /loans, PATCH /loans/:id/status
│   │   │   └── chat.py              # POST /chat — Groq LLM chatbot
│   │   └── services/
│   │       ├── auth_service.py      # JWT creation, verification, password hashing
│   │       ├── ml_service.py        # HTTP client for ML microservice calls
│   │       ├── chat_service.py      # Groq API integration + RAG context builder
│   │       └── audit_service.py     # Audit log creation helper
│   ├── seed.py                      # Full database seeder script
│   ├── requirements.txt             # Python dependencies
│   └── .env                         # Environment variables
│
├── ml/                              # Python / FastAPI ML microservice
│   ├── app/
│   │   └── main.py                  # Scoring endpoint — feature engineering + XGBoost + SHAP
│   ├── models/                      # Saved .joblib model files (XGBoost, StandardScaler)
│   ├── tests/                       # pytest test suites
│   ├── requirements.txt             # ML-specific dependencies
│   └── .env                         # ML service config
│
├── docs/
│   └── architecture.md              # System architecture documentation
├── .github/workflows/
│   └── ci.yml                       # GitHub Actions CI pipeline
├── docker-compose.yml               # 3-service local dev environment
├── .gitignore
└── README.md
```

---

## 6. Quick Start

### Prerequisites

- **Python** >= 3.12
- **Node.js** >= 20.x LTS (for frontend)
- **MongoDB** (Atlas recommended)
- **Docker & Docker Compose** (optional, for containerised setup)

### 1. Clone the Repository

```bash
git clone https://github.com/yash2083/CreditSaathi.git
cd CreditSaathi
```

### 2. Environment Setup

```bash
# Copy and edit environment variables
cp server/.env.example server/.env
cp ml/.env.example ml/.env
# Edit both .env files with your actual credentials
```

### 3. Run with Docker (Recommended)

```bash
docker-compose up --build
```

This starts:

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:3000 |
| **Backend API** | http://localhost:5000 |
| **ML Service** | http://localhost:8000 |

### 4. Run Without Docker

**Backend (FastAPI):**

```bash
cd server
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 5000 --reload
```

**Frontend (Vite):**

```bash
cd client
npm install
npm run dev
```

**ML Service:**

```bash
cd ml
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 5. Demo Mode (No Backend Needed)

The frontend includes a **built-in demo mode** that populates the entire app with realistic Indian MSME data. Toggle it from the floating bar at the bottom of any authenticated page. This allows full UI exploration without running any backend services.

---

## 7. Database Schema

### 7.1 Collections Overview

| Collection | Description |
|------------|-------------|
| `users` | Bank officers, admin users, MSME owners |
| `msmes` | Core MSME business profiles |
| `gst_records` | GST filing history per MSME |
| `transaction_records` | UPI/bank cash flow data |
| `credit_scores` | Generated credit score with SHAP data |
| `loan_applications` | Loan application lifecycle |
| `documents` | Uploaded files metadata |
| `audit_logs` | All scoring decisions for compliance |

### 7.2 Key Schema Definitions

#### users

```javascript
{
  _id: ObjectId,
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  role: { type: String, enum: ['admin', 'bank_officer', 'msme_owner'] },
  organisationName: String,
  isVerified: Boolean,
  refreshToken: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### msmes

```javascript
{
  _id: ObjectId,
  owner: { type: ObjectId, ref: 'User' },
  businessName: String,
  gstin: { type: String, unique: true },
  pan: String,
  businessType: { type: String, enum: ['micro', 'small', 'medium'] },
  sector: String,                          // 'Textile', 'Retail', 'Manufacturing', etc.
  registeredState: String,
  city: String,
  contactEmail: String,
  contactPhone: String,
  udyamRegistrationNo: String,
  annualTurnoverBand: String,              // '<40L', '40L-1.5Cr', '1.5Cr-5Cr', etc.
  employeeCount: Number,
  latestScoreId: { type: ObjectId, ref: 'CreditScore' },
  status: { type: String, enum: ['active', 'inactive', 'flagged'] },
  createdAt: Date,
  updatedAt: Date
}
```

#### credit_scores

```javascript
{
  _id: ObjectId,
  msmeId: { type: ObjectId, ref: 'MSME' },
  generatedBy: { type: ObjectId, ref: 'User' },
  scoreValue: { type: Number, min: 300, max: 850 },
  riskCategory: { type: String, enum: ['Low', 'Medium', 'High'] },
  modelVersion: String,
  shapValues: {
    gstConsistency: Number,
    cashFlowHealth: Number,
    revenueGrowth: Number,
    paymentBehaviour: Number,
    transactionVolume: Number,
    chequeBouncerate: Number
  },
  shapSummary: [{ feature: String, impact: Number, direction: String, displayLabel: String }],
  featureInputSnapshot: Object,
  recommendedLoanAmount: Number,
  recommendedInterestBand: String,
  eligibleGovernmentSchemes: [String],
  stressSignals: [{ signal: String, description: String, severity: String }],
  explanationText: String,
  auditHash: String,
  createdAt: Date
}
```

#### gst_records

```javascript
{
  _id: ObjectId,
  msmeId: { type: ObjectId, ref: 'MSME' },
  filingPeriod: String,                   // 'GSTR3B_2024_01'
  filingType: { type: String, enum: ['GSTR1', 'GSTR3B', 'GSTR9'] },
  filedOnTime: Boolean,
  filingDate: Date,
  taxableRevenue: Number,
  taxPaid: Number,
  nilReturn: Boolean,
  createdAt: Date
}
```

#### transaction_records

```javascript
{
  _id: ObjectId,
  msmeId: { type: ObjectId, ref: 'MSME' },
  month: String,                          // 'YYYY-MM'
  totalInflow: Number,
  totalOutflow: Number,
  upiTransactionCount: Number,
  upiVolume: Number,
  chequeBouncedCount: Number,
  vendorPaymentsPunctuality: Number,      // 0–1 ratio
  dataSource: { type: String, enum: ['manual', 'aa_framework', 'bank_statement_ocr'] },
  createdAt: Date
}
```

#### loan_applications

```javascript
{
  _id: ObjectId,
  msmeId: { type: ObjectId, ref: 'MSME' },
  scoreId: { type: ObjectId, ref: 'CreditScore' },
  requestedAmount: Number,
  loanPurpose: String,
  repaymentTenure: Number,
  status: { type: String, enum: ['submitted', 'under_review', 'approved', 'rejected', 'disbursed'] },
  officerRemarks: String,
  decisionDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### audit_logs

```javascript
{
  _id: ObjectId,
  action: String,                         // 'score_generated', 'loan_approved', etc.
  performedBy: { type: ObjectId, ref: 'User' },
  targetMsmeId: { type: ObjectId, ref: 'MSME' },
  entityType: String,
  entityId: ObjectId,
  ipAddress: String,
  userAgent: String,
  payload: Object,                        // sanitised snapshot
  createdAt: Date
}
```

---

## 8. API Architecture

### 8.1 Base URL

```
Development: http://localhost:5000/api/v1
ML Service:  http://localhost:8000 (internal only)
```

### 8.2 Endpoints

All endpoints are prefixed with `/api/v1`.

**Authentication**

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user (name, email, password, role, org) |
| POST | `/auth/login` | Login → returns JWT access + refresh tokens |
| POST | `/auth/logout` | Invalidate refresh token |
| POST | `/auth/refresh` | Rotate tokens using refresh token |

**MSME Profiles**

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/msmes` | Create MSME profile (3-step onboarding data) |
| GET | `/msmes` | List MSMEs (paginated, filterable by sector/risk/search) |
| GET | `/msmes/:id` | Get single MSME profile |

**Data Ingestion**

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/gst/upload` | Upload GST filing records (bulk JSON) |
| GET | `/gst/:msmeId` | Fetch GST records for an MSME |
| POST | `/transactions/upload` | Upload bank transaction records (bulk JSON) |
| GET | `/transactions/:msmeId` | Fetch transaction records for an MSME |

**Credit Scoring**

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/scoring/generate/:msmeId` | Trigger AI credit score generation |
| GET | `/scoring/:msmeId/latest` | Get latest score + SHAP + risk + recommendations |
| GET | `/scoring/:msmeId/history` | Get full score history timeline |

**Loans**

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/loans` | Submit loan application |
| GET | `/loans` | List all loan applications (paginated) |
| PATCH | `/loans/:id/status` | Approve / reject application (bank officer) |

**Chatbot**

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/chat` | Send message to AI chatbot (supports EN, HI, KN) |

### 8.3 Standard Response Format

```json
// Success
{
  "success": true,
  "data": { ... },
  "pagination": { "total": 100, "page": 1, "limit": 20, "totalPages": 5 }
}

// Error
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "GSTIN is required",
    "field": "gstin"
  }
}
```

---

## 9. Frontend Architecture

### 9.1 State Management

| Redux Slice | Purpose | Thunks |
|-------------|---------|--------|
| `authSlice` | Authentication state + token management | `loginUser`, `registerUser`, `logoutUser` |
| `msmeSlice` | MSME profiles + GST/transaction records | `fetchMSMEs`, `createMSME`, `uploadGSTData`, `uploadTransactionData`, `fetchGSTRecords`, `fetchTransactionRecords` |
| `scoreSlice` | Credit scores + SHAP data | `generateScore`, `fetchLatestScore`, `fetchScoreHistory` |
| `loanSlice` | Loan applications + officer actions | `submitLoan`, `fetchLoans`, `updateLoanStatus` |

### 9.2 Context Providers

| Context | Purpose |
|---------|---------|
| `ThemeContext` | Dark/light mode toggle — persisted to localStorage |
| `DemoDataContext` | Demo mode toggle — switches all pages between API and demo data |

### 9.3 Role-Based Access

Navigation and features adapt based on user role:

| Feature | Admin | Bank Officer | MSME Owner |
|---------|-------|--------------|------------|
| Dashboard | Portfolio overview | Portfolio overview | Own business view |
| MSME Portfolio list | ✓ | ✓ | ✗ |
| Loan review actions | ✗ | ✓ | ✗ |
| Admin panel | ✓ | ✗ | ✗ |
| Onboard MSME | ✓ | ✓ | ✓ (own) |
| Upload data | ✓ | ✓ | ✓ (own) |

---

## 10. Security Requirements

### 10.1 Authentication & Authorisation

- JWT access tokens with 15-minute expiry
- Refresh tokens with 7-day expiry, stored in `httpOnly` cookies
- Role-based access control (RBAC): `admin`, `bank_officer`, `msme_owner`
- bcrypt password hashing (salt rounds: 12)

### 10.2 API Security

- Rate limiting per IP
- Strict CORS policy — whitelist frontend origin only
- Input validation and sanitisation on all endpoints
- File upload validation: type check (MIME), size limit (10MB)

### 10.3 Data Security

- All PII fields (PAN, Aadhaar) encrypted at rest
- GSTIN stored in plain text (required for GST API calls) but access-controlled
- Audit log on every scoring decision (immutable, append-only)
- HTTPS enforced in production; TLS 1.2+

### 10.4 Compliance Readiness

- All data operations log user ID, timestamp, and IP
- MSME consent tracked before data aggregation
- Data deletion workflow for DPDP Act compliance (right to erasure)
- No PII in application logs

---

## 11. Non-Functional Requirements

| Category | Requirement | Target |
|----------|-------------|--------|
| **Performance** | Credit score generation time | < 10 seconds end-to-end |
| **Performance** | API response time (95th percentile) | < 500ms |
| **Performance** | Dashboard load time | < 2 seconds |
| **Availability** | Uptime target | 99% (pilot phase) |
| **Scalability** | Concurrent scoring requests | 50 concurrent (MVP) |
| **Scalability** | MSME records | Up to 10,000 for pilot |
| **Reliability** | ML service failure fallback | Graceful error with retry |
| **Browser Support** | Chrome, Firefox, Safari, Edge | Latest 2 versions |
| **Mobile** | Responsive design | Mobile-friendly (React + Tailwind) |
| **Internationalisation** | Language support | English, Hindi, Kannada |

---

## 12. Team Structure & Roles

### 12.1 Team Allocation

| Member | Role | Primary Responsibilities |
|--------|------|--------------------------|
| **Developer A** | Backend Lead | FastAPI REST APIs, ML service integration, business logic, MongoDB design |
| **Developer B** | Frontend Lead | React application, Redux state management, dashboard UI, data visualisation |
| **Developer C** | ML / Data Engineer | Python ML scoring service, SHAP integration, data pipeline, synthetic data generation |
| **Developer D** | Full-Stack + DevOps | MongoDB queries, deployment, CI/CD pipeline, Phase 2 feature development, testing |

### 12.2 Collaboration Protocol

- **Daily standup**: 15 min, async (Slack/Discord updates)
- **Sprint review**: Every 2 weeks (end of each sprint)
- **Code review**: All PRs require review from at least 1 other team member
- **Branch strategy**: `main` → `develop` → `feature/xxx` → PRs into `develop` → merge to `main` on release
- **Task tracking**: GitHub Projects (Kanban board) or Notion

---

## 13. Sprint Plan — 3 Month Roadmap

> **12 weeks | 6 sprints of 2 weeks each | 4 developers**

### Sprint 1 — Weeks 1–2: Foundation

**Goal**: Project scaffolding, database, authentication, MSME onboarding

| Task | Owner | Priority |
|------|-------|----------|
| Initialise project structure | Dev A | P0 |
| Configure MongoDB Atlas + Beanie connection | Dev A | P0 |
| Implement User model + JWT auth (register/login/refresh) | Dev A | P0 |
| RBAC middleware | Dev A | P0 |
| React app scaffold (Vite + Tailwind + Redux Toolkit) | Dev B | P0 |
| Login/Register UI with form validation | Dev B | P0 |
| Protected route wrapper | Dev B | P0 |
| MSME model + CRUD endpoints | Dev D | P0 |
| MSME onboarding form (multi-step) | Dev D | P1 |
| Set up Python/FastAPI ML service skeleton | Dev C | P0 |
| Docker Compose for local dev | Dev D | P1 |
| GitHub Actions CI skeleton | Dev D | P1 |

**Deliverable**: Working auth flow, MSME profile creation, dev environment running

---

### Sprint 2 — Weeks 3–4: Data Ingestion & ML Core

**Goal**: GST + transaction data upload, ML model training, scoring endpoint

| Task | Owner | Priority |
|------|-------|----------|
| GST record model + upload endpoint | Dev A | P0 |
| Transaction record model + upload endpoint | Dev A | P0 |
| Feature engineering pipeline (Python) | Dev C | P0 |
| Synthetic dataset generation for model training | Dev C | P0 |
| Train XGBoost scoring model (v1) | Dev C | P0 |
| SHAP integration in ML service | Dev C | P0 |
| Score generation endpoint | Dev A | P0 |
| Backend → FastAPI internal HTTP service call | Dev A | P0 |
| CreditScore model + storage | Dev A | P0 |
| Data upload UI (drag-and-drop) | Dev B | P1 |
| Loading states + error handling UI | Dev B | P1 |
| Audit log model + middleware | Dev D | P1 |

**Deliverable**: End-to-end scoring pipeline working (upload → score → 300–850 + SHAP)

---

### Sprint 3 — Weeks 5–6: Dashboard & SHAP UI

**Goal**: Business intelligence dashboard, SHAP explainability panel, risk badges

| Task | Owner | Priority |
|------|-------|----------|
| MSME dashboard page (score card, risk badge, trends) | Dev B | P0 |
| Credit score gauge component (SVG arc) | Dev B | P0 |
| SHAP explainability panel (horizontal bar chart) | Dev B | P0 |
| Revenue trend line chart (Recharts) | Dev B | P0 |
| Cash flow inflow/outflow bar chart | Dev B | P0 |
| Risk category badge component | Dev B | P0 |
| Score history timeline | Dev B | P1 |
| Bank officer portfolio view | Dev B | P1 |
| Latest score API with SHAP data | Dev A | P0 |
| Plain-English explanation generator | Dev C | P1 |

**Deliverable**: Fully functional dashboard with score, SHAP panel, and charts

---

### Sprint 4 — Weeks 7–8: Loan Module + Phase 2 Start

**Goal**: Loan application flow, recommendation engine, document upload

| Task | Owner | Priority |
|------|-------|----------|
| Loan application model + CRUD endpoints | Dev A | P0 |
| Loan recommendation logic (score → amount + rate) | Dev A | P0 |
| Government scheme eligibility mapping | Dev C | P1 |
| Loan application form (MSME owner) | Dev B | P0 |
| Loan status tracking UI (officer + MSME views) | Dev B | P0 |
| Document upload endpoint | Dev A | P1 |
| Document viewer UI | Dev B | P1 |
| Early stress detection signals | Dev C | P1 |
| Stress signal display on dashboard | Dev B | P1 |
| Admin panel (user list, audit log viewer) | Dev D | P1 |

**Deliverable**: Loan application lifecycle functional; recommendation engine live

---

### Sprint 5 — Weeks 9–10: eKYC, Fraud Detection & Hardening

**Goal**: eKYC stub, fraud detection, security hardening

| Task | Owner | Priority |
|------|-------|----------|
| eKYC upload flow (Aadhaar/PAN image) | Dev A | P1 |
| Document validation (type, size, MIME) | Dev A | P1 |
| Fraud detection rules | Dev C | P1 |
| Fraud flag integration into scoring | Dev C | P1 |
| Fraud alert display on dashboard | Dev B | P1 |
| Model v2 — retrained with payment features | Dev C | P1 |
| Rate limiting + security audit | Dev D | P0 |
| Performance testing | Dev D | P1 |
| Responsive mobile UI pass | Dev B | P1 |

**Deliverable**: Fraud detection integrated; eKYC upload flow; security hardening complete

---

### Sprint 6 — Weeks 11–12: Polish, Testing & Pilot Prep

**Goal**: End-to-end testing, demo preparation, deployment, documentation

| Task | Owner | Priority |
|------|-------|----------|
| End-to-end test suite | Dev D | P0 |
| Full test coverage for backend (target 70%+) | Dev D | P0 |
| Bug bash — all team members test full flows | All | P0 |
| Production deployment | Dev D | P0 |
| Demo dataset preparation | Dev C | P1 |
| API documentation final publish | Dev A | P1 |
| Handover notes and post-MVP roadmap | All | P1 |

**Deliverable**: Production-deployed CreditSaathi platform, demo-ready for bank pilot

---

## 14. Environment & DevOps

### 14.1 Environment Variables

**FastAPI Backend (.env)**
```
MONGO_URI=mongodb+srv://...
JWT_SECRET=<256-bit-secret>
JWT_REFRESH_SECRET=<256-bit-secret>
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
ML_SERVICE_URL=http://localhost:8000
GROQ_API_KEY=<your-groq-api-key>
ALLOWED_ORIGIN=http://localhost:3000
```

**Python ML Service (.env)**
```
MODEL_PATH=./models/xgboost_v1.joblib
SCALER_PATH=./models/scaler.joblib
PORT=8000
LOG_LEVEL=info
```

### 14.2 Docker Setup

```yaml
services:
  frontend:
    build: ./client
    ports: ["3000:3000"]
    environment:
      - VITE_API_URL=http://localhost:5000/api/v1

  backend:
    build: ./server
    ports: ["5000:5000"]
    env_file: ./server/.env
    depends_on: [ml-service]

  ml-service:
    build: ./ml
    ports: ["8000:8000"]
    volumes: ["./ml/models:/app/models"]
```

### 14.3 CI/CD Pipeline (GitHub Actions)

```
On PR to develop:
  → Run ESLint
  → Run Vitest (frontend)
  → Run pytest (backend + ML)
  → Build Docker images

On merge to main:
  → Run full test suite
  → Build + push Docker images
  → Deploy to Render / Railway
```

---

## 15. Third-Party Integrations

| Integration | Purpose | Phase | Cost |
|-------------|---------|-------|------|
| MongoDB Atlas (M0 free tier) | Database | Phase 1 | Free |
| Groq API (free tier) | LLM chatbot inference | Phase 4 | Free |
| Manual CSV/JSON Upload | Bank/transaction data ingestion | Phase 1–2 | Free |
| Manual GST Upload | GST data ingestion | Phase 1–2 | Free |
| Manual Document Upload | Identity verification (officer review) | Phase 2 | Free |
| Docker | Containerisation | Phase 1 | Free |
| GitHub Actions (free tier — 2,000 min/mo) | CI/CD pipeline | Phase 1 | Free |
| Render / Railway (free tier) | Hosting | Phase 1 | Free |

---

## 16. Compliance & Regulatory

### 16.1 RBI Guidelines

- **Digital Lending Guidelines 2022**: All loan decisions have traceable, logged audit trail. CreditSaathi stores SHA-256 hash of every input + output pair per score.
- **AI/ML Explainability**: RBI mandates explainable AI for credit decisions. SHAP panel addresses this. Every score has a stored `shapSummary` array.
- **Fair Lending**: Score algorithm does not use protected attributes (religion, caste, gender). Feature list is documented and auditable.

### 16.2 DPDP Act 2023

- Explicit consent collected before data processing
- Users can request data deletion (soft delete + anonymisation workflow)
- No PII transmitted in logs or error messages

### 16.3 Audit Trail Requirements

Every scoring event logs:
- Timestamp (UTC)
- MSME ID
- Requesting user ID + role
- Model version used
- Full feature input snapshot
- Score output + risk category
- SHAP values
- IP address
- Audit hash (SHA-256)

---

## 17. Testing Strategy

| Type | Tool | Coverage Target | Owner |
|------|------|-----------------|-------|
| Unit (backend) | pytest | 70% coverage | Dev D |
| Integration (API) | pytest + httpx | All routes | Dev D |
| Unit (frontend) | Vitest + Testing Library | Key components | Dev B |
| End-to-End | Cypress / Playwright | Core user journeys | Dev D |
| ML model testing | pytest | Accuracy metrics | Dev C |
| Load testing | k6 | 50 concurrent users | Dev D |

### Key Test Scenarios

- Successful MSME registration and score generation (happy path)
- Score generation with incomplete data (graceful error)
- Concurrent scoring requests (no race condition)
- JWT expiry and token refresh flow
- File upload validation (wrong type, oversized)
- Role-based access enforcement (MSME owner cannot see other MSMEs)
- Fraud flag triggers on anomalous GST data

---

## 18. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| ML model low accuracy on synthetic data | High | High | Domain-informed synthetic generation; validate with real data in pilot |
| 3-month timeline slippage | Medium | High | Phase 3 & 4 are explicitly post-MVP; Phase 2 is partially scoped |
| MongoDB Atlas free tier limits | Low | Low | Upgrade to M10 cluster at pilot stage |
| Bank pilot not secured by Month 3 | Medium | High | Use demo bank with synthetic portfolio as fallback |
| Team member unavailability | Medium | High | Cross-train Developer D on both backend and ML service |

---

## 19. Definition of Done

A feature is considered complete when:

- [ ] Functionality implemented and working in development environment
- [ ] Unit tests written and passing
- [ ] API endpoint documented (backend features)
- [ ] Code reviewed and approved by at least one other team member
- [ ] No linting violations
- [ ] Error states handled gracefully
- [ ] Mobile responsive (for UI features)
- [ ] Merged to `develop` branch via PR
- [ ] Feature tested by another team member (not the implementer)

---

## 20. Functional Requirements

### 20.1 User Roles & Permissions

#### Role Definitions

| Role | Description | Primary Access |
|------|-------------|----------------|
| `admin` | Platform administrator (CreditSaathi team) | Full system access, user management, model configuration |
| `bank_officer` | Loan officer at a bank or NBFC | View all MSMEs under their organisation, trigger scoring, manage loan applications |
| `msme_owner` | Business owner / applicant | View own profile, upload data, view own score and loan status |

#### Permission Matrix

| Feature | Admin | Bank Officer | MSME Owner |
|---------|-------|--------------|------------|
| Create MSME profile | ✓ | ✓ | ✓ (own only) |
| View any MSME profile | ✓ | ✓ (org only) | ✗ |
| Upload GST / transaction data | ✓ | ✓ | ✓ (own only) |
| Trigger credit scoring | ✓ | ✓ | ✓ (own only) |
| View SHAP breakdown | ✓ | ✓ | Simplified view |
| Approve/reject loan applications | ✗ | ✓ | ✗ |
| View audit logs | ✓ | Own actions | ✗ |
| Manage users | ✓ | ✗ | ✗ |
| Configure ML model | ✓ | ✗ | ✗ |
| View sector benchmarks | ✓ | ✓ | ✓ (own sector) |

---

### 20.2 Phase 1 — Core MVP

> **Target completion**: End of Month 2 (Sprint 1–4)

#### FR-AUTH-001: User Registration

- User must provide: full name, email, password (min 8 chars, 1 uppercase, 1 number, 1 special char), organisation name, role selection (`bank_officer` or `msme_owner`)
- `admin` accounts can only be created by an existing admin
- Duplicate email returns clear error
- Passwords hashed with bcrypt (salt rounds: 12)

#### FR-AUTH-002: User Login

- Returns short-lived JWT access token (15 min) and refresh token (7 days)
- Refresh token in `httpOnly` cookie; access token in response body
- Generic error on failure: "Invalid email or password"
- Account locked after 5 failed attempts in 10 minutes (15 min lockout)

#### FR-AUTH-003: Token Refresh

- `POST /auth/refresh` with valid refresh token cookie returns new access token
- Each refresh rotates the refresh token (old invalidated)
- Expired/tampered tokens return `401 Unauthorized`

#### FR-AUTH-004: Logout

- `POST /auth/logout` clears `httpOnly` cookie and invalidates server-side token

#### FR-AUTH-005: Password Reset

- Reset link via email, valid for 1 hour, single-use
- Anti-enumeration: same success message whether email exists or not

---

#### FR-MSME-001: Create MSME Profile

- Required: business name, GSTIN (15-char validated), business type, sector, state, contact email/phone
- Optional: Udyam number, turnover band, employee count, PAN, city
- Multi-step form: Basic Info → Financial Info → Confirm
- GSTIN duplicate check enforced

#### FR-MSME-002: View MSME Profile

- Bank officers see all MSMEs in org; MSME owners see own only
- Displays: business details, latest score, risk category, stress signals
- CTA shown if no score generated yet

#### FR-MSME-003: Update MSME Profile

- GSTIN and PAN cannot be updated (admin override required)
- All updates logged in audit trail

#### FR-MSME-004: MSME Listing & Search

- 20 per page, paginated, sorted by most recently updated
- Search by: business name, GSTIN, city
- Filter by: risk category, sector, state, score range, loan status
- Each row: business name, masked GSTIN, score, risk badge, last scored date

---

#### FR-DATA-001: GST Filing Upload

- CSV/JSON upload with template
- Required: filing_period, filing_type, filed_on_time, filing_date, taxable_revenue, tax_paid
- Validation: format, required columns, dates, no duplicates
- Invalid rows flagged with row number + reason; valid rows still imported
- Minimum 6 months required for scoring

#### FR-DATA-002: Transaction / Cash Flow Upload

- CSV/JSON with template
- Required: month, total_inflow, total_outflow, upi_transaction_count, upi_volume, cheque_bounced_count, vendor_payments_punctuality
- Minimum 6 months required for scoring

#### FR-DATA-003: Manual Single-Record Entry

- Form for individual GST or transaction records
- Same validation as bulk; duplicate period prompts update confirmation

#### FR-DATA-004: View Ingested Data

- Sortable/filterable tables for GST and transaction records
- Warning if data insufficient for scoring (< 6 months)
- Delete with confirmation + audit log

---

#### FR-SCORE-001: Trigger Credit Score Generation

- "Generate Score" button on MSME profile
- Validates: ≥ 6 months GST + ≥ 6 months transactions
- Pipeline: assemble features → call ML service → store score → update MSME → audit log
- Must complete within 10 seconds
- Graceful fallback if ML service unavailable

#### FR-SCORE-002: Feature Engineering (ML Service)

Features computed:
- `gst_filing_rate`, `gst_on_time_rate`, `avg_monthly_revenue`, `revenue_growth_rate`
- `avg_net_cash_flow`, `cash_flow_volatility`, `upi_volume_growth`
- `cheque_bounce_rate`, `vendor_payment_score`, `nil_return_ratio`
- All normalised with pre-fitted StandardScaler

#### FR-SCORE-003: Model Scoring

- XGBoost probability (0–1) mapped to 300–850: `score = 300 + (probability × 550)`
- SHAP TreeExplainer for feature contributions
- Risk mapping: 300–549 High, 550–699 Medium, 700–850 Low

#### FR-SCORE-004: Score History

- Line chart over time (Recharts) with risk category colours
- History table: date, score, risk, triggering user, model version

---

#### FR-SHAP-001: Feature Impact Display

- Horizontal bar chart: green (positive) bars right, red (negative) bars left
- Features sorted by absolute impact
- Bank officers see numerical SHAP values; MSME owners see plain-English only

#### FR-SHAP-002: Plain-English Explanation

- Auto-generated from SHAP values via rule-based templates
- Encouraging and actionable tone
- Stored in `CreditScore.explanationText`

---

#### FR-RISK-001: Risk Badge Display

- Colours: Low = Green, Medium = Amber, High = Red
- Always shown with numerical score
- Tooltip explains each category

#### FR-RISK-002: Risk Summary (Bank Officer)

- Portfolio donut chart by risk category
- Summary cards with counts
- Click segment to filter MSME list

---

#### FR-DASH-001: MSME Owner Dashboard

- Summary cards: Latest Score, Risk Category, Score Change, Data Completeness %
- Revenue trend chart (12 months), Cash flow chart (6 months)
- SHAP panel, Data status panel
- CTA if no score exists

#### FR-DASH-002: Bank Officer Dashboard

- Portfolio summary: total MSMEs, scored, pending loans, avg score
- Risk distribution donut chart, Recent activity feed
- Top 5 MSMEs by score, Stress alert panel, Search bar

#### FR-DASH-003: Score Gauge Component

- SVG arc: 300–850, coloured zones (red/amber/green)
- Score number centred, risk label below
- Animated sweep from 300 to actual score over 1.2 seconds

---

### 20.3 Phase 2 — High-Impact Features

> **Target completion**: End of Month 3 (Sprint 4–6)

#### FR-LOAN-001: Loan Eligibility Assessment

Score-based recommendation mapping:

| Score | Amount | Interest | Notes |
|-------|--------|----------|-------|
| 700–850 | Up to ₹50L | 8–10% | Fast-track eligible |
| 650–699 | Up to ₹25L | 10–13% | Standard review |
| 600–649 | Up to ₹10L | 13–16% | Enhanced docs needed |
| 550–599 | Up to ₹5L | 16–20% | Collateral may be required |
| 300–549 | Not recommended | — | Re-apply after improvement |

Government schemes: Mudra Yojana (500+), CGTMSE (600+), PSB 59 Min (650+), PM SVANidhi (sector-specific)

#### FR-LOAN-002: Loan Application Submission

- Fields: requested amount, purpose, repayment tenure
- Must link to score < 90 days old
- Email + in-app notification to officer on submit

#### FR-LOAN-003: Loan Application Management

- Officer sees: MSME profile + score + SHAP + recommended vs requested amount
- Actions: approve (with remarks/amount), reject (mandatory reason), request more docs
- All decisions logged; email notifications sent

---

#### FR-STRESS-001: Stress Signal Computation

Signals detected at score generation:
- `gst_filing_gap`: no filing 2+ consecutive months
- `revenue_decline_sharp`: > 30% quarterly revenue drop
- `cash_flow_negative_streak`: negative net cash flow 3+ months
- `cheque_bounce_increase`: > 50% QoQ bounce rate increase
- `upi_volume_crash`: > 40% MoM UPI volume drop
- `nil_return_spike`: 2+ consecutive nil returns after active filings

Severity: `warning` (yellow) or `critical` (red)

#### FR-STRESS-002: Stress Alert Display

- Bank officer dashboard: dedicated "Stress Alerts" panel
- MSME owner: collapsible section with plain-English guidance
- Officers can "acknowledge" signals

---

#### FR-KYC-001: Document Upload

- Types: Aadhaar, PAN, business registration, bank statement, P&L
- Formats: PDF, JPG, PNG — max 10MB per file
- Status starts as `pending`

#### FR-KYC-002: Document Verification (Officer Review)

- Side-by-side viewer: document preview + actions
- Actions: Approve, Reject (with reason), Request Re-upload
- Rejection triggers email to MSME owner

#### FR-KYC-003: Basic OCR Data Extraction

- Tesseract.js for bank statement PDF extraction
- Extracts: account holder, account number (masked), monthly totals
- User confirms before saving; fallback to manual entry if confidence < 70%

---

#### FR-FRAUD-001: Anomaly Detection Rules

Rules evaluated at scoring time:
- GST revenue vs transaction mismatch (> 2×)
- Sudden revenue spike (> 5× trailing 3-month avg)
- Implausible vendor payments (perfect score + negative cash flow)
- Duplicate GSTIN across profiles
- Nil-to-active flip without gradual ramp

#### FR-FRAUD-002: Fraud Flag Display

- "Fraud Risk Indicator" panel (officers/admins only)
- Flags for human review, not auto-rejection
- Officers can clear or escalate each flag

---

### 20.4 Phase 3 — Advanced Features

> **Target completion**: Months 4–6 (post-MVP)

#### FR-BENCH-001: Sector Benchmarking

- Compare MSME performance against sector peers (percentile-based)
- Pre-loaded data per sector; refreshed quarterly
- Filterable by sector, state, size band

#### FR-MONITOR-001: Dynamic Credit Monitoring

- Monthly auto-rescoring job (5th of each month)
- Urgent alert if score drops 50+ points
- Monthly portfolio health report email to officers

#### FR-SCF-001: Supply Chain Finance

- Invoice upload for early payment financing
- Discount rate based on buyer risk + days to maturity + MSME score

#### FR-LANG-001: Multilingual Interface

- Language toggle: English / हिंदी / ಕನ್ನಡ
- All UI labels and score explanations translated
- Preference saved to user profile

---

### 20.5 Phase 4 — Differentiating Layer

> **Target completion**: Months 7–12

#### FR-CHAT-001: RAG-Powered Credit Advisor Chatbot

- Embedded widget on dashboard (collapsible)
- Access to: MSME score, SHAP, loan status, scheme knowledge base
- RAG with Groq API for fast inference
- Available in English, Hindi, and Kannada
- Conversation per-session only (not persisted)
- Clearly labelled as AI assistant

#### FR-API-001: Bank API Integration Layer

- Partner banks register via admin-approved onboarding
- API key with rate limiting (1000 req/day)
- `POST /api/v1/partner/score`: sync (< 10s) or async (webhook)
- HMAC-SHA256 signed webhook payloads
- OpenAPI 3.0 spec at `/api/docs`
- Sandbox environment with synthetic data

---

### 20.6 Cross-Cutting Concerns

#### Notifications

| Event | Channel | Recipient |
|-------|---------|-----------|
| Registration + email verification | Email | Registering user |
| Score generated | In-app + Email | MSME owner + assigned officer |
| Loan application submitted | In-app + Email | Assigned officer |
| Loan decision made | Email | MSME owner |
| Stress signal detected | In-app | Assigned bank officer |
| Fraud flag triggered | In-app | Assigned bank officer |
| Document rejected | Email | MSME owner |
| Monthly re-score completed | Email summary | Bank officer |
| Score drops 50+ points | Email (urgent) | Bank officer |

#### Audit Logging

Every state-changing action logs: action type, user ID + role, target MSME, affected entity, IP + user agent, timestamp (UTC), sanitised payload. Logs are append-only, admin-accessible, CSV-exportable.

#### Error Handling

- Structured JSON errors with `code`, `message`, optional `field`
- No stack traces in production (`500` returns generic message)
- ML timeouts (> 12s) return graceful error with retry
- Frontend shows user-friendly toasts for all API failures

#### Pagination

- `?page=1&limit=20` on all list endpoints
- Response: `data[]` + `pagination: { total, page, limit, totalPages }`
- Max limit: 100

#### Data Retention

| Data Type | Retention Period |
|-----------|-----------------|
| Credit scores | 7 years |
| Audit logs | 7 years |
| Uploaded documents | 3 years after last loan closure |
| Deleted user accounts | Anonymised after 30 days |
| Session tokens | 7 days |

---

*Project: CreditSaathi — AI-Powered MSME Credit Intelligence Platform*
*Prepared for: Internal Development Team*
*Confidential*
