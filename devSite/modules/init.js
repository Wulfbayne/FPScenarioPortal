import $ from "jquery";

import appConfig from "./classes/config";
import { buildSplashScreen, buildShell, buildMainScreen } from "./builders/ui";
import { buildLogin } from "./builders/views/login";

export const preInit = () => {
    let dfd = $.Deferred();
    $.when(buildShell()).done(() => {
        $.when(buildSplashScreen()).done(() => {
            dfd.resolve();
        });
    });
    
    return dfd.promise();
}

export const init = () => {
    let dfd = $.Deferred();
    dfd.resolve();
    return dfd.promise();   
}

export const postInit = () => {
    let dfd = $.Deferred();
    $.when(buildLogin()).done(() => {
        dfd.resolve();
    })
    return dfd.promise();
}

export const launch = () => {
    $(window).resize( () => {
        $("#" + appConfig.get("rootElem", "string")).css({
            'height' : $(window).height(),
        });
        $("#contentPanel").css({
            'height' : $(window).height() * .98,
        });
    });
    let splash = document.getElementById("splashScreen");
    splash.remove();
}