let app = {};
app.core = {};
app.ui = {};
app.init = {};
app.users = {};
app.data = {};
app.template = {};
app.view = {};
app.svc = {};

const socket = io();

$(document).ready(function(){
    app.init.pre();
    console.log("Jquery is Active");
    // app.launch();
})

app.launch = () => {
    app.getUsers();    
    // app.postTest();
}

app.getUsers = () =>{
    const res = fetch('/scenario/api/users')
    .then(response => response.json())
    .then(users => console.log("users",users));
}

app.postTest = () => {
    const res = fetch("/scenario/api/users/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Blue Commander", password: "password" })
        })
    res.then(response => {
        console.log(response);
    })    
}