import express, { Request, Response } from 'express';
import logger from 'morgan';
import compression from 'compression';
import path from 'path';
import addRouter from './routes/add';
import 'express-async-errors';
import errorHandler from './middlewares/error-handler';
import listRouter from './routes/list';
import deleteRouter from './routes/delete';

const app = express();
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    logger(
        ':remote-addr :method :status :url [:res[content-length] :response-time ms :total-time ms] [:date[clf]]'
    )
);

app.use(addRouter);
app.use(listRouter);
app.use(deleteRouter);

app.use(errorHandler);

app.use(express.static(path.join(__dirname, '../../dist')));

app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

export default app;
