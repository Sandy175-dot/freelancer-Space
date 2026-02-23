# FreelanceHub Deployment Guide

## Deploying to Vercel

This guide will walk you through deploying the FreelanceHub frontend to Vercel and the backend to a separate hosting service.

---

## 📋 Prerequisites

Before deploying, ensure you have:

- ✅ A [Vercel account](https://vercel.com/signup) (free tier available)
- ✅ A [GitHub account](https://github.com/signup) with your code pushed
- ✅ A PostgreSQL database (Railway, Render, or Supabase)
- ✅ Your backend deployed and accessible via HTTPS

---

## 🚀 Part 1: Deploy Frontend to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up" or "Login"
   - Connect your GitHub account

2. **Import Your Repository**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose your `freelancer-Space` repository
   - Click "Import"

3. **Configure Project Settings**
   
   **Framework Preset:** Vite
   
   **Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Add Environment Variables**
   
   Click "Environment Variables" and add:
   
   ```
   VITE_API_URL = https://your-backend-url.com/api
   ```
   
   Replace `your-backend-url.com` with your actual backend URL.

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (2-3 minutes)
   - Your site will be live at `https://your-project.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # From project root
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? `Y`
   - Which scope? Select your account
   - Link to existing project? `N`
   - Project name? `freelancehub` (or your choice)
   - Directory? `./` (press Enter)
   - Override settings? `N`

5. **Set Environment Variables**
   ```bash
   vercel env add VITE_API_URL
   ```
   Enter your backend API URL when prompted.

6. **Deploy to Production**
   ```bash
   vercel --prod
   ```

---

## 🖥️ Part 2: Deploy Backend

### Option A: Deploy to Render (Recommended)

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your repository
   - Select the repository

3. **Configure Service**
   
   **Settings:**
   - Name: `freelancehub-backend`
   - Region: Choose closest to your users
   - Branch: `main`
   - Root Directory: `server`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: `Free`

4. **Add Environment Variables**
   
   Click "Environment" and add:
   ```
   PORT=5001
   NODE_ENV=production
   DB_HOST=your-db-host
   DB_PORT=5432
   DB_NAME=freelancehub
   DB_USER=your-db-user
   DB_PASSWORD=your-db-password
   JWT_SECRET=your-secure-secret-key
   JWT_EXPIRE=7d
   CORS_ORIGIN=https://your-vercel-app.vercel.app
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (3-5 minutes)
   - Copy your service URL (e.g., `https://freelancehub-backend.onrender.com`)

6. **Update Frontend Environment Variable**
   - Go back to Vercel dashboard
   - Update `VITE_API_URL` to your Render backend URL
   - Redeploy frontend

### Option B: Deploy to Railway

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Service**
   - Select the `server` directory as root
   - Railway will auto-detect Node.js

4. **Add Environment Variables**
   
   Go to "Variables" tab and add all environment variables from above.

5. **Deploy**
   - Railway will automatically deploy
   - Copy your service URL from the "Settings" tab

### Option C: Deploy to Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   cd server
   heroku create freelancehub-backend
   ```

4. **Add PostgreSQL**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

5. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-secret-key
   heroku config:set JWT_EXPIRE=7d
   heroku config:set CORS_ORIGIN=https://your-vercel-app.vercel.app
   ```

6. **Deploy**
   ```bash
   git subtree push --prefix server heroku main
   ```

---

## 🗄️ Part 3: Setup Database

### Option A: Railway PostgreSQL (Recommended)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)

2. **Add PostgreSQL**
   - Click "New Project"
   - Select "Provision PostgreSQL"

3. **Get Connection Details**
   - Click on PostgreSQL service
   - Go to "Connect" tab
   - Copy connection details

4. **Run Database Schema**
   ```bash
   # Connect to Railway PostgreSQL
   psql postgresql://user:pass@host:port/database
   
   # Run schema
   \i supabase-schema.sql
   ```

### Option B: Render PostgreSQL

1. **Create Database**
   - In Render dashboard, click "New +" → "PostgreSQL"
   - Choose free tier
   - Name: `freelancehub-db`

2. **Get Connection String**
   - Copy the "External Database URL"

3. **Update Backend Environment Variables**
   - Parse the connection string and update DB_* variables

### Option C: Supabase

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project

2. **Run SQL Schema**
   - Go to SQL Editor
   - Paste contents of `supabase-schema.sql`
   - Run the query

3. **Get Connection Details**
   - Go to Settings → Database
   - Copy connection pooling details

---

## ✅ Post-Deployment Checklist

### 1. Verify Frontend Deployment

- [ ] Visit your Vercel URL
- [ ] Check if landing page loads correctly
- [ ] Test dark/light mode toggle
- [ ] Verify all images load
- [ ] Test navigation between pages

### 2. Verify Backend Deployment

- [ ] Visit `https://your-backend-url.com/api/jobs`
- [ ] Should return JSON response
- [ ] Check server logs for errors

### 3. Test Authentication

- [ ] Try to sign up a new user
- [ ] Verify email validation works
- [ ] Test login functionality
- [ ] Check if JWT token is stored
- [ ] Test protected routes

### 4. Test Core Features

- [ ] Post a job (as client)
- [ ] Browse jobs (as freelancer)
- [ ] Submit a bid
- [ ] View dashboard analytics
- [ ] Test profile updates

### 5. Performance Checks

- [ ] Run Lighthouse audit
- [ ] Check page load times
- [ ] Verify API response times
- [ ] Test on mobile devices

---

## 🔧 Troubleshooting

### Frontend Issues

**Build Fails on Vercel**
```bash
# Check build logs in Vercel dashboard
# Common issues:
# 1. Missing environment variables
# 2. Node version mismatch
# 3. Dependency conflicts

# Solution: Add .nvmrc file
echo "18" > .nvmrc
git add .nvmrc
git commit -m "Add Node version"
git push
```

**API Requests Fail**
```bash
# Check CORS settings in backend
# Ensure CORS_ORIGIN matches your Vercel URL
# Update server/.env:
CORS_ORIGIN=https://your-app.vercel.app
```

**Environment Variables Not Working**
```bash
# Vercel requires VITE_ prefix for client-side variables
# Make sure your .env has:
VITE_API_URL=https://your-backend.com/api

# Redeploy after adding variables
vercel --prod
```

### Backend Issues

**Database Connection Fails**
```bash
# Check connection string format
# PostgreSQL format:
postgresql://user:password@host:port/database

# Test connection locally first
npm run db:test
```

**CORS Errors**
```javascript
// Update server/server.js
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
```

**Port Issues**
```javascript
// Ensure server uses PORT from environment
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 🔄 Continuous Deployment

### Automatic Deployments

Vercel automatically deploys when you push to GitHub:

1. **Push to main branch** → Production deployment
2. **Push to other branches** → Preview deployment
3. **Open Pull Request** → Preview deployment with unique URL

### Manual Deployments

```bash
# Deploy specific branch
vercel --prod

# Deploy with specific environment
vercel --prod --env production
```

---

## 🌐 Custom Domain Setup

### Add Custom Domain to Vercel

1. **Go to Project Settings**
   - Select your project in Vercel
   - Go to "Settings" → "Domains"

2. **Add Domain**
   - Enter your domain (e.g., `freelancehub.com`)
   - Click "Add"

3. **Configure DNS**
   
   Add these records to your domain provider:
   
   **For root domain:**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```
   
   **For www subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

4. **Wait for DNS Propagation**
   - Usually takes 5-30 minutes
   - Vercel will automatically provision SSL certificate

---

## 📊 Monitoring & Analytics

### Vercel Analytics

1. **Enable Analytics**
   - Go to project settings
   - Click "Analytics" tab
   - Enable Web Analytics

2. **View Metrics**
   - Page views
   - Unique visitors
   - Performance scores
   - Real User Monitoring

### Backend Monitoring

**Using Render:**
- Built-in metrics dashboard
- View logs in real-time
- Set up health checks

**Using Railway:**
- Metrics tab shows CPU/Memory usage
- Logs tab for debugging
- Alerts for downtime

---

## 🔐 Security Best Practices

### Environment Variables

- ✅ Never commit `.env` files
- ✅ Use different secrets for production
- ✅ Rotate JWT secrets regularly
- ✅ Use strong database passwords

### CORS Configuration

```javascript
// Production CORS setup
const allowedOrigins = [
  'https://your-app.vercel.app',
  'https://www.your-domain.com'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

### Database Security

- ✅ Use connection pooling
- ✅ Enable SSL for database connections
- ✅ Restrict database access by IP
- ✅ Regular backups

---

## 💰 Cost Estimation

### Free Tier Limits

**Vercel (Frontend):**
- ✅ 100 GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Automatic SSL
- ✅ Custom domains

**Render (Backend):**
- ✅ 750 hours/month (free tier)
- ⚠️ Spins down after 15 min inactivity
- ✅ 100 GB bandwidth/month

**Railway (Database):**
- ✅ $5 free credit/month
- ⚠️ Pay as you go after credit

### Paid Plans (Optional)

**Vercel Pro:** $20/month
- More bandwidth
- Advanced analytics
- Team collaboration

**Render Starter:** $7/month
- Always-on service
- More resources

---

## 📞 Support

If you encounter issues during deployment:

1. Check Vercel deployment logs
2. Check backend service logs
3. Review this guide's troubleshooting section
4. Open an issue on GitHub
5. Contact support@freelancehub.com

---

## ✅ Deployment Complete!

Your FreelanceHub platform is now live! 🎉

**Next Steps:**
1. Share your live URL
2. Monitor performance
3. Gather user feedback
4. Plan future updates

**Your URLs:**
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.onrender.com`
- Database: Managed by hosting provider

---

<div align="center">

**Happy Deploying! 🚀**

[Back to README](./README.md)

</div>
