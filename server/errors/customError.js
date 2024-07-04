class CustomError {
    constructor(code, msg){
        this.code = code;
        this.message = message;

        Object.setPrototypeOf(this, CustomError.prototype);
    }

    static badRequest = (msg) => {
        return new CustomError(400, msg);
    }
    static internal = (msg) => {
        return new CustomError(500, msg);
    }

}

module.exports = CustomError;