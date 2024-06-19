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
            dfd.resolve();
        })
    return dfd.promise(); 
}