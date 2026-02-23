# ⚡ Quick Deploy Reference

## 🎯 Deployment Order

1. Database (Render PostgreSQL) → 2. Backend (Render) → 3. Frontend (Vercel)

---

## 📝 Quick Checklist

### Before You Start
- [ ] Code pushed to GitHub
- [ ] `.env` file configured locally
- [ ] Backend tested locally

### Database Setup (Render)
- [ ] Create PostgreSQL database
- [ ] Copy connection details
- [ ] Run `supabase-schema.sql`

### Backend Deploy (Render)
- [ ] Create Web Service
- [ ] Set Root Directory: `server`
- [ ] Add all environment variables
- [ ] Deploy and get URL
- [ ] Test `/health` endpoint

### Frontend Deploy (Vercel)
- [ ] Import GitHub repository
- [ ] Add `VITE_API_URL` environment variable
- [ ] Deploy
- [ ] Update backend CORS_ORIGIN
- [ ] Test sign up/login

---

## 🔑 Environment Variables

### Backend (Render)
```
PORT=5001
NODE_ENV=production
DB_HOST=[from database]
DB_PORT=5432
DB_NAME=freelancehub
DB_USER=[from database]
DB_PASSWORD=[from database]
JWT_SECRET=[random string]
JWT_EXPIRE=7d
CORS_ORIGIN=[your-vercel-url]
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## 🔗 Important URLs

**Render Dashboard**: https://dashboard.render.com
**Vercel Dashboard**: https://vercel.com/dashboard

---

## 🧪 Testing Endpoints

```bash
# Backend health check
https://your-backend.onrender.com/health

# Get jobs
https://your-backend.onrender.com/api/jobs

# Frontend
https://your-app.vercel.app
```

---

## 🐛 Quick Fixes

**Backend not responding?**
- Check Render logs
- Verify database connection
- Wait 60s (free tier cold start)

**CORS errors?**
- Update CORS_ORIGIN in Render
- Redeploy backend

**Build failed?**
- Check environment variables
- Verify Node version (.nvmrc = 18)
- Redeploy

---

## 📞 Support

Full guide: [DEPLOYMENT_STEPS.md](./DEPLOYMENT_STEPS.md)
Detailed docs: [DEPLOYMENT.md](./DEPLOYMENT.md)
