import CustomError from "./customError";

class notFound extends CustomError {
    statusCode = 404;

    constructor() {
        super('<h1>Error 404: Resource Not Found</h1>');
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}

export default notFound;