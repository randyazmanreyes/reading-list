import express, { Request, Response } from 'express';
import Debug from 'debug';
import db from '../db';

const debug = Debug('reading-list:routes:list');
const listRouter = express.Router();

listRouter.get('/api/reading-list', async (_: Request, res: Response) => {
    const books = db.findAll();

    debug(books);

    res.status(200).send({ books });
});

export default listRouter;
