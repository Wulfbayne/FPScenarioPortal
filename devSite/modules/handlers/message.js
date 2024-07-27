import * as alertify from 'alertifyjs';

const message = (type, msg) => {
    switch(type){
        case "success": alertify.success(msg); break;
        case "error": alertify.error(msg); break;
        case "warning": alertify.warning(msg); break;
        default: alertify.message(msg);
    }
}

export default message;