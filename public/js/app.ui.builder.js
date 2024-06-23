app.ui.buildShell = () => {
    let dfd = $.Deferred();
    let frame = appConfig.get("rootElem","string");       
    frame = document.getElementById(frame);
    frame.style.backgroundColor = "#3d3d3d";
    frame.style.fontFamily = "Arial, Helvetica, sans-serif";
    frame.style.overflow = "hidden";
    frame.style.height = $(window).height() + "px";
    let prom = dome.generateObj(app.template.getTemplate("contentFrame"), frame);
        prom.then(()=>{
            appConfig.setDocTitle();
            app.ui.buildUserMenu();
            dfd.resolve();
        })
    return dfd.promise(); 
}

app.ui.buildMainScreen = () =>{
    $("#contentPanel").empty();
    let frame = document.getElementById("contentPanel");
    let prom = dome.generateObj(app.template.getTemplate("mainScreen"), frame);
}

app.ui.buildUserMenu = () =>{
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