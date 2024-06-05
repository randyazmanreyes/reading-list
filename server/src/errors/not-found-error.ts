import CustomError from './custom-error';

export default class NotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super('Route not found');

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    // eslint-disable-next-line class-methods-use-this
    serializeErrors() {
        return [{ message: 'Not Found' }];
    }
}
