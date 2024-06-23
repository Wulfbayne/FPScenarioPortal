$(window).resize( () => {
    console.log("window resized");
    $("#rootElem").css({
		'height' : $(window).height(),
	});
    $("#contentPanel").css({
		'height' : $(window).height() * .98,
	});
});

$(document).bind("keydown keypress", function(e){
    if(e.which == 8 ){ // 8 == backspace
        if(e.target.disabled || e.target.readOnly ){
            e.preventDefault();
        }
    }
    if (e.which == 13){
        if (e.target.id == "loginTextPasswordInput"){
            event.preventDefault();
            app.view.portalLogin();    
        }
    }
});

app.svc.generateID = () =>{
    return id = luxon.DateTime.local().toMillis();
}

