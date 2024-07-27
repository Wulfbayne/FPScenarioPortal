import $ from "jquery";
window.$ = window.jQuery = $;
require("bootstrap");

require('./libs/fontawesome/css/all.css');
require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
import '../node_modules/alertifyjs/build/css/alertify.css';
import '../node_modules/alertifyjs/build/css/themes/bootstrap.css';
import './modules/styles/style.scss';

import { preInit, init, postInit, launch } from "./modules/init";

// do some shit here
$.when(preInit()).done(() =>{
    console.log("Pre-Init Complete");
    $.when(init()).done(() => {
        console.log("Init Complete");
        $.when(postInit()).done(() => {
            console.log("Post-Init complete");
            launch();
        })
    })    
})