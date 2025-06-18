# Code0 – AI-Powered Coding Platform

Code0 is a full-stack coding practice platform designed to help users solve programming problems, visualize execution, and improve through intelligent feedback. It integrates a modern React frontend, a Node.js backend, and Judge0 API for code execution. AI and gamification features are part of the roadmap.

## Features

1. Solve coding problems with custom test cases.
2. Real-time code execution using Judge0 API.
3. Leaderboard for competitive tracking.
4. Submission history and status.
5. Planned support for:
   - AI feedback 
   - Code similarity detection
   - Code playback visualizer
   - Daily challenge and gamification
   - Public solutions and collaboration
   - Rate limiting, logging, and DevOps enhancements

## Tech Stack

Frontend:
- React
- Vite
- Tailwind CSS

Backend:
- Node.js
- Express
- Prisma ORM

Database:
- PostgreSQL

Other:
- Judge0 for code execution
- Planned: Docker, Redis, Gemini AI
## Folder Structure

```
Code0-main/
├── frontend/                         # React-based client (Vite + Tailwind )
│   ├── public/                       # Static files
│   ├── src/                          # Source code
│   │   ├── components/               # Reusable UI components
│   │   ├── pages/                    # Page-level views
│   │   ├── hooks/                    # Custom React hooks
│   │   └── ...                       # Other support files
│   ├── index.html                    # HTML entry point
│   ├── package.json                  # Frontend dependencies
│   └── vite.config.js                # Vite configuration
│
└── backend/                          # Node.js backend API with Prisma ORM
    ├── prisma/                       # Prisma schema & migrations
    │   ├── schema.prisma             # DB schema definition
    │   └── migrations/               # DB migration history
    ├── src/                          # Backend source files
    │   ├── controllers/              # Route logic handlers
    │   ├── routes/                   # Express route definitions
    │   ├── services/                 # Business logic
    │   └── ...                       # Other backend logic
    ├── package.json                  # Backend dependencies
    └── .env                          # Environment variables
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL
- Optional: Local Judge0 instance or online access

### Backend Setup

1. Navigate to backend folder:
   cd backend

2. Install dependencies:
   npm install

3. Setup database:
   npx prisma generate
   npx prisma migrate dev

4. Run the server:
   npm run dev

### Frontend Setup

1. Navigate to frontend folder:
   cd frontend

2. Install dependencies:
   npm install

3. Run the development server:
   npm run dev

## Planned Roadmap

Phase 3 – Personalization & Gamification:
- Code playback visualization
- Gamification with badges and streaks
- Daily challenges
- Code similarity detection
- Progress tracker

Phase 4 – Community & Collaboration:
- Discussion tabs
- Public solution feed
- Pair programming and mentorship
- Voice feedback via AI

Phase 5 – DevOps & Performance:
- Redis caching
- Async queue with BullMQ
- Rate limiting
- Logging, Sentry integration
- GitHub Actions CI/CD

## Security & Access Control

- Role-based authentication and authorization
- JWT/session handling
