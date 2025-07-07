import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      firstName: 'System',
      lastName: 'Administrator',
      role: 'ADMIN',
      isActive: true,
    },
  });

  // Create sample users
  const userPassword = await bcrypt.hash('user123', 10);
  
  const sampleUsers = [
    {
      email: 'john.doe@example.com',
      password: userPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: 'USER' as const,
      isActive: true,
    },
    {
      email: 'jane.smith@example.com',
      password: userPassword,
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'USER' as const,
      isActive: true,
    },
    {
      email: 'bob.wilson@example.com',
      password: userPassword,
      firstName: 'Bob',
      lastName: 'Wilson',
      role: 'USER' as const,
      isActive: true,
    },
  ];

  for (const user of sampleUsers) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  // Create sample books
  const sampleBooks = [
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '978-0-7432-7356-5',
      publisher: 'Scribner',
      publishYear: 1925,
      category: 'Classic Literature',
      description: 'A classic American novel set in the Jazz Age',
      totalCopies: 5,
      availableCopies: 5,
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      isbn: '978-0-06-112008-4',
      publisher: 'J.B. Lippincott & Co.',
      publishYear: 1960,
      category: 'Fiction',
      description: 'A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice',
      totalCopies: 3,
      availableCopies: 3,
    },
    {
      title: '1984',
      author: 'George Orwell',
      isbn: '978-0-452-28423-4',
      publisher: 'Secker & Warburg',
      publishYear: 1949,
      category: 'Dystopian Fiction',
      description: 'A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism',
      totalCopies: 4,
      availableCopies: 4,
    },
    {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      isbn: '978-0-14-143951-8',
      publisher: 'T. Egerton',
      publishYear: 1813,
      category: 'Romance',
      description: 'A romantic novel that critiques the British landed gentry at the end of the 18th century',
      totalCopies: 2,
      availableCopies: 2,
    },
    {
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      isbn: '978-0-316-76948-0',
      publisher: 'Little, Brown and Company',
      publishYear: 1951,
      category: 'Coming-of-age Fiction',
      description: 'A controversial novel originally published for adults, it has since become popular with adolescent readers',
      totalCopies: 3,
      availableCopies: 3,
    },
    {
      title: 'Harry Potter and the Philosopher\'s Stone',
      author: 'J.K. Rowling',
      isbn: '978-0-7475-3269-9',
      publisher: 'Bloomsbury',
      publishYear: 1997,
      category: 'Fantasy',
      description: 'The first novel in the Harry Potter series',
      totalCopies: 6,
      availableCopies: 6,
    },
    {
      title: 'The Lord of the Rings',
      author: 'J.R.R. Tolkien',
      isbn: '978-0-544-00341-5',
      publisher: 'George Allen & Unwin',
      publishYear: 1954,
      category: 'Fantasy',
      description: 'An epic high fantasy novel',
      totalCopies: 4,
      availableCopies: 4,
    },
    {
      title: 'Dune',
      author: 'Frank Herbert',
      isbn: '978-0-441-17271-9',
      publisher: 'Chilton Books',
      publishYear: 1965,
      category: 'Science Fiction',
      description: 'A science fiction novel set in the distant future',
      totalCopies: 3,
      availableCopies: 3,
    },
    {
      title: 'The Hitchhiker\'s Guide to the Galaxy',
      author: 'Douglas Adams',
      isbn: '978-0-345-39180-3',
      publisher: 'Pan Books',
      publishYear: 1979,
      category: 'Science Fiction Comedy',
      description: 'A comedy science fiction franchise',
      totalCopies: 2,
      availableCopies: 2,
    },
    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '978-0-13-235088-4',
      publisher: 'Prentice Hall',
      publishYear: 2008,
      category: 'Programming',
      description: 'A handbook of agile software craftsmanship',
      totalCopies: 3,
      availableCopies: 3,
    },
  ];

  for (const book of sampleBooks) {
    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {},
      create: book,
    });
  }

  console.log('Database seeded successfully!');
  console.log('Admin user created:');
  console.log('  Email: admin@example.com');
  console.log('  Password: admin123');
  console.log('');
  console.log('Sample users created:');
  console.log('  john.doe@example.com / user123');
  console.log('  jane.smith@example.com / user123');
  console.log('  bob.wilson@example.com / user123');
  console.log('');
  console.log(`Created ${sampleBooks.length} sample books`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
