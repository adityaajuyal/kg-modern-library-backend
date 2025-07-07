import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getFines = async (req: Request, res: Response) => {
  try {
    const fines = await prisma.fine.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      data: fines,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const getMyFines = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    const fines = await prisma.fine.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      data: fines,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const payFine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const fine = await prisma.fine.update({
      where: { id },
      data: {
        status: 'PAID',
        paidAt: new Date(),
      },
    });

    res.json({
      success: true,
      message: 'Fine paid successfully',
      data: fine,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const waiveFine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const fine = await prisma.fine.update({
      where: { id },
      data: {
        status: 'WAIVED',
      },
    });

    res.json({
      success: true,
      message: 'Fine waived successfully',
      data: fine,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
