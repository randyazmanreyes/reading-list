import request from 'supertest';
import app from '../../app';
import IBook from '../../model/book';

it('deletes a book by ID', async () => {
    const bookData = [
        { author: 'Author One', bookTitle: 'Title One' },
        { author: 'Author Two', bookTitle: 'Title Two' },
        { author: 'Author Three', bookTitle: 'Title Three' },
    ];

    await request(app).post('/api/reading-list').send(bookData[0]);
    await request(app).post('/api/reading-list').send(bookData[1]);
    await request(app).post('/api/reading-list').send(bookData[2]);

    let listRes = await request(app).get('/api/reading-list');

    expect(listRes.body.books.length).toEqual(bookData.length);

    const books = listRes.body.books as IBook[];
    const [book] = books;

    await request(app).delete(`/api/reading-list/${book.id}`);

    listRes = await request(app).get('/api/reading-list');

    expect(listRes.body.books.length).toEqual(bookData.length - 1);
});

it('returns an error if book is not found', async () => {
    const invalidBookId = 'invalidbookid';
    const bookData = { author: 'An Author', bookTitle: 'A Book' };

    await request(app).post('/api/reading-list').send(bookData);

    const deleteRes = await request(app).delete(
        `/api/reading-list/${invalidBookId}`
    );

    expect(deleteRes.statusCode).toEqual(404);
});
