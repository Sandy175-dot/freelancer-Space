# 🚀 FreelanceHub Deployment - Step by Step Guide

Follow these steps in order to deploy your FreelanceHub platform.

---

## 📋 What You'll Need

- [ ] GitHub account (you already have this ✅)
- [ ] Render.com account (free - we'll create this)
- [ ] Vercel account (free - we'll create this)
- [ ] 30 minutes of your time

---

## Part 1: Setup Database (10 minutes)

### Option A: Use Render PostgreSQL (Recommended - Free)

1. **Go to [render.com](https://render.com)**
   - Click "Get Started for Free"
   - Sign up with GitHub

2. **Create PostgreSQL Database**
   - Click "New +" button (top right)
   - Select "PostgreSQL"
   - Fill in:
     - Name: `freelancehub-db`
     - Database: `freelancehub`
     - User: `freelancehub_user`
     - Region: Choose closest to you
     - Plan: **Free**
   - Click "Create Database"

3. **Wait for Database to be Ready** (2-3 minutes)
   - Status will change from "Creating" to "Available"

4. **Get Connection Details**
   - Click on your database
   - Scroll down to "Connections"
   - **IMPORTANT**: Copy these values (you'll need them):
     ```
     Host: [copy this]
     Port: 5432
     Database: freelancehub
     Username: [copy this]
     Password: [copy this - click "Show" button]
     ```
   - Also copy the "External Database URL" (full connection string)

5. **Setup Database Schema**
   
   **Option 1: Using Render Dashboard (Easiest)**
   - In your database page, click "Connect" → "External Connection"
   - Click "PSQL Command" to open terminal
   - Copy and paste the contents of your `supabase-schema.sql` file
   - Press Enter to execute

   **Option 2: Using Local psql**
   ```bash
   # Use the External Database URL you copied
   psql [paste-your-external-database-url-here]
   
   # Then run:
   \i supabase-schema.sql
   ```

✅ **Database is ready!** Keep the connection details handy.

---

## Part 2: Deploy Backend to Render (10 minutes)

1. **Make Sure Your Code is Pushed to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Create Web Service on Render**
   - Go to [render.com](https://render.com) dashboard
   - Click "New +" → "Web Service"
   - Click "Connect a repository"
   - Find and select your `freelancer-Space` repository
   - Click "Connect"

3. **Configure Web Service**
   
   Fill in these settings:
   
   - **Name**: `freelancehub-backend`
   - **Region**: Same as your database
   - **Branch**: `main`
   - **Root Directory**: `server` ⚠️ **IMPORTANT**
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: **Free**

4. **Add Environment Variables**
   
   Scroll down to "Environment Variables" section and click "Add Environment Variable"
   
   Add these one by one:
   
   ```
   Key: PORT
   Value: 5001
   
   Key: NODE_ENV
   Value: production
   
   Key: DB_HOST
   Value: [paste Host from database connection details]
   
   Key: DB_PORT
   Value: 5432
   
   Key: DB_NAME
   Value: freelancehub
   
   Key: DB_USER
   Value: [paste Username from database connection details]
   
   Key: DB_PASSWORD
   Value: [paste Password from database connection details]
   
   Key: JWT_SECRET
   Value: [create a random string - example: freelancehub_prod_secret_2024_xyz123]
   
   Key: JWT_EXPIRE
   Value: 7d
   
   Key: CORS_ORIGIN
   Value: * 
   (we'll update this after deploying frontend)
   ```

5. **Deploy Backend**
   - Click "Create Web Service"
   - Wait for deployment (3-5 minutes)
   - Watch the logs - you should see "Build successful" then "Deploy successful"

6. **Get Your Backend URL**
   - At the top of the page, you'll see your service URL
   - It will look like: `https://freelancehub-backend-xxxx.onrender.com`
   - **COPY THIS URL** - you'll need it for frontend!

7. **Test Your Backend**
   - Open a new browser tab
   - Go to: `https://your-backend-url.onrender.com/health`
   - You should see:
     ```json
     {
       "status": "healthy",
       "database": "connected",
       "timestamp": "..."
     }
     ```
   - If you see this, your backend is working! ✅

⚠️ **Note**: Free tier on Render spins down after 15 minutes of inactivity. First request after inactivity may take 30-60 seconds.

---

## Part 3: Deploy Frontend to Vercel (5 minutes)

1. **Update Your .env File**
   
   Open `.env` in your project root and update:
   ```env
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```
   Replace with your actual Render backend URL from Part 2, step 6.

2. **Push Changes to GitHub**
   ```bash
   git add .env
   git commit -m "Update API URL for production"
   git push origin main
   ```

3. **Go to [vercel.com](https://vercel.com)**
   - Click "Sign Up" or "Login"
   - Choose "Continue with GitHub"
   - Authorize Vercel

4. **Import Your Repository**
   - Click "Add New..." → "Project"
   - Find your `freelancer-Space` repository
   - Click "Import"

5. **Configure Project**
   
   Vercel will auto-detect settings, but verify:
   
   - **Framework Preset**: Vite ✅
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` ✅
   - **Output Directory**: `dist` ✅

6. **Add Environment Variable**
   
   - Click "Environment Variables"
   - Add:
     ```
     Name: VITE_API_URL
     Value: https://your-backend-url.onrender.com/api
     ```
   - Select all environments (Production, Preview, Development)
   - Click "Add"

7. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - You'll see "Congratulations!" when done

8. **Get Your Frontend URL**
   - Vercel will show your live URL
   - It will look like: `https://freelancer-space-xxxx.vercel.app`
   - Click "Visit" to see your live site!

---

## Part 4: Update CORS Settings (2 minutes)

Now that you have your frontend URL, update the backend CORS settings:

1. **Go Back to Render Dashboard**
   - Find your `freelancehub-backend` service
   - Click on it

2. **Update Environment Variable**
   - Go to "Environment" tab
   - Find `CORS_ORIGIN`
   - Click "Edit"
   - Change value to: `https://your-vercel-app.vercel.app`
   - Click "Save Changes"

3. **Redeploy Backend**
   - Render will automatically redeploy
   - Wait 1-2 minutes

---

## Part 5: Test Everything! (5 minutes)

1. **Visit Your Live Site**
   - Go to your Vercel URL
   - The landing page should load

2. **Test Sign Up**
   - Click "Sign Up"
   - Create a new account (use Freelancer role)
   - Fill in the form
   - Click "Create Account"
   - You should be redirected to the dashboard

3. **Test Login**
   - Logout
   - Login with your credentials
   - Should work! ✅

4. **Test Job Browsing**
   - Go to "Browse Jobs"
   - Jobs should load (might be empty if no jobs posted yet)

5. **Test Dark Mode**
   - Click the sun/moon icon in navbar
   - Theme should switch smoothly

---

## 🎉 Congratulations!

Your FreelanceHub platform is now LIVE!

### Your URLs:

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **Database**: Managed by Render

### Share Your Project:

```
🚀 Check out my FreelanceHub platform!
Frontend: [your-vercel-url]
GitHub: https://github.com/Sandy175-dot/freelancer-Space
```

---

## 🐛 Troubleshooting

### Backend Issues

**"Application failed to respond"**
- Check Render logs: Dashboard → Your Service → Logs
- Look for database connection errors
- Verify all environment variables are set correctly

**Database connection failed**
- Double-check DB_HOST, DB_USER, DB_PASSWORD
- Make sure database is "Available" status
- Try the health check endpoint: `/health`

### Frontend Issues

**"API request failed"**
- Check if backend is running: visit `/health` endpoint
- Verify VITE_API_URL in Vercel environment variables
- Check browser console for CORS errors

**Build failed on Vercel**
- Check build logs in Vercel dashboard
- Make sure all dependencies are in package.json
- Try deploying again (sometimes it's a temporary issue)

**CORS errors in browser console**
- Update CORS_ORIGIN in Render to match your Vercel URL exactly
- Make sure to redeploy backend after changing CORS_ORIGIN

### Database Issues

**Schema not loaded**
```bash
# Connect to your database
psql [your-external-database-url]

# Check if tables exist
\dt

# If no tables, run schema again
\i supabase-schema.sql
```

---

## 📞 Need Help?

If you're stuck:

1. Check the logs:
   - Render: Dashboard → Service → Logs
   - Vercel: Dashboard → Project → Deployments → Click deployment → View Function Logs

2. Common issues are usually:
   - Missing environment variables
   - Wrong database credentials
   - CORS misconfiguration

3. Open an issue on GitHub with:
   - What step you're on
   - Error message (screenshot)
   - What you've tried

---

## 🔄 Future Deployments

After initial setup, deploying updates is easy:

```bash
# Make your changes
git add .
git commit -m "Your changes"
git push origin main
```

- **Vercel**: Automatically deploys on push ✅
- **Render**: Automatically deploys on push ✅

No manual steps needed!

---

## 💡 Next Steps

- [ ] Add custom domain (optional)
- [ ] Set up monitoring
- [ ] Enable analytics
- [ ] Add more features
- [ ] Share with users!

---

<div align="center">

**Happy Deploying! 🚀**

[Back to Main README](./README.md) | [Detailed Deployment Guide](./DEPLOYMENT.md)

</div>
