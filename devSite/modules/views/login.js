import $ from "jquery";

import appSetting from "../classes/setting";
import message from "../handlers/message";

import { buildUserMenu, buildMainScreen } from "../builders/ui.js";
import { buildLogin } from "../builders/views/login.js"
import { loginUser } from "../data/exports";

export const portalLogin = () => {
    let user = {
        name : $("#loginInputUserName").val(),
        password:  $("#loginTextPasswordInput").val()
    }
    if(user.name){
        if ($("#loginInputUserName").hasClass("is-invalid")){
            $("#loginInputUserName").removeClass("is-invalid")
        }
        $.when(loginUser(user)).done((res) =>{
            if(!res.result){
                $("#loginTextPasswordInput").addClass("is-invalid")
                $("#loginInputUserName").addClass("is-invalid")
                message("error", "Invalid Login")
            }
            else{
                if ($("#loginTextPasswordInput").hasClass("is-invalid")){
                    $("#loginTextPasswordInput").removeClass("is-invalid")                    
                }
                if ($("#loginInputUserName").hasClass("is-invalid")){
                    $("#loginInputUserName").removeClass("is-invalid")
                }
                message("success", "Welcome");
                // Launch into Application
                appSetting.login(res.role, res.name);   
                buildUserMenu();
                buildMainScreen();
            }
        });
    }
    else{
        $("#loginInputUserName").addClass("is-invalid");
        message("error", "Invalid User")
    }
}

export const portalLogout = () => {
    appSetting.logout();
    buildUserMenu();
    buildLogin();
    message("message", "Goodbye")
}