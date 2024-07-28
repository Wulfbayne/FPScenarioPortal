import { Request, Response, NextFunction } from 'express';
import CustomError from '../errors/customError';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    console.error(err.stack);
    res.status(500).send({
        errors: [{ message: 'Something went wrong' }]
    });
}

export default errorHandler;