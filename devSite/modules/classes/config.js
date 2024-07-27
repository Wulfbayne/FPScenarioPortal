import $ from "jquery";
window.$ = window.jQuery = $;
require("../../libs/jquery-utils-plugin/jquery-utils-plugin.js");

class config{
    constructor(){
        this.title = "Freedom Park Scenario Portal";
        this.rootElem = "app_root_elem";
        this.userRoute = "/scenario/api/users";
    }

    get = (name,type) =>{
        switch (type){
            case "object":
                return $.extend({}, this[name]);
            case "array":
                return $.extend([], this[name]);
            default:
                return this[name];
        }
    }

    setDocTitle = () => {
        document.title = this.title;
    }
}

const appConfig = new config();

export default appConfig;