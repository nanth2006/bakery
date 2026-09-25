# 🚀 Sweet Store (Bakery) Deployment Guide

This repository contains two parts:
1. **Backend**: Express + MongoDB API (`/backend`)
2. **Frontend**: Vite + React 19 Client (`/frontend/bakery`)

---

## 🛠️ Step 1: Deploy Backend (Render / Railway)

### Recommended: [Render.com](https://render.com) (Free Tier available)
1. Push your code to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com/) -> Click **New +** -> **Web Service**.
3. Connect your GitHub repository: `nanth2006/bakery`.
4. Configure the Web Service settings:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Under **Environment Variables**, add:
   - `PORT`: `5000` (or leave default assigned by Render)
   - `MONGO_URI`: `mongodb+srv://...` (your MongoDB Atlas connection string)
   - `EMAIL_USER`: `nanthakumar2006geetha02email@gmail.com`
   - `EMAIL_PASS`: `czqo mpur tdwk svqr`
   - `JWT_SECRET`: `sweetstore_super_secret_jwt_key_2026`
6. Click **Create Web Service**.
7. Copy your deployed backend URL (e.g., `https://sweet-store-backend.onrender.com`).

---

## 🎨 Step 2: Deploy Frontend (Vercel / Netlify)

### Recommended: [Vercel.com](https://vercel.com) (Zero Config)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard) -> Click **Add New...** -> **Project**.
2. Select your GitHub repository.
3. Configure Project Settings:
   - **Root Directory**: Click *Edit* and select `frontend/bakery`.
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Under **Environment Variables**, add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://sweet-store-backend.onrender.com` *(Replace with your Render backend URL)*
5. Click **Deploy**.

---

## 📁 Key Improvements & Fixes Made

- ✅ **Import Statements**:
  - Fixed broken logo import in [login.jsx](file:///c:/new%20project/task/pratise/src/sweet%20store/frontend/bakery/src/login.jsx) (`./logo.png`).
  - Added explicit `.jsx` extensions for context and component imports.
  - Wrapped router in `<BrowserRouter>` inside [bakery.jsx](file:///c:/new%20project/task/pratise/src/sweet%20store/frontend/bakery/src/bakery.jsx).
- ✅ **Centralized Dynamic API Configuration**:
  - Created [src/config/api.js](file:///c:/new%20project/task/pratise/src/sweet%20store/frontend/bakery/src/config/api.js) supporting `VITE_API_URL` with local fallback.
  - Migrated all 8 frontend components from hardcoded `localhost:5000` to `API_BASE_URL`.
- ✅ **Backend Configuration**:
  - Created [backend/package.json](file:///c:/new%20project/task/pratise/src/sweet%20store/backend/package.json) with start/dev scripts and all ESM dependencies.
  - Added [backend/.gitignore](file:///c:/new%20project/task/pratise/src/sweet%20store/backend/.gitignore) and [backend/.env.example](file:///c:/new%20project/task/pratise/src/sweet%20store/backend/.env.example).
- ✅ **SPA Routing Fix for Vercel/Netlify**:
  - Added [vercel.json](file:///c:/new%20project/task/pratise/src/sweet%20store/frontend/bakery/vercel.json) rewrites to prevent 404 on direct page reload.
  - Added [public/_redirects](file:///c:/new%20project/task/pratise/src/sweet%20store/frontend/bakery/public/_redirects) for Netlify support.
- ✅ **Upgraded Add & Edit Modal**:
  - Enhanced [addsweet.jsx](file:///c:/new%20project/task/pratise/src/sweet%20store/frontend/bakery/src/addsweet.jsx) to support editing existing items, custom badges, categories, and close callbacks.
