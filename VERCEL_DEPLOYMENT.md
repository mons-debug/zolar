# 🚀 Vercel Deployment Guide for ZOLAR Landing Page

## ✅ Pre-Deployment Checklist

### Build Status: ✅ READY
- ✅ **TypeScript errors:** Fixed
- ✅ **ESLint errors:** Fixed  
- ✅ **Build process:** Successful (9.0s)
- ✅ **Static pages:** Generated (8/8)
- ✅ **API routes:** Working (/api/whitelist, /api/whitelist-test)
- ✅ **Configuration:** vercel.json optimized

## 🌟 Deployment Options

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with GitHub account
3. **Import Project:**
   - Click "New Project"
   - Select "Import Git Repository"
   - Enter: `https://github.com/mons-debug/zolar.git`
   - Click "Import"

4. **Configure Project:**
   - **Project Name:** `zolar-landing` (or any name)
   - **Framework:** Next.js (auto-detected)
   - **Root Directory:** `./zolar-landing`
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd /path/to/zolar-landing
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: zolar-landing
# - Directory: ./
# - Deploy? Yes
```

## 🔧 Environment Variables Setup

### Required Variables (Add in Vercel Dashboard):

1. **Go to Project Settings → Environment Variables**
2. **Add these variables:**

```bash
# Database (MongoDB Atlas)
DATABASE_URL=mongodb+srv://mounssifbnsr:xJhsgRMpvjOK0PdH@clusterzolar.swwydlx.mongodb.net/zolar_landing?retryWrites=true&w=majority

# Twilio WhatsApp (Optional)
TWILIO_SID=your_twilio_account_sid_here
TWILIO_AUTH=your_twilio_auth_token_here
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886

# Production Environment
NODE_ENV=production
```

### Environment Variable Setup Steps:
1. **Dashboard:** Project → Settings → Environment Variables
2. **Add Variable:** Click "Add"
3. **Name:** `DATABASE_URL`
4. **Value:** Your MongoDB Atlas connection string
5. **Environment:** All (Production, Preview, Development)
6. **Save**
7. **Repeat** for other variables

## 📋 Deployment Configuration

### Vercel.json Features:
- ✅ **Framework:** Next.js auto-detection
- ✅ **Region:** Europe (fra1) for performance
- ✅ **Runtime:** Node.js 20.x
- ✅ **Security Headers:** XSS protection, content sniffing
- ✅ **CORS:** API endpoints configured
- ✅ **API Routes:** Properly configured

### Build Settings:
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`
- **Node.js Version:** 20.x

## 🌐 Post-Deployment

### 1. Test Your Deployment
```bash
# Test main page
curl https://your-project.vercel.app

# Test API endpoints
curl -X POST https://your-project.vercel.app/api/whitelist-test \
  -H "Content-Type: application/json" \
  -d '{"email": "test@zolar.com"}'

# Test WhatsApp API
curl -X POST https://your-project.vercel.app/api/whitelist-test \
  -H "Content-Type: application/json" \
  -d '{"phone": "+212612345678"}'
```

### 2. Domain Setup (Optional)
1. **Buy custom domain** (e.g., zolar.ma)
2. **Vercel Dashboard:** Project → Settings → Domains
3. **Add Domain:** Enter your domain
4. **Configure DNS:** Follow Vercel instructions

### 3. Analytics & Monitoring
- **Vercel Analytics:** Auto-enabled for performance monitoring
- **Error Tracking:** View in Vercel Dashboard → Functions
- **Logs:** Real-time in Dashboard → Functions

## 🎯 Production URLs

After deployment, you'll get:
- **Production:** `https://zolar-landing.vercel.app`
- **Preview:** `https://zolar-landing-git-main-{username}.vercel.app`
- **API Endpoints:**
  - `https://your-domain.vercel.app/api/whitelist`
  - `https://your-domain.vercel.app/api/whitelist-test`

## 🔍 Troubleshooting

### Common Issues:

#### Build Fails:
- Check TypeScript errors: `npm run build`
- Check ESLint: `npm run lint`
- Fix any errors before redeploying

#### API Not Working:
- Verify environment variables in Vercel Dashboard
- Check function logs in Vercel Dashboard → Functions
- Test API endpoints locally first

#### Database Connection:
- Verify MongoDB Atlas connection string
- Check database whitelist in MongoDB Atlas
- Ensure cluster is running

#### WhatsApp Messages:
- Verify Twilio credentials
- Check Twilio console for errors
- Test with sandbox number first

### Debug Commands:
```bash
# Local build test
npm run build

# Local development
npm run dev

# Check types
npx tsc --noEmit

# Lint check
npm run lint
```

## 🚀 Automatic Deployments

Once connected to GitHub:
- ✅ **Main branch pushes:** Auto-deploy to production
- ✅ **Pull requests:** Auto-deploy to preview URLs
- ✅ **Branch deployments:** Each branch gets preview URL

## 📊 Performance Optimizations

Your ZOLAR landing page includes:
- ✅ **Static generation:** Pages pre-rendered
- ✅ **Image optimization:** Next.js Image component
- ✅ **Code splitting:** Automatic bundle optimization
- ✅ **Edge functions:** API routes at edge locations
- ✅ **CDN:** Global content delivery

## 🎉 Ready for Production!

Your ZOLAR landing page is fully optimized for Vercel deployment with:
- Modern countdown timer
- Email/WhatsApp collection
- MongoDB Atlas integration
- File storage fallback
- Performance optimizations
- Security headers
- CORS configuration

**Deploy now and start collecting your waitlist!** 🌟 