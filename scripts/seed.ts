import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/password';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  console.log('🧹 Clearing existing data...');
  await prisma.fine.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.issueRecord.deleteMany();
  await prisma.book.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  console.log('👤 Creating admin user...');
  const adminPassword = await hashPassword('admin123');
  const admin = await prisma.user.create({
    data: {
      email: 'admin@library.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      phone: '+1234567890',
      address: 'Library Administration Office',
      isActive: true,
    },
  });

  // Create sample users
  console.log('👥 Creating sample users...');
  const userPassword = await hashPassword('user123');
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john.doe@example.com',
        password: userPassword,
        firstName: 'John',
        lastName: 'Doe',
        role: 'USER',
        phone: '+1234567891',
        address: '123 Main St, City, State',
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'jane.smith@example.com',
        password: userPassword,
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'USER',
        phone: '+1234567892',
        address: '456 Oak Ave, City, State',
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'bob.johnson@example.com',
        password: userPassword,
        firstName: 'Bob',
        lastName: 'Johnson',
        role: 'USER',
        phone: '+1234567893',
        address: '789 Pine St, City, State',
        isActive: true,
      },
    }),
  ]);

  // Create sample books
  console.log('📚 Creating sample books...');
  const books = await Promise.all([
    prisma.book.create({
      data: {
        title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        author: 'Robert C. Martin',
        isbn: '978-0132350884',
        publisher: 'Prentice Hall',
        publishYear: 2008,
        category: 'Programming',
        description: 'A handbook of agile software craftsmanship that teaches clean coding practices.',
        totalCopies: 5,
        availableCopies: 3,
        location: 'Section A, Shelf 1',
        isActive: true,
      },
    }),
    prisma.book.create({
      data: {
        title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
        author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
        isbn: '978-0201633610',
        publisher: 'Addison-Wesley',
        publishYear: 1994,
        category: 'Programming',
        description: 'Classic book on software design patterns.',
        totalCopies: 3,
        availableCopies: 2,
        location: 'Section A, Shelf 2',
        isActive: true,
      },
    }),
    prisma.book.create({
      data: {
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt, David Thomas',
        isbn: '978-0201616224',
        publisher: 'Addison-Wesley',
        publishYear: 1999,
        category: 'Programming',
        description: 'Your journey to mastery in software development.',
        totalCopies: 4,
        availableCopies: 4,
        location: 'Section A, Shelf 3',
        isActive: true,
      },
    }),
    prisma.book.create({
      data: {
        title: 'Introduction to Algorithms',
        author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein',
        isbn: '978-0262033848',
        publisher: 'MIT Press',
        publishYear: 2009,
        category: 'Computer Science',
        description: 'Comprehensive introduction to algorithms.',
        totalCopies: 6,
        availableCopies: 5,
        location: 'Section B, Shelf 1',
        isActive: true,
      },
    }),
    prisma.book.create({
      data: {
        title: 'Data Structures and Algorithms in Python',
        author: 'Michael T. Goodrich, Roberto Tamassia, Michael H. Goldwasser',
        isbn: '978-1118290279',
        publisher: 'Wiley',
        publishYear: 2013,
        category: 'Computer Science',
        description: 'Data structures and algorithms using Python.',
        totalCopies: 4,
        availableCopies: 3,
        location: 'Section B, Shelf 2',
        isActive: true,
      },
    }),
    prisma.book.create({
      data: {
        title: 'JavaScript: The Good Parts',
        author: 'Douglas Crockford',
        isbn: '978-0596517748',
        publisher: 'O\'Reilly Media',
        publishYear: 2008,
        category: 'Web Development',
        description: 'Discover the good parts of JavaScript.',
        totalCopies: 3,
        availableCopies: 2,
        location: 'Section C, Shelf 1',
        isActive: true,
      },
    }),
    prisma.book.create({
      data: {
        title: 'React: Up & Running',
        author: 'Stoyan Stefanov',
        isbn: '978-1491931820',
        publisher: 'O\'Reilly Media',
        publishYear: 2016,
        category: 'Web Development',
        description: 'Building web applications with React.',
        totalCopies: 2,
        availableCopies: 1,
        location: 'Section C, Shelf 2',
        isActive: true,
      },
    }),
    prisma.book.create({
      data: {
        title: 'Node.js: The Right Way',
        author: 'Jim R. Wilson',
        isbn: '978-1680501957',
        publisher: 'The Pragmatic Bookshelf',
        publishYear: 2018,
        category: 'Web Development',
        description: 'Practical server-side JavaScript that scales.',
        totalCopies: 3,
        availableCopies: 3,
        location: 'Section C, Shelf 3',
        isActive: true,
      },
    }),
    prisma.book.create({
      data: {
        title: 'Database System Concepts',
        author: 'Abraham Silberschatz, Henry F. Korth, S. Sudarshan',
        isbn: '978-0078022159',
        publisher: 'McGraw-Hill',
        publishYear: 2019,
        category: 'Database',
        description: 'Comprehensive database system concepts.',
        totalCopies: 5,
        availableCopies: 4,
        location: 'Section D, Shelf 1',
        isActive: true,
      },
    }),
    prisma.book.create({
      data: {
        title: 'Machine Learning: A Probabilistic Perspective',
        author: 'Kevin P. Murphy',
        isbn: '978-0262018029',
        publisher: 'MIT Press',
        publishYear: 2012,
        category: 'Machine Learning',
        description: 'Comprehensive introduction to machine learning.',
        totalCopies: 3,
        availableCopies: 2,
        location: 'Section E, Shelf 1',
        isActive: true,
      },
    }),
  ]);

  // Create sample issue records
  console.log('📋 Creating sample issue records...');
  const issueRecords = await Promise.all([
    prisma.issueRecord.create({
      data: {
        bookId: books[0].id,
        userId: users[0].id,
        issueDate: new Date(),
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        status: 'ISSUED',
      },
    }),
    prisma.issueRecord.create({
      data: {
        bookId: books[1].id,
        userId: users[1].id,
        issueDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        status: 'ISSUED',
      },
    }),
  ]);

  // Create sample reservations
  console.log('📝 Creating sample reservations...');
  const reservations = await Promise.all([
    prisma.reservation.create({
      data: {
        bookId: books[5].id,
        userId: users[2].id,
        status: 'ACTIVE',
        reservationDate: new Date(),
        expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      },
    }),
  ]);

  // Create sample fines
  console.log('💰 Creating sample fines...');
  const fines = await Promise.all([
    prisma.fine.create({
      data: {
        userId: users[0].id,
        issueRecordId: issueRecords[0].id,
        amount: 5.00,
        reason: 'Late return',
        status: 'PENDING',
      },
    }),
  ]);

  console.log('✅ Database seeding completed successfully!');
  console.log('');
  console.log('📊 Summary:');
  console.log(`👤 Admin user: admin@library.com (password: admin123)`);
  console.log(`👥 Regular users: ${users.length} users (password: user123)`);
  console.log(`📚 Books: ${books.length} books`);
  console.log(`📋 Issue records: ${issueRecords.length} records`);
  console.log(`📝 Reservations: ${reservations.length} reservations`);
  console.log(`💰 Fines: ${fines.length} fines`);
  console.log('');
  console.log('🚀 You can now start the server and test the application!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
