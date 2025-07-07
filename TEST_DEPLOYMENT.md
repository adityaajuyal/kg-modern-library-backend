# 🚀 Testing Deployed Backend

## Step 1: Get Your Deployment URL
1. Go to [vercel.com](https://vercel.com)
2. Find your `kg-modern-library-backend` project
3. Copy the deployment URL

## Step 2: Test the Endpoints
Replace `YOUR_DEPLOYMENT_URL` with your actual Vercel URL:

### Health Check
```
https://YOUR_DEPLOYMENT_URL/health
```
**Expected Response:**
```json
{
  "success": true,
  "message": "Server is running!",
  "timestamp": "2025-07-07T..."
}
```

### Books API
```
https://YOUR_DEPLOYMENT_URL/api/books
```
**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      ...
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 3,
    "totalPages": 1
  },
  "message": "Using mock data - database not available"
}
```

## Step 3: Update Environment Variables
If the endpoints work, update your Vercel environment variables:

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Make sure all these are set correctly:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `JWT_REFRESH_SECRET`
   - `NODE_ENV=production`
   - `CORS_ORIGIN=http://localhost:5173`

## Step 4: Test Results
- ✅ If both endpoints work: **Backend is deployed successfully!**
- ❌ If endpoints don't work: **Check build logs and configuration**

## Next Steps After Successful Backend Deployment
1. Update frontend to use the backend URL
2. Deploy frontend to Vercel
3. Update backend CORS_ORIGIN with frontend URL
4. Test full application
