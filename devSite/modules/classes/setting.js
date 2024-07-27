import $ from "jquery";
require("../../libs/jquery-utils-plugin/jquery-utils-plugin.js");



class setting{
    constructor(){
        this.users = [];
        this.loggedIn = false;
        this.userRole;
        this.userName
    }

    get(name,type){
        switch (type){
            case "object":
                return $.extend({}, this[name]);
            case "array":
                return $.extend([], this[name]);
            default:
                return this[name];
        }
    }

    set = (name,value) =>{
        this[name] = value;
    }

    login = (role, name) =>{
        this.loggedIn = true;
        this.userRole = role;
        this.userName = name;        
    }
}

const appSetting = new setting();

export default appSetting;