# CyberShield AI — Next-Gen AI Cybersecurity Threat Analyzer

> **"Don't Just Detect the Threat. Know What to Do Next."**

[![Next.js](https://img.shields.io/badge/Next.js-16.4.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-3D_WebGL-brightgreen?style=flat&logo=three.js)](https://threejs.org/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-1.5_Flash-orange?style=flat&logo=google)](https://deepmind.google/technologies/gemini/)
[![Tests](https://img.shields.io/badge/Tests-36%2F36_Passing-success?style=flat)](https://github.com/)

CyberShield AI is an intelligent cybersecurity threat analyzer designed to protect everyday users and enterprise security analysts from deceptive online attacks. It analyzes suspicious URLs, emails, SMS, and WhatsApp messages, exposes forensic indicators, scores risk deterministically, and generates tailored incident response action plans.

---

## 🎯 Problem Statement & Core Value Proposition

Modern cyber threats (phishing, smishing, spear-phishing, credential theft, and OTP extraction) exploit human psychology and subtle technical obfuscations:
- **Punycode / IDN Homograph attacks** that look identical to legitimate domains.
- **Brand name spoofing** in subdomains or URL paths (e.g. `paypal.com.verify-login-update.xyz`).
- **Psychological manipulation** (urgency deadlines, fake legal action, panic scaring, job offers).
- **OTP extraction scams** that bypass Two-Factor Authentication (2FA).

Most scanners only produce a binary "Safe/Malicious" score without explaining *why* or providing guidance on *what to do if the user already interacted*. CyberShield AI solves this end-to-end:
1. **Multi-layered Detection:** Combines **30+ deterministic heuristics** with **Google Gemini 1.5 semantic analysis** and **threat intelligence reputation lookups**.
2. **Deterministic Risk Engine:** A predictable, non-hallucinating scoring framework (0–100) that cannot be manipulated via prompt injection.
3. **Explainable Forensics:** Categorized signals with severity levels, technical evidence, and plain-English explanations.
4. **Actionable Incident Response:** Personalized recovery playbooks based on user actions (*"I clicked the link"*, *"I entered credentials"*, *"I shared OTP"*).
5. **Privacy First (Zero-Knowledge):** Built-in PII redaction (credit cards, SSNs, phone numbers) before data is sent to AI or stored locally.

---

## 🏗️ Architecture & Processing Pipeline

```
[ User Input (URL or Message) ]
              │
              ▼
   [ Input Validation (Zod) ] ──▶ [ Anti-Prompt-Injection Filter ]
              │
              ▼
   [ PII Sanitization & Redaction ] (Masks CC, SSN, Credentials)
              │
    ┌─────────┴────────────────────────┐
    ▼                                  ▼
[ URL Forensic Engine ]     [ Message NLP Heuristics Engine ]
• Protocol & TLD checks     • Urgency & Fear Tactics
• Punycode / Homograph      • Credential & OTP Demands
• Typosquatting distance    • Impersonation Patterns
• IP obfuscation detection  • Financial & Job Scams
    └─────────┬────────────────────────┘
              ▼
  [ Deterministic Scoring (0-100) ]
              │
              ▼
  [ Threat Intelligence (VirusTotal) ] (Optional live reputation)
              │
              ▼
  [ Semantic AI Reasoning (Gemini) ] (Untrusted sandboxed analysis)
              │
              ▼
  [ Threat Classification & Incident Response Playbook Generator ]
```

---

## 🛡️ Supported Threat Categories

| Threat Category | Description | Primary Indicators |
|---|---|---|
| **Phishing Attack** | Fake login portals & brand theft | Typosquatting, brand in subdomain, credential keywords |
| **OTP / 2FA Theft** | Active session interception | Requests to forward/share one-time authentication codes |
| **Credential Theft** | Password & identity harvesting | Unsolicited password forms, login prompts on HTTP/third-party domains |
| **Financial Scam** | Fund extortion or fake investments | Wire transfer demands, crypto wallet requests, fake lottery prizes |
| **Impersonation Scam** | Spoofing trusted institutions | Spoofing banks, government agencies, delivery services, tech support |
| **Job Offer Scam** | Advance fee or money mule scams | Unrealistic daily earnings, work-from-home without interview |
| **Delivery Scam** | Fake parcel delivery notifications | Urgent parcel fee requests, fake courier tracking links |

---

## 🔒 Security & Privacy Architecture

- **Bank-Grade HTTP Security Headers:** Configured in `next.config.ts` including strict `Content-Security-Policy`, `Strict-Transport-Security` (HSTS), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Cross-Origin-Opener-Policy`.
- **Server-Side API Key Secrecy:** All Gemini API keys and threat intelligence credentials remain exclusively server-side.
- **In-Memory Rate Limiting:** Sliding-window rate limiting per IP prevents automated scraping and Denial of Service.
- **Strict Input Validation:** Zod schemas restrict payload length, structure, and character sets.
- **No Server-Side Data Retention:** User scans and logs are processed ephemerally in-memory; history is preserved solely in the user's browser `localStorage`.

---

## ♿ Accessibility (WCAG 2.1 AA / AAA Compliance)

- **Accessible Focus Rings:** Clear, high-contrast `:focus-visible` styling across all interactive elements.
- **Skip Link:** Dedicated `<a href="#main-content" className="skip-link">` for keyboard users.
- **Screen Reader Support:** Semantic HTML5 (`<main>`, `<nav>`, `<header>`, `<footer>`), `.sr-only` descriptions, and descriptive `aria-label` / `aria-current` attributes.
- **Dynamic Live Regions:** `role="status"` and `aria-live="polite"` announce scan state changes to assistive devices.
- **Color Contrast:** Curated color palette ensuring contrast ratios exceeding 7:1 against dark backgrounds.

---

## 🧪 Testing Suite & Quality Assurance

CyberShield AI includes automated unit and integration tests covering the deterministic security engines, threat classifier, and risk scoring:

```bash
# Run the complete test suite (36 tests)
npm test

# Run ESLint validation (0 errors, 0 warnings)
npm run lint

# Run TypeScript strict type verification
npx tsc --noEmit
```

### Test Coverage Highlights
- **URL Engine:** HTTP vs HTTPS, IP address detection, punycode homographs, subdomains, @ symbols, URL shorteners, typosquatting.
- **Message Engine:** Urgency detection, fear tactics, OTP scams, job scams, credential requests, sensitive data redaction, prompt injection immunity.
- **Classifier & Scoring:** Risk boundaries (LOW, MODERATE, SUSPICIOUS, HIGH, CRITICAL), compound scoring, confidence metrics.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or Node.js 20+
- npm or pnpm

### 1. Installation
```bash
git clone https://github.com/your-username/cybershieldai.git
cd cybershieldai
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory:
```env
# Optional: Google Gemini API key for semantic AI summaries
# (If omitted, the deterministic fallback engine continues to run at 100% capacity)
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: VirusTotal API key for live reputation data
VIRUSTOTAL_API_KEY=your_virustotal_api_key_here
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 API Reference

### `POST /api/analyze`
Analyzes a URL or text message.

**Request Body:**
```json
{
  "input": "http://paypa1-security-verification.com/login",
  "type": "url" // "url" | "message" | "auto"
}
```

**Response:**
```json
{
  "id": "c1f7a28b-...",
  "timestamp": "2026-10-09T...",
  "inputType": "url",
  "riskScore": 85,
  "riskLevel": "CRITICAL",
  "classification": "phishing",
  "classificationDisplay": "Phishing Attack",
  "confidence": "high",
  "signals": [
    {
      "type": "Typosquatting / Brand Resemblance",
      "severity": "critical",
      "evidence": "Resembles brand 'paypal'",
      "explanation": "Domain closely mimics a legitimate brand name.",
      "scoreContribution": 25
    }
  ],
  "recommendations": [
    "Do not enter passwords or personal data.",
    "Report this domain to the targeted institution."
  ]
}
```

---

## ⚖️ License & Disclaimer

CyberShield AI is built for educational, demonstration, and security assessment purposes. Always verify critical alerts directly with authentic service providers.
