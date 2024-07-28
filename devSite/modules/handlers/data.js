export const getData = (opts) => {
    let promise = fetch(opts.route);
    return promise;
}

export const postData = (opts) => {
    let promise = fetch(opts.route,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(opts.content)
    });
    return promise;
}