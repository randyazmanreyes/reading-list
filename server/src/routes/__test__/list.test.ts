import request from 'supertest';
import app from '../../app';

it('lists all added books', async () => {
    const bookData = [
        { author: 'Author One', bookTitle: 'Title One' },
        { author: 'Author Two', bookTitle: 'Title Two' },
        { author: 'Author Three', bookTitle: 'Title Three' },
    ];

    await request(app).post('/api/reading-list').send(bookData[0]);
    await request(app).post('/api/reading-list').send(bookData[1]);
    await request(app).post('/api/reading-list').send(bookData[2]);

    const res = await request(app).get('/api/reading-list');

    expect(res.body.books.length).toEqual(bookData.length);
});
