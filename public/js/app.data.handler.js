app.data.get = (opts) =>{
    let promise = fetch(opts.route);
    return promise;
}

app.data.post = (opts) => {
    let promise = fetch(opts.route,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(opts.content)
    });
    return promise;
}