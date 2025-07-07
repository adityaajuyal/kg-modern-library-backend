# Backend Deployment to Vercel - Step by Step

## Prerequisites
✅ Code pushed to GitHub: https://github.com/adityaajuyal/kg-modern-library-backend
✅ Supabase project created and DATABASE_URL obtained

## Vercel Deployment Steps

### 1. Import Project to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Find and import `kg-modern-library-backend`

### 2. Configure Build Settings
- **Framework Preset**: Other
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. Environment Variables
Add these in the Vercel dashboard:

```
DATABASE_URL=your_supabase_connection_string_here
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

**Important Notes:**
- Replace `your_supabase_connection_string_here` with your actual Supabase DATABASE_URL
- Generate a strong JWT_SECRET (you can use: `openssl rand -base64 32`)
- CORS_ORIGIN will be updated after you deploy the frontend

### 4. Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Note your backend URL (e.g., `https://kg-modern-library-backend.vercel.app`)

### 5. Run Database Migration
After deployment, run this command in your terminal:
```bash
npx prisma migrate deploy
```

### 6. Test API
Your API will be available at: `https://your-backend-url.vercel.app/api`

Test endpoints:
- `GET /api/health` - Health check
- `GET /api/books` - Get all books
- `POST /api/auth/login` - Login

## Next Steps
1. Deploy frontend and get the frontend URL
2. Update CORS_ORIGIN environment variable with the frontend URL
3. Update frontend to use the backend API URL
4. Test the complete application

## Troubleshooting
- If build fails, check the build logs in Vercel dashboard
- Make sure all environment variables are set correctly
- Check that the DATABASE_URL is valid and accessible
