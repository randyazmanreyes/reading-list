import cryptoRandomString from 'crypto-random-string';
import IBook from './model/book';

let books: IBook[] = [];

export default {
    create(title: string, author: string): IBook {
        const id = cryptoRandomString({ length: 16, type: 'distinguishable' });

        const book = {
            id,
            title,
            author,
        };

        books.push(book);

        return book;
    },

    deleteById(id: string): IBook | null {
        let index = -1;

        for (let i = 0; i < books.length; i += 1) {
            const book = books[i];

            if (book.id === id) {
                index = i;
                break;
            }
        }

        if (index >= 0) {
            const book = books[index];

            books.splice(index, 1);

            return book;
        }

        return null;
    },

    findById(id: string): IBook | null {
        const book = books.find((b) => b.id === id);

        if (book) {
            return book;
        }

        return null;
    },

    findAll(): IBook[] {
        return books;
    },

    deleteAll() {
        books = [];
    },
};
