app.data.addUser = (data) =>{
    let dfd = $.Deferred();
    const route = appConfig.get("userRoute", "string");
    const opts ={
        route : route + "/add",
        content: data
    }
    let req = app.data.post(opts);
    req.then(response => response.json())
    .then(users => dfd.resolve(users));
    return dfd.promise();
}

app.data.loginUser = (data) => {
    let dfd = $.Deferred();
    const route = appConfig.get("userRoute", "string");
    const opts ={
        route : route + "/login",
        content: data
    }
    let req = app.data.post(opts);
    req.then(response => response.json())
    .then(res => {dfd.resolve(res)});
    return dfd.promise();
}