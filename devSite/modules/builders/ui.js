import $ from "jquery";
require ("../../libs/jquery-utils-plugin/jquery-utils-plugin");
import dome from "../../libs/dome/dome";

import appConfig from "../classes/config";
import appSetting from "../classes/setting"

import splashScreen from "../templates/splashScreen";
import modalPanel from "../templates/modalPanel";
import contentFrame from "../templates/contentFrame";
import mainScreen from "../templates/mainScreen";

import favicon from "../../assets/favicon.ico"



export const buildSplashScreen = () =>{ 
    let dfd = $.Deferred();
    let parent = document.getElementById("contentPanel")
    let prom = dome.generateObj(splashScreen, parent);
    prom.then(() =>{
        dfd.resolve();
    });    
    return dfd.promise();
}


export const buildShell = () => {
    let dfd = $.Deferred();
    let frame = appConfig.get("rootElem","string");       
    frame = document.getElementById(frame);
    frame.style.backgroundColor = "#3d3d3d";
    frame.style.fontFamily = "Arial, Helvetica, sans-serif";
    frame.style.overflow = "hidden";
    frame.style.height = $(window).height() + "px";
    let link = document.createElement('link');
    link.rel = 'icon';
    link.type = "image/x-icon";
    link.href = favicon;
    document.getElementsByTagName('head')[0].appendChild(link);
    let prom = dome.generateObj(contentFrame, frame);
    prom.then(()=>{
        appConfig.setDocTitle();
        buildUserMenu();
        dfd.resolve();
    })
    return dfd.promise(); 
}

export const buildMainScreen = () => {
    $("#contentPanel").empty();
    let frame = document.getElementById("contentPanel");
    let prom = dome.generateObj(mainScreen, frame);
}

export const buildUserMenu = () => {
    $("#userMenuPanel").empty();
    let panel = document.getElementById("userMenuPanel");
    const loggedIn = appSetting.get("loggedIn", "bool");
    console.log("loggedIn", loggedIn);
    if (!loggedIn){
        const menuItemUser = {
            objType: "domElement",
            elem: "li",
            props: [],
            children: [
                {
                    objType: "domElement",
                    elem: "h6",
                    props: [
                        { key: "class", value: "dropdown-header text-center slim" },
                    ],
                    children: [
                        {
                            objType: "textNode",
                            content: "Not Logged In",
                        }
                    ]
                }
            ]
        }
        let prom = dome.generateObj(menuItemUser, panel);
    } else{
        const userName = appSetting.get("userName", "string");
        const menuItemUser = {
            objType: "domElement",
            elem: "li",
            props: [],
            children: [
                {
                    objType: "domElement",
                    elem: "h6",
                    props: [
                        { key: "class", value: "dropdown-header text-center slim" },
                    ],
                    children: [
                        {
                            objType: "textNode",
                            content: userName,
                        }
                    ]
                }
            ]
        }
        const menuItemdivider = {
            objType: "domElement",
            elem: "li",
            props: [],
            children: [
                {
                    objType: "domElement",
                    elem: "hr",
                    props: [
                        { key: "class", value: "dropdown-divider" },
                    ],
                    children: [
                    ]
                }
            ]
        }
        let prom = dome.generateObj(menuItemUser, panel);
        let promDivider1 = dome.generateObj(menuItemdivider, panel);
        let promDivider2 = dome.generateObj(menuItemdivider, panel);
    }

}

