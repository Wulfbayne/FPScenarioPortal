app.init.pre = () => {    
    appConfig.setDocTitle();
    $.when(app.users.loadUsers()).done(() => {
        $.when(app.ui.buildShell()).done(()=>{
            $.when(app.view.buildLogin()).done(() =>{
    
            });
        });
    });    
}