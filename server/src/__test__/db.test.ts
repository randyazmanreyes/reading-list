import db from '../db';

it('creates a new book', async () => {
    const bookData = { title: 'A Book', author: 'An Author' };

    db.create(bookData.title, bookData.author);

    const books = db.findAll();

    expect(books.length).toEqual(1);
});

it('lists all books', async () => {
    const bookData = [
        { author: 'Author One', bookTitle: 'Title One' },
        { author: 'Author Two', bookTitle: 'Title Two' },
        { author: 'Author Three', bookTitle: 'Title Three' },
    ];

    bookData.forEach((b) => {
        db.create(b.bookTitle, b.author);
    });

    const books = db.findAll();

    expect(books.length).toEqual(bookData.length);
});

it('deletes a book', async () => {
    const bookData = [
        { author: 'Author One', bookTitle: 'Title One' },
        { author: 'Author Two', bookTitle: 'Title Two' },
        { author: 'Author Three', bookTitle: 'Title Three' },
    ];

    bookData.forEach((b) => {
        db.create(b.bookTitle, b.author);
    });

    let books = db.findAll();
    const [book] = books;

    db.deleteById(book.id);

    books = db.findAll();

    expect(books.length).toEqual(bookData.length - 1);
});
