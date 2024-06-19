class config{
    constructor(){
        this.title = "Freedom Park Scenario Portal";
        this.rootElem = "rootElem";
        this.userRoute = "/scenario/api/users";
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

    setDocTitle(){
        document.title = this.title;
    }
}

const appConfig = new config();

class setting{
    constructor(){
        this.users = [];
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

    set(name,value){
        this[name] = value;
    }
}

const appSetting = new setting();