import request from 'supertest';
import app from '../../app';
import db from '../../db';

it('returns an error if bookTitle is not provided', async () => {
    const res = await request(app)
        .post('/api/reading-list')
        .send({ author: 'Some Author' });

    expect(res.statusCode).toEqual(400);
});

it('returns an error if author is not provided', async () => {
    const res = await request(app)
        .post('/api/reading-list')
        .send({ bookTitle: 'A Book' });

    expect(res.statusCode).toEqual(400);
});

it('returns a book object', async () => {
    const bookData = { author: 'An Author', bookTitle: 'A Book' };

    const res = await request(app).post('/api/reading-list').send(bookData);

    expect(res.statusCode).toEqual(201);
    expect(res.body.book.title).toEqual(bookData.bookTitle);
    expect(res.body.book.author).toEqual(bookData.author);

    const addedBook = db.findById(res.body.book.id);

    expect(addedBook).toBeTruthy();
});
