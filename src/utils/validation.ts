import { z } from 'zod';

// User Registration Schema
export const userRegistrationSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  firstName: z.string().min(2, 'First name must be at least 2 characters long'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters long'),
  erp: z.string().optional(),
  rollNumber: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

// User Login Schema
export const userLoginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// Admin Login Schema
export const adminLoginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// Book Schema
export const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  isbn: z.string().min(1, 'ISBN is required'),
  publisher: z.string().optional(),
  publishYear: z.number().int().min(1000).max(new Date().getFullYear()).optional(),
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  coverImage: z.string().optional(),
  totalCopies: z.number().int().min(1, 'Total copies must be at least 1').default(1),
  availableCopies: z.number().int().min(0, 'Available copies must be non-negative').default(1),
  location: z.string().optional(),
});

// Book Update Schema
export const bookUpdateSchema = bookSchema.partial();

// Issue Book Schema
export const issueBookSchema = z.object({
  bookId: z.string().min(1, 'Book ID is required'),
  userId: z.string().min(1, 'User ID is required'),
  dueDate: z.string().datetime().optional(),
});

// Return Book Schema
export const returnBookSchema = z.object({
  issueRecordId: z.string().min(1, 'Issue record ID is required'),
});

// Update Issue Status Schema
export const updateIssueStatusSchema = z.object({
  status: z.enum(['ISSUED', 'RETURNED', 'OVERDUE', 'LOST']),
});

// Fine Schema
export const fineSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  issueRecordId: z.string().min(1, 'Issue record ID is required'),
  amount: z.number().min(0, 'Amount must be non-negative'),
  reason: z.string().min(1, 'Reason is required'),
});

// Category Schema
export const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  description: z.string().optional(),
});

// Pagination Schema
export const paginationSchema = z.object({
  page: z.string().optional().default('1'),
  limit: z.string().optional().default('10'),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
});

// Type exports
export type UserRegistration = z.infer<typeof userRegistrationSchema>;
export type UserLogin = z.infer<typeof userLoginSchema>;
export type AdminLogin = z.infer<typeof adminLoginSchema>;
export type BookCreate = z.infer<typeof bookSchema>;
export type BookUpdate = z.infer<typeof bookUpdateSchema>;
export type IssueBook = z.infer<typeof issueBookSchema>;
export type ReturnBook = z.infer<typeof returnBookSchema>;
export type UpdateIssueStatus = z.infer<typeof updateIssueStatusSchema>;
export type CreateFine = z.infer<typeof fineSchema>;
export type CreateCategory = z.infer<typeof categorySchema>;
export type PaginationQuery = z.infer<typeof paginationSchema>;
