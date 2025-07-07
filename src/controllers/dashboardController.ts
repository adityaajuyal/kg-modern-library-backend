import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [
      totalBooks,
      totalUsers,
      totalIssued,
      totalOverdue,
      totalFines,
    ] = await Promise.all([
      prisma.book.count({ where: { isActive: true } }),
      prisma.user.count({ where: { isActive: true } }),
      prisma.issueRecord.count({ where: { status: 'ISSUED' } }),
      prisma.issueRecord.count({ 
        where: { 
          status: 'ISSUED',
          dueDate: { lt: new Date() }
        } 
      }),
      prisma.fine.count({ where: { status: 'PENDING' } }),
    ]);

    const recentActivity = await prisma.issueRecord.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        book: {
          select: {
            title: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: {
        totalBooks,
        totalUsers,
        totalIssued,
        totalOverdue,
        totalFines,
        recentActivity,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
