# Step 2: Backend Deployment Instructions

## 🎯 Deploy Backend to Vercel:

### Method 1: Manual Upload (Fastest)
1. Go to https://vercel.com → New Project
2. Select "Browse" and upload this entire `server` folder
3. Vercel will auto-detect Node.js
4. Click "Deploy"

### Method 2: GitHub (Professional)
1. Push your code to GitHub
2. Connect GitHub to Vercel
3. Import repository
4. Set Root Directory to `server`

## ⚙️ Environment Variables to Add:
After deployment, go to Project Settings → Environment Variables:

```
DATABASE_URL = postgresql://postgres:[YOUR_PASSWORD]@[HOST]:5432/postgres
JWT_SECRET = kg-modern-library-jwt-secret-key-123456789
NODE_ENV = production
CORS_ORIGIN = *
```

## 🔗 After Deployment:
1. Copy your backend URL (e.g., `https://your-backend.vercel.app`)
2. Update frontend API URL
3. Test API endpoints

## ✅ Backend Features:
- `/api/books` - Book management
- `/api/users` - User authentication  
- `/api/issues` - Book issues/returns
- `/api/admin` - Admin functions

Your AdminBooksPageWithAPI.tsx will connect to these endpoints!
