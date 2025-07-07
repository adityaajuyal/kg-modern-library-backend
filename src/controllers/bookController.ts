import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../lib/prisma';
import { bookSchema, bookUpdateSchema } from '../utils/validation';

// Get all books
export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = '1', limit = '10', search, category } = req.query;
    
    const where: Prisma.BookWhereInput = {
      isActive: true,
      ...(search && {
        OR: [
          { title: { contains: search as string, mode: Prisma.QueryMode.insensitive } },
          { author: { contains: search as string, mode: Prisma.QueryMode.insensitive } },
          { isbn: { contains: search as string, mode: Prisma.QueryMode.insensitive } },
        ],
      }),
      ...(category && { category: category as string }),
    };

    const books = await prisma.book.findMany({
      where,
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.book.count({ where });

    res.json({
      success: true,
      data: books,
      meta: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Get book by ID
export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const book = await prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
      return;
    }

    res.json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error('Get book error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Create new book
export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = bookSchema.parse(req.body);

    // Check if ISBN already exists
    const existingBook = await prisma.book.findUnique({
      where: { isbn: validatedData.isbn },
    });

    if (existingBook) {
      res.status(409).json({
        success: false,
        message: 'Book with this ISBN already exists',
      });
      return;
    }

    const book = await prisma.book.create({
      data: {
        ...validatedData,
        availableCopies: validatedData.totalCopies,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book,
    });
  } catch (error) {
    console.error('Create book error:', error);
    if (error instanceof Error) {
      res.status(400).json({ 
        success: false,
        message: error.message 
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
};

// Update book
export const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const validatedData = bookUpdateSchema.parse(req.body);

    // Check if book exists
    const existingBook = await prisma.book.findUnique({
      where: { id },
    });

    if (!existingBook) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
      return;
    }

    // If ISBN is being updated, check if it conflicts with another book
    if (validatedData.isbn && validatedData.isbn !== existingBook.isbn) {
      const conflictingBook = await prisma.book.findUnique({
        where: { isbn: validatedData.isbn },
      });

      if (conflictingBook) {
        res.status(409).json({
          success: false,
          message: 'Another book with this ISBN already exists',
        });
        return;
      }
    }

    const book = await prisma.book.update({
      where: { id },
      data: validatedData,
    });

    res.json({
      success: true,
      message: 'Book updated successfully',
      data: book,
    });
  } catch (error) {
    console.error('Update book error:', error);
    if (error instanceof Error) {
      res.status(400).json({ 
        success: false,
        message: error.message 
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
};

// Delete book
export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if book exists
    const existingBook = await prisma.book.findUnique({
      where: { id },
    });

    if (!existingBook) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
      return;
    }

    // Soft delete (set isActive to false)
    await prisma.book.update({
      where: { id },
      data: { isActive: false },
    });

    res.json({
      success: true,
      message: 'Book deleted successfully',
    });
  } catch (error) {
    console.error('Delete book error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Search books
export const searchBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q, category, page = '1', limit = '10' } = req.query;

    const where: Prisma.BookWhereInput = {
      isActive: true,
      ...(q && {
        OR: [
          { title: { contains: q as string, mode: Prisma.QueryMode.insensitive } },
          { author: { contains: q as string, mode: Prisma.QueryMode.insensitive } },
          { isbn: { contains: q as string, mode: Prisma.QueryMode.insensitive } },
        ],
      }),
      ...(category && { category: category as string }),
    };

    const books = await prisma.book.findMany({
      where,
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.book.count({ where });

    res.json({
      success: true,
      data: books,
      meta: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Search books error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
