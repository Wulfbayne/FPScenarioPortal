import $ from "jquery";
import dome from "../../../libs/dome/dome";

import loginPanel from '../../templates/login';
import { portalLogin } from "../../views/login";

export const buildLogin = () => {
    let dfd = $.Deferred();
    let prom = dome.generateObj(loginPanel, document.getElementById("contentPanel"));
    prom.then(() =>{
        $("#portalLoginBtn").click(portalLogin);
        $('#loginInputUserName, #loginTextPasswordInput').keypress(function(event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                portalLogin();
            }
        });
        dfd.resolve();
    });    
    return dfd.promise();
}

