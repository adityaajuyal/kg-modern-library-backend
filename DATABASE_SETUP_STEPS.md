# Database Setup and Deployment Steps

## Step 1: Update DATABASE_URL
✅ Replace the DATABASE_URL in your .env file with your Supabase connection string

## Step 2: Generate Database Schema
Run these commands in your terminal:

```bash
# Generate Prisma client
npx prisma generate

# Push the schema to your database
npx prisma db push
```

## Step 3: Test Local Connection
```bash
# Start the server
npm run dev

# Test the API endpoints
curl http://localhost:5000/health
curl http://localhost:5000/api/books
```

## Step 4: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository: `adityaajuyal/kg-modern-library-backend`
3. Set these environment variables in Vercel:

```
DATABASE_URL=your_supabase_connection_string
JWT_SECRET=48d5acea570bf970b7a0a1e022739fdaaef07dd1f3f13940d31616cca63cbbea9f6f0a57635c2ade4c0add49741f0f9d99c82b85577c94a623f94c480c9b3d
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

## Step 5: Deploy and Test
1. Deploy the backend
2. Get the backend URL (e.g., `https://kg-modern-library-backend.vercel.app`)
3. Test the API endpoints:
   - `https://your-backend-url.vercel.app/health`
   - `https://your-backend-url.vercel.app/api/books`

## Step 6: Update Frontend
Update your frontend's `.env` file with the backend URL:
```
VITE_API_URL=https://your-backend-url.vercel.app/api
```

## Step 7: Deploy Frontend
Deploy your frontend to Vercel and update the CORS_ORIGIN in your backend environment variables.

---

**Next Action:** Update your DATABASE_URL in the .env file, then run the commands in Step 2.
