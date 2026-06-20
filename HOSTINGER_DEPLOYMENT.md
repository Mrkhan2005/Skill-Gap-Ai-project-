# NextMove AI — Hostinger Deployment Guide

This guide will help you easily set up, configure, and deploy your **NextMove AI** Full-Stack (React + Node + Express + Gemini AI) application on **Hostinger**.

---

## 🛠️ Configuration & API Key Setup (Your `.env` File)

To make the AI-powered features like resume parsing and career coaching work on Hostinger, you must supply your dynamic API key.

1. **Get your Gemini API Key:**
   Make sure you have an API key generated from [Google AI Studio](https://aistudio.google.com/).

2. **Create the Environment File:**
   In the root directory of your project on your Hostinger server (or in your deployment folder), create a file named exactly `.env`.

3. **Populate the `.env` File:**
   Open the `.env` file and insert your credentials. For example:
   ```env
   # Your AI Studio API Key (Required for resume parsing & chat coaching)
   GEMINI_API_KEY="AQ.Ab8RN6Jcs_odvy5hVaAfbLPqwNj_KkL_wh71fMYK0dZMy2uq-g"

   # Your official custom domain in Hostinger details
   APP_URL="https://nextmoveai.telentup.io/"

   # Set server execution environment to production
   NODE_ENV="production"
   ```

*Note: Hostinger also allows setting Environment Variables directly inside your hPanel for Node.js Applications. You can paste `GEMINI_API_KEY` and your actual key there.*

---

## 🚀 Step-by-Step Deployment on Hostinger Node.js App

Hostinger provides a built-in **Node.js App** management panel under **hPanel (Websites > Node.js)**. Follow these simple steps:

### Step 1: Upload the Code
1. Zip your project files **except** for `node_modules` and the `dist` directory.
2. In Hostinger hPanel, go to **Files > File Manager** and upload the zip file to your target application directory (e.g., `public_html` or a custom subfolder).
3. Extract the ZIP file in the Hostinger file manager.

### Step 2: Configure the Node.js App in hPanel
1. Navigate to **Websites > Node.js** (or use the search bar for Node.js).
2. Click **Create Application** and configure the following settings:
   - **Application Name:** `nextmove-ai`
   - **Environment:** `Production`
   - **Node.js Version:** Select **v20.x** or **v18.x** (latest recommended)
   - **Application URL:** Select your domain (e.g., `yourdomain.com`)
   - **Application Directory:** Path to your uploaded files (e.g., `/public_html`)
   - **Application Startup File:** `dist/server.cjs`

### Step 3: Define Environment Variables
Inside the Node.js dashboard, go to the **Environment Variables** section:
- Add a new variable:
  - **Key:** `GEMINI_API_KEY`
  - **Value:** *Your actual Gemini API Key (e.g., `AIzaSy...`)*
- Add another variable:
  - **Key:** `NODE_ENV`
  - **Value:** `production`

### Step 4: Run Package Installation and Build
1. Click **Install npm packages** (this is the equivalent of running `npm install`).
2. Open Hostinger's **SSH Console** or use the custom script button to run the build:
   ```bash
   npm run build
   ```
   *Why this is important:* This compiles your frontend code into optimized static files (`/dist`) and bundles your Express server backend safely into a standalone `dist/server.cjs` via `esbuild`.

### Step 5: Start the Server
1. Click **Start App** on Hostinger!
2. Your full-stack carrier intelligence engine is now live and powered by your Gemini API key!

---

## ⚙️ How the Server Binds to Hostinger

Your `server.ts` is configured to run on port `3000` inside containers. Hostinger's Node.js installer automatically sets up a reverse proxy that listens and forwards traffic to your running node process beautifully. If you need custom database connectivity, placeholders are commented inside `/src/components/` and `.env.example`.
