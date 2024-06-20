app.users.loadUsers = () =>{
    let dfd = $.Deferred();
    $.when(app.data.getUsers()).done((users) =>{
        appSetting.set("users", users);
        dfd.resolve();
        console.log("users",users);
    })
    return dfd.promise();
}

app.users.create = (username, password) => {
    const userObj = {
        uid: app.svc.generateID(),
        name: username,
        password: password
    }
    $.when(app.data.addUser(userObj)).done((res) => {
        console.log("res", res);
    })
}

app.users.updateUser = () => {
    
}