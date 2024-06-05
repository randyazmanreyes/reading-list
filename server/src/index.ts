import Debug from 'debug';
import app from './app';

Debug.enable('reading-list:*');

const debug = Debug('reading-list:index');

(async () => {
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        debug(`Server is running in port ${port}`);
    });
})();
