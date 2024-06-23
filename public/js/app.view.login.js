app.view.buildLogin = () => {
    let dfd = $.Deferred();      
    let frame = document.getElementById("contentPanel");
    let prom = dome.generateObj(app.template.getTemplate("loginCard"), frame);
        prom.then(()=>{
            // app.view.buildUserList();
            dfd.resolve();
        });
    return dfd.promise(); 
}

app.view.buildUserList = () => {
    const users = appSetting.get("users","array");
    console.log("users", users);
    let menu = document.getElementById("apmSelectUserLogin");
    const templateObj = app.template.getTemplate("blankEntry");
    let prom = dome.generateObj(templateObj, menu);
    for (let i = 0; i < users.length; ++i){
        let entry = {
            objType: "domElement",
            elem: "option",
            props: [{ key: "value", value: users[i].uid }],
            children: [
                { objType: "textNode", content: users[i].name }
            ]
        }
        let prom1 = dome.generateObj(entry, menu);
    } 
}

app.view.portalLogin = () =>{
    let user = {
        name : $("#loginInputUserName").val(),
        password:  $("#loginTextPasswordInput").val()
    }
    if(user.name){
        if ($("#loginInputUserName").hasClass("is-invalid")){
            $("#loginInputUserName").removeClass("is-invalid")
        }
        $.when(app.data.loginUser(user)).done((res) =>{
            if(!res.result){
                $("#loginTextPasswordInput").addClass("is-invalid")
                alertify.error("Invalid Password");
            }
            else{
                if ($("#loginTextPasswordInput").hasClass("is-invalid")){
                    $("#loginTextPasswordInput").removeClass("is-invalid")                    
                }       
                alertify.success("Welcome");
                // Launch into Application
                appSetting.login(res.role, res.name);                
            }
        });
    }
    else{
        $("#loginInputUserName").addClass("is-invalid");
        alertify.error("Invalid User");
    }
}