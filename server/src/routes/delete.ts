import express, { Request, Response } from 'express';
import Debug from 'debug';
import db from '../db';
import NotFoundError from '../errors/not-found-error';

const debug = Debug('reading-list:routes:delete');
const deleteRouter = express.Router();

interface IParams {
    id: string;
}

deleteRouter.delete(
    '/api/reading-list/:id',
    async (req: Request<IParams>, res: Response) => {
        debug('delete book by id ', req.params.id);

        const book = db.deleteById(req.params.id);

        if (!book) {
            throw new NotFoundError();
        }

        res.status(200).send({ book });
    }
);

export default deleteRouter;
