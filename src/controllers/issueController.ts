import { Request, Response } from 'express';
import { IssueStatus } from '@prisma/client';
import prisma from '../lib/prisma';

export const issueBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookId, userId } = req.body;

    // Check if book is available
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book || book.availableCopies <= 0) {
      res.status(400).json({
        success: false,
        message: 'Book not available',
      });
      return;
    }

    // Calculate due date (14 days from now)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    // Create issue record and update book availability
    const issueRecord = await prisma.$transaction(async (tx) => {
      // Create issue record
      const record = await tx.issueRecord.create({
        data: {
          bookId,
          userId,
          dueDate,
          status: IssueStatus.ISSUED,
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
          book: {
            select: {
              id: true,
              title: true,
              author: true,
              isbn: true,
            },
          },
        },
      });

      // Update book availability
      await tx.book.update({
        where: { id: bookId },
        data: {
          availableCopies: {
            decrement: 1,
          },
        },
      });

      return record;
    });

    res.status(201).json({
      success: true,
      message: 'Book issued successfully',
      data: issueRecord,
    });
  } catch (error) {
    console.error('Issue book error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const returnBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { issueRecordId } = req.body;

    const issueRecord = await prisma.issueRecord.findUnique({
      where: { id: issueRecordId },
      include: { book: true },
    });

    if (!issueRecord) {
      res.status(404).json({
        success: false,
        message: 'Issue record not found',
      });
      return;
    }

    if (issueRecord.status !== IssueStatus.ISSUED) {
      res.status(400).json({
        success: false,
        message: 'Book is not currently issued',
      });
      return;
    }

    // Calculate fine if book is returned late
    const today = new Date();
    const dueDate = new Date(issueRecord.dueDate);
    const isLate = today > dueDate;
    let fineAmount = 0;

    if (isLate) {
      const daysLate = Math.ceil((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
      fineAmount = daysLate * 5; // ₹5 per day
    }

    // Update issue record and book availability
    const updatedRecord = await prisma.$transaction(async (tx) => {
      // Update issue record
      const record = await tx.issueRecord.update({
        where: { id: issueRecordId },
        data: {
          returnDate: today,
          status: IssueStatus.RETURNED,
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
          book: {
            select: {
              id: true,
              title: true,
              author: true,
              isbn: true,
            },
          },
        },
      });

      // Update book availability
      await tx.book.update({
        where: { id: issueRecord.bookId },
        data: {
          availableCopies: {
            increment: 1,
          },
        },
      });

      // Create fine record if applicable
      if (fineAmount > 0) {
        await tx.fine.create({
          data: {
            userId: issueRecord.userId,
            issueRecordId: issueRecordId,
            amount: fineAmount,
            reason: `Late return - ${Math.ceil((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))} days late`,
          },
        });
      }

      return record;
    });

    res.json({
      success: true,
      message: 'Book returned successfully',
      data: {
        issueRecord: updatedRecord,
        fine: fineAmount > 0 ? {
          amount: fineAmount,
          reason: `Late return - ${Math.ceil((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))} days late`,
        } : null,
      },
    });
  } catch (error) {
    console.error('Return book error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const getIssueRecords = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = '1', limit = '10', status, userId } = req.query;

    const where: any = {};
    if (status) where.status = status;
    if (userId) where.userId = userId;

    const issueRecords = await prisma.issueRecord.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        book: {
          select: {
            id: true,
            title: true,
            author: true,
            isbn: true,
          },
        },
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.issueRecord.count({ where });

    res.json({
      success: true,
      data: issueRecords,
      meta: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Get issue records error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const getMyIssues = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;

    const issueRecords = await prisma.issueRecord.findMany({
      where: { userId },
      include: {
        book: {
          select: {
            id: true,
            title: true,
            author: true,
            isbn: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      data: issueRecords,
    });
  } catch (error) {
    console.error('Get my issues error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
