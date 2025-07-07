// Mock database for testing when real database is not available
import { Book } from '@prisma/client';

// Mock books data
const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0-7432-7356-5',
    publisher: 'Scribner',
    category: 'Fiction',
    description: 'A classic American novel about the Jazz Age',
    totalCopies: 5,
    availableCopies: 3,
    publishYear: 1925,
    coverImage: 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
    location: 'A-1-1',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0-06-112008-4',
    publisher: 'HarperCollins',
    category: 'Fiction',
    description: 'A gripping tale of racial injustice and childhood innocence',
    totalCopies: 4,
    availableCopies: 2,
    publishYear: 1960,
    coverImage: 'https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg',
    location: 'A-1-2',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0-452-28423-4',
    publisher: 'Penguin Books',
    category: 'Science Fiction',
    description: 'A dystopian social science fiction novel',
    totalCopies: 6,
    availableCopies: 4,
    publishYear: 1949,
    coverImage: 'https://covers.openlibrary.org/b/isbn/9780452284234-L.jpg',
    location: 'A-2-1',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export default mockBooks;
