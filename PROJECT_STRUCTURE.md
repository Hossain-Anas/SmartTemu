# SmartTemu Project Structure

This document outlines the complete folder structure of the SmartTemu MERN stack project.

## Root Directory

```
V1/
├── backend/              # Node.js/Express Backend
├── frontend/             # React Frontend
├── docs/                 # Project Documentation
├── scripts/              # Utility Scripts
├── .gitignore           # Git ignore rules
├── .gitattributes       # Git attributes for line endings
├── README.md            # Main project README
├── GIT_WORKFLOW.md      # Git collaboration guide
├── VERSIONS.md          # Version specifications
└── PROJECT_STRUCTURE.md # This file
```

## Backend Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── database.js
│   │   ├── cloudinary.js
│   │   ├── stripe.js
│   │   └── email.js
│   ├── models/          # MongoDB Models (Mongoose)
│   ├── controllers/     # Business Logic Controllers
│   ├── routes/          # API Routes
│   ├── middleware/      # Custom Middleware
│   ├── services/        # Service Layer
│   ├── ai/              # AI/ML Modules
│   │   ├── semanticSearch.js
│   │   ├── recommendations.js
│   │   ├── sentimentAnalysis.js
│   │   ├── chatbot.js
│   │   ├── models/
│   │   └── utils/
│   ├── utils/           # Utility Functions
│   ├── validators/      # Input Validation Schemas
│   └── server.js        # Express app entry point
├── uploads/             # Uploaded files
│   ├── products/
│   └── avatars/
├── tests/               # Backend Tests
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── .env.example         # Environment variables template
├── package.json
└── README.md
```

## Frontend Structure

```
frontend/
├── public/
│   └── images/
├── src/
│   ├── components/      # Reusable Components
│   │   ├── common/      # Shared components
│   │   ├── product/     # Product components
│   │   ├── cart/        # Cart components
│   │   ├── checkout/    # Checkout components
│   │   ├── review/      # Review components
│   │   ├── ai/          # AI feature components
│   │   └── admin/       # Admin components
│   ├── pages/           # Page Components (Routes)
│   ├── context/         # React Context API
│   ├── hooks/           # Custom React Hooks
│   ├── services/        # API Services
│   ├── utils/           # Utility Functions
│   ├── styles/          # Global Styles
│   ├── assets/          # Static Assets
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── .env.example         # Environment variables template
├── index.html           # Vite entry HTML file
├── vite.config.js       # Vite configuration
├── package.json
└── README.md
```

## Documentation Structure

```
docs/
├── api/                 # API Documentation
├── database/            # Database Schema Documentation
├── deployment/          # Deployment Guides
└── ai/                  # AI Features Documentation
```

## Scripts Structure

```
scripts/
├── seed.js              # Database seeding script
├── backup.js            # Database backup script
└── setup.sh             # Initial setup script
```

## Important Notes

1. **Empty Folders**: Folders with `.gitkeep` files are intentionally empty and will be populated as development progresses.

2. **Environment Files**: 
   - `.env.example` files are templates (create `.env` files locally from these)
   - `.env` files are gitignored and should never be committed

3. **Uploads Folder**: 
   - `backend/uploads/` is gitignored (user-uploaded content)
   - Only `.gitkeep` files are tracked to maintain folder structure

4. **AI Modules**: 
   - Located in `backend/src/ai/`
   - Can use external APIs (OpenAI, etc.) or local ML models
   - Models folder reserved for local ML models if needed

## Next Steps

1. Initialize Git repository
2. Create GitHub repository
3. Install dependencies in both backend and frontend
4. Set up environment variables
5. Start development!

