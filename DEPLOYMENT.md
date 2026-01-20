# Deployment Guide

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account (https://vercel.com)
- GitHub account with this repository pushed

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR-USERNAME/my-resume.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com/new
   - Import this GitHub repository
   - Set Root Directory to `frontend`
   - Add Environment Variables:
     - `REACT_APP_API_URL`: Your backend URL
   - Click Deploy

3. **Configure Backend API URL**
   - Update the `.env.production` file with your backend URL
   - Redeploy

---

## Backend Deployment (Render / Railway)

### Option 1: Deploy to Render

1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Build Command: `pip install -r backend/requirements.txt`
5. Start Command: `uvicorn backend.server:app --host 0.0.0.0 --port 10000`
6. Add Environment Variables:
   - `MONGO_URL`: Your MongoDB connection string
   - `DB_NAME`: resume_builder
   - `CORS_ORIGINS`: Your Vercel frontend URL
   - `OPENAI_API_KEY`: Your OpenAI key
7. Deploy

### Option 2: Deploy to Railway

1. Go to https://railway.app
2. Create new project
3. Add service from GitHub
4. Add environment variables
5. Railway will auto-detect and deploy

---

## Update Frontend API Calls

Make sure your frontend uses the environment variable:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

fetch(`${API_URL}/api/...`)
```

---

## MongoDB Setup

If you don't have MongoDB:
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Add to backend environment variables
