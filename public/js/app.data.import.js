app.data.getUsers = () => {
    let dfd = $.Deferred();
    const route = appConfig.get("userRoute", "string");
    const opts ={
        route : route
    }
    let req = app.data.get(opts);
    req.then(response => response.json())
    .then(users => dfd.resolve(users));
    return dfd.promise();
}

app.data.getUserById = (id) => {
    let dfd = $.Deferred();
    const route = appConfig.get("userRoute", "string");
    const opts ={
        route : route + "/" + id
    }
    let req = app.data.get(opts);
    req.then(response => response.json())
    .then(user => dfd.resolve(user));
    return dfd.promise();
}
