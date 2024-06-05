import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import Debug from 'debug';
import validateRequest from '../middlewares/validate-request';
import db from '../db';

const debug = Debug('reading-list:routes:add');
const addRouter = express.Router();

interface IRequestBody {
    bookTitle: string;
    author: string;
}

addRouter.post(
    '/api/reading-list',
    [
        body('bookTitle')
            .not()
            .isEmpty()
            .withMessage('bookTitle must be provided'),
        body('author').not().isEmpty().withMessage('author must be provided'),
    ],
    validateRequest,
    async (req: Request<any, any, IRequestBody>, res: Response) => {
        debug(req.body);

        const book = db.create(req.body.bookTitle, req.body.author);

        res.status(201).send({ book });
    }
);

export default addRouter;
