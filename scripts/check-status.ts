#!/usr/bin/env node
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkStatus() {
  try {
    console.log('🔄 Checking system status...\n');
    
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connection: OK');
    
    // Check if tables exist
    const userCount = await prisma.user.count();
    const bookCount = await prisma.book.count();
    const issueCount = await prisma.issueRecord.count();
    
    console.log(`📊 Database statistics:`);
    console.log(`   Users: ${userCount}`);
    console.log(`   Books: ${bookCount}`);
    console.log(`   Issues: ${issueCount}`);
    
    // Check if admin user exists
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });
    
    if (adminUser) {
      console.log(`👑 Admin user found: ${adminUser.email}`);
    } else {
      console.log('⚠️  No admin user found. Please run the seed script.');
    }
    
    console.log('\n🎉 System status check completed successfully!');
    
  } catch (error) {
    console.error('❌ Error checking system status:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

checkStatus();
