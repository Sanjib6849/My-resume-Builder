# Backend Integration Contracts

## Overview
This document outlines the API contracts, data models, and integration points between frontend and backend for the Resume Builder application.

## Current Mock Data (to be replaced with real backend)

### Location: `/app/frontend/src/mock.js`

**Mock Data Elements:**
1. `mockResumeData` - Sample resume with all sections
2. `mockTemplates` - 6 resume templates
3. `mockAISuggestions` - AI-generated content suggestions
4. `mockExportFunctions` - Export to PDF/Word/Text (console.log only)
5. `getAISuggestions()` - Simulated AI API call

## API Endpoints to Implement

### 1. Authentication Endpoints

**POST /api/auth/register**
- Request: `{ email, password, name }`
- Response: `{ user, token }`

**POST /api/auth/login**
- Request: `{ email, password }`
- Response: `{ user, token }`

**GET /api/auth/me** (Protected)
- Headers: `Authorization: Bearer <token>`
- Response: `{ user }`

### 2. Resume Management Endpoints

**POST /api/resumes** (Protected)
- Create new resume
- Request: Full resume data object
- Response: `{ id, ...resumeData, createdAt, updatedAt }`

**GET /api/resumes** (Protected)
- Get all user's resumes
- Response: `[{ id, title, ...resumeData, createdAt, updatedAt }]`

**GET /api/resumes/:id** (Protected)
- Get specific resume
- Response: `{ id, ...resumeData }`

**PUT /api/resumes/:id** (Protected)
- Update resume
- Request: Updated resume data
- Response: `{ id, ...resumeData, updatedAt }`

**DELETE /api/resumes/:id** (Protected)
- Delete resume
- Response: `{ message: "Resume deleted" }`

### 3. AI Suggestions Endpoint

**POST /api/ai/suggestions**
- Generate AI content suggestions using OpenAI GPT-4
- Request: `{ type: 'experience'|'skills'|'summary', context: string }`
- Response: `{ suggestions: string[] }`
- Uses Emergent LLM Key: `sk-emergent-81d47D5D05401C082F`

### 3.1 ATS Compatibility Analyzer Endpoint

**POST /api/ats/analyze**
- Analyze resume for ATS compatibility using OpenAI GPT-4
- Request: `{ resumeData: object, jobDescription: string }`
- Response: 
```json
{
  "score": number (0-100),
  "scoreDescription": string,
  "missingKeywords": string[],
  "matchingKeywords": string[],
  "recommendations": string[],
  "formattingIssues": string[]
}
```
- Uses Emergent LLM Key: `sk-emergent-81d47D5D05401C082F`
- AI analyzes:
  - Keyword matching between resume and job description
  - ATS-friendly formatting
  - Section structure and headings
  - Quantifiable achievements
  - Industry-specific terminology

### 4. Export Endpoints

**POST /api/export/pdf**
- Request: `{ resumeData, templateId }`
- Response: PDF file download

**POST /api/export/word**
- Request: `{ resumeData, templateId }`
- Response: Word (.docx) file download

**POST /api/export/text**
- Request: `{ resumeData }`
- Response: Plain text file download

## MongoDB Data Models

### User Model
```python
{
    "_id": ObjectId,
    "email": str,
    "password": str (hashed),
    "name": str,
    "createdAt": datetime,
    "updatedAt": datetime
}
```

### Resume Model
```python
{
    "_id": ObjectId,
    "userId": ObjectId,  # Reference to User (None for guest users)
    "title": str,  # Optional resume title
    "personalInfo": {
        "fullName": str,
        "email": str,
        "phone": str,
        "location": str,
        "linkedin": str,
        "website": str,
        "summary": str
    },
    "experience": [
        {
            "id": str,
            "company": str,
            "position": str,
            "location": str,
            "startDate": str,
            "endDate": str,
            "current": bool,
            "description": str
        }
    ],
    "education": [
        {
            "id": str,
            "school": str,
            "degree": str,
            "field": str,
            "location": str,
            "startDate": str,
            "endDate": str,
            "gpa": str
        }
    ],
    "skills": {
        "technical": [str],
        "soft": [str]
    },
    "projects": [
        {
            "id": str,
            "name": str,
            "description": str,
            "technologies": [str],
            "link": str
        }
    ],
    "certifications": [
        {
            "id": str,
            "name": str,
            "issuer": str,
            "date": str
        }
    ],
    "languages": [
        {
            "id": str,
            "language": str,
            "proficiency": str
        }
    ],
    "customSections": [
        {
            "id": str,
            "title": str,
            "content": str
        }
    ],
    "createdAt": datetime,
    "updatedAt": datetime
}
```

## Frontend Integration Points

### Files to Update:

1. **BuilderPage.jsx**
   - Replace `useState(mockResumeData)` with API call to fetch resume
   - Implement real save function calling `PUT /api/resumes/:id`
   - Add loading states

2. **EditorPanel.jsx**
   - Replace `getAISuggestions()` mock with real API call to `/api/ai/suggestions`
   - Update to show AI suggestions in a proper UI (dropdown/modal)

3. **ATSAnalyzer.jsx** (NEW FEATURE)
   - Replace `analyzeATSScore()` mock with real API call to `/api/ats/analyze`
   - Currently shows mock ATS score, keywords, and recommendations
   - Backend will use OpenAI GPT-4 to analyze resume against job description

4. **ExportOptions.jsx**
   - Replace mock export functions with real API calls
   - Implement actual file downloads

5. **AuthPage.jsx**
   - Connect to real `/api/auth/login` and `/api/auth/register`
   - Store JWT token in localStorage
   - Redirect to builder after successful auth

6. **Create new file: `/app/frontend/src/api/client.js`**
   - Centralized API client with axios
   - Handle authentication headers
   - Error handling

## Required Backend Dependencies

```
openai>=1.0.0        # For AI suggestions
PyPDF2>=3.0.0        # For PDF generation
reportlab>=4.0.0     # For PDF creation
python-docx>=1.0.0   # For Word document generation
PyJWT>=2.8.0         # For authentication
passlib>=1.7.4       # For password hashing
```

## Environment Variables

Add to `/app/backend/.env`:
```
OPENAI_API_KEY=sk-emergent-81d47D5D05401C082F
JWT_SECRET=<generate-random-secret>
JWT_ALGORITHM=HS256
```

## Implementation Order

1. **Phase 1: Authentication**
   - User model
   - Auth endpoints (register, login, me)
   - JWT middleware

2. **Phase 2: Resume CRUD**
   - Resume model
   - CRUD endpoints
   - Connect frontend to save/load resumes

3. **Phase 3: AI Integration**
   - OpenAI GPT-4 integration for content suggestions
   - AI suggestions endpoint
   - ATS Compatibility Analyzer endpoint (NEW)
   - Connect frontend AI buttons and ATS analyzer

4. **Phase 4: Export Functionality**
   - PDF generation
   - Word document generation
   - Plain text export
   - Connect frontend export buttons

## Guest User Functionality

- Guest users can build resumes without authentication
- Data stored in localStorage only
- Option to "Save to Account" prompts login/register
- After auth, import localStorage data to backend

## Notes

- All protected endpoints require `Authorization: Bearer <token>` header
- Frontend will check for token in localStorage on app load
- If token exists, fetch user data and redirect appropriately
- Resume data structure remains the same between frontend and backend
- Templates are frontend-only (styling logic)
