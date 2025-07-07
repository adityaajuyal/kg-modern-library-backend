# Backend Deployment Configuration

## Vercel Configuration
- Platform: Vercel
- Type: Node.js API
- Root Directory: server
- Build Command: npm run build
- Output Directory: dist

## Environment Variables Required:
- DATABASE_URL=your_supabase_connection_string
- JWT_SECRET=your_jwt_secret_key
- NODE_ENV=production
- CORS_ORIGIN=*

## Database Schema
Run the Prisma migrations after deployment:
```bash
npx prisma migrate deploy
npx prisma generate
```

## API Endpoints
- Base URL: https://your-backend.vercel.app
- Books: /api/books
- Users: /api/users
- Issues: /api/issues
