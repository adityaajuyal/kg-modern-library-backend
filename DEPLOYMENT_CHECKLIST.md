# 🚀 Deployment Checklist

## Backend Deployment to Vercel

### Step 1: Import Project
- [ ] Go to vercel.com
- [ ] Sign in with GitHub
- [ ] Click "New Project"
- [ ] Import `adityaajuyal/kg-modern-library-backend`

### Step 2: Configure Build Settings
- [ ] Framework Preset: **Other**
- [ ] Root Directory: `./` (default)
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Install Command: `npm install`

### Step 3: Environment Variables
Add these exact values:
```
DATABASE_URL=postgresql://postgres:aditya123@db.bdkqoyabvpcalvhngzbk.supabase.co:5432/postgres?sslmode=require
JWT_SECRET=48d5acea570bf970b7a0a1e022739fdaaef07dd1f3f13940d31616cca63cbbea9f6f0a57635c2ade4c0add49741f0f9d99c82b85577c94a623f94c480c9b3d
JWT_REFRESH_SECRET=4acHmIH1XZ4Qpyvlz5pKntDTTXBm7Dc/iGmlRnMV4bSJspLHSP6SLfnBW2pJG1aK5EGmmNtBTWPjUlh/bGjGtg==
NODE_ENV=production
CORS_ORIGIN=http://localhost:5173
```

### Step 4: Deploy
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Note your backend URL (e.g., `https://kg-modern-library-backend.vercel.app`)

### Step 5: Test API
Test these endpoints:
- [ ] `https://your-backend-url.vercel.app/health`
- [ ] `https://your-backend-url.vercel.app/api/books`

## Expected Results
✅ Health endpoint should return: `{"success":true,"message":"Server is running!","timestamp":"..."}`
✅ Books endpoint should return mock data with 3 books

## Next Steps After Backend Deployment
1. Update frontend `.env` with backend URL
2. Deploy frontend to Vercel
3. Update backend CORS_ORIGIN with frontend URL
4. Test full application
5. Fix database connection (if needed)

## Notes
- The app will work with mock data even if database connection fails
- We can fix the database connection after deployment
- All environment variables are ready for production
