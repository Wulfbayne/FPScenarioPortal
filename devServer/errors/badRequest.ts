import CustomError from "./customError";

class BadRequestError extends CustomError {
    statusCode = 400;

    constructor(public message: string) {
        super(message);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}

export default BadRequestError;