# 🚀 CivicSolve — Real-World Cloud Deployment Guide

This project is fully configured and optimized for zero-friction deployment to any cloud hosting provider.

---

## ⚡ Deployment Options At a Glance

| Platform | Best For | Deploy Type | Time | Routing Config |
|---|---|---|---|---|
| **Vercel** | Fastest static frontend + Edge CDN | Client (Vite) | ~2 min | Included (`vercel.json`) |
| **Netlify** | Global CDN frontend | Client (Vite) | ~2 min | Included (`netlify.toml` + `_redirects`) |
| **Render / Railway** | Full-stack (React Frontend + Express API) | Full-Stack (Node.js) | ~3 min | Included (`npm start` via `server/index.ts`) |
| **Docker / Cloud Run** | Enterprise container hosting (AWS, GCP, VPS) | Container | ~5 min | Included (`Dockerfile` + `.dockerignore`) |

---

## Option 1: Vercel (Recommended for Instant Web Hosting)

1. **Push your code to GitHub / GitLab / Bitbucket**:
   ```bash
   git init
   git add .
   git commit -m "feat: production ready civicsolve platform"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/civicsolve.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in.
   - Click **"Add New Project"** and select your `civicsolve` repository.
   - Vercel will automatically detect **Vite**:
     - **Framework Preset**: `Vite`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - *(Optional)* Add Environment Variables:
     - `GEMINI_API_KEY`: Your Google Gemini API Key (optional — deterministic engine works automatically without it).
   - Click **"Deploy"**.

3. **Routing is Pre-Configured**:
   - `vercel.json` is already configured in the repository root so refreshing routes like `/report`, `/challenges`, `/admin`, `/workspace`, and `/impact` will load smoothly without 404s.

---

## Option 2: Netlify

1. Go to [netlify.com](https://netlify.com) and click **"Add new site"** → **"Import an existing project"**.
2. Select your Git repository.
3. Netlify automatically reads [`netlify.toml`](./netlify.toml):
   - **Build Command**: `npm run build`
   - **Publish directory**: `dist`
4. Click **"Deploy site"**.
5. SPA single-page routing is handled automatically by [`public/_redirects`](./public/_redirects) and [`netlify.toml`](./netlify.toml).

---

## Option 3: Render / Railway (Full-Stack Express + React)

CivicSolve has a built-in Express server (`server/index.ts`) that serves both the `/api/ai` endpoints and the production-built React frontend in `/dist`.

### Deploying on Render:
1. Go to [render.com](https://render.com) and create a **"New Web Service"**.
2. Connect your Git repository.
3. Configure settings:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `3001` (Render automatically injects `PORT`)
   - `GEMINI_API_KEY`: *(Optional)* Your Gemini API key.
5. Click **"Create Web Service"**.

---

## Option 4: Docker / Google Cloud Run / AWS / VPS

A production-ready multi-stage [`Dockerfile`](./Dockerfile) and [`.dockerignore`](./.dockerignore) are included.

1. **Build the Docker container locally or on your server**:
   ```bash
   docker build -t civicsolve-platform .
   ```

2. **Run the container**:
   ```bash
   docker run -d -p 3001:3001 -e GEMINI_API_KEY="your_api_key_here" --name civicsolve civicsolve-platform
   ```
3. Open `http://localhost:3001` in your browser.

---

## 🛠️ Pre-Upload Verification Checklist

- [x] **Zero TypeScript & Vite Build Errors**: `npm run build` passes with exit code 0.
- [x] **Smart Modular Chunking**: Core JavaScript bundle is only ~216 kB with GeoJSON vectors loaded as separate cached chunks.
- [x] **SEO & Social Cards**: Meta description, keywords, OpenGraph, Twitter Cards, and `theme-color` configured in `index.html`.
- [x] **Branded SVG Favicon**: Custom vector hub icon created in `public/favicon.svg`.
- [x] **Git Safety**: `.gitignore` configured to prevent committing `.env`, `node_modules`, or build artifacts.
- [x] **Offline / Demo Resilience**: Built-in deterministic AI triage and local 24-district dataset activate automatically if external cloud services are offline.
