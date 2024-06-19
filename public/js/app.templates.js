/**
 * 
 * @param {String} name name of the Template being requested
 * @returns JSON structured object that represents templated HTML
 */
app.template.getTemplate = function(name){
    var temp = $.extend({}, app.template[name]);
    return temp;
}

/**
 * @property {String} objType domElement/textNode : determines which document.create function is being leveraged
 * @property {String} elem what domElement is being created
 * @property {String} content textNode content
 * @property {Array} props Array of key/value pair objects consisting of domElement properties and their values
 * @property {Array} children Array of objects for child objects
 */
app.template.exampleElement = 
{
    objType: "domElement",
    elem: "div",
    props: [],
    children: []
}

/**
 * @property {String} objType domElement/textNode : determines which document.create function is being leveraged
 * @property {String} content textNode content
 */
app.template.exampteTextNode = 
{ objType: "textNode", content: "" }
 
 /**
  * @property {String} objType domElement/textNode : determines which document.create function is being leveraged
  * @property {String} content textNode content
  */
app.template.exampleProp = 
{ key: "", value: "" }


app.template.exampleTooltip =
{
    objType: "domElement",
    elem: "sup",
    props: [],
    children: [
        {
            objType: "domElement",
            elem: "i",
            props: [
                { key: "class", value: "fas fa-info-circle ml-1" },
                { key: "data-bs-toggle", value: "popover" },
                { key: "data-bs-trigger", value: "hover" },
                { key: "data-bs-placement", value: "top" },
                { key: "id", value: "exampleTooltip" }  // Change Value
            ],
            children: []
        }
    ]
}

app.template.exampleTemplate = {
    objType: "domElement",
    elem: "div",
    content: "",
    // Props is an array of key/value pairs identifying the properties you wish to set
    props: [
        {
            key: "NameOfProperty", value: "PropertySetting"
        }
    ],  
    // Children is an array of objects defining child elements
    children: [
        {
            objType: "domElement",
            elem: "div",
            content: "",
            props: [],
            children: []
        }
    ]
}

app.template.contentFrame = {
    objType: "domElement",
    elem: "div",
    props: [{ key: "id",value: "contentFrame"},{key: "class",value: "container-fluid"}],
    children: [
        {
            objType: "domElement",
            elem: "div",
            props: [{key: "class", value: "row"},{key: "style", value: ""}],
            children: [
                {
                    objType: "domElement",
                    elem: "div",
                    props: [{key: "class", value: "col"}],
                    children: [
                        {
                            objType: "domElement",
                            elem: "nav",
                            props: [
                                {key: "role", value: "navigation"},
                                {key: "class", value: "navbar navbar-expand-sm navbar-dark"},
                            ],
                            children: [
                                {
                                    objType: "domElement",
                                    elem: "div",
                                    props: [{key: "class", value: "navbar-brand"}],
                                    children: [
                                        {
                                            objType: "domElement",
                                            elem: "img",
                                            props: [
                                                { key: "id", value: "appLogo"},
                                                { key: "alt", value: ""},
                                                { key: "title", value: "Freedom Park Logo"},
                                                {key: "style", value: "cursor: pointer;"},
                                                {key: "src", value: "./assets/Freedom Park.png"},
                                                { key: "height", value: "34"},
                                                { key: "width", value: "34"},
                                                { key: "class", value: "d-inline-block align-text-middle"},
                                            ],
                                            children: []
                                        },
                                        { objType: "textNode", content: appConfig.get("title", "string") }
                                    ]
                                },
                                {
                                    objType: "domElement",
                                    elem: "ul",
                                    props: [
                                        {key: "id", value: "leftNav"},
                                        {key: "class", value: "navbar-nav me-auto mb-0"}
                                    ],
                                    children: []
                                },
                                {
                                    objType: "domElement",
                                    elem: "form",
                                    props: [{key: "id", value: "rightNav"},{key: "class", value: "d-flex mb-0"}],
                                    children: [
                                        {
                                            objType: "domElement",
                                            elem: "div",
                                            props: [
                                                // { key: "class", value: "col-6" },
                                                { key: "id", value: "alertNoticeCol" }
                                            ],
                                            children: []
                                        },
                                        {
                                            objType: "domElement",
                                            elem: "div",
                                            props: [
                                                // { key: "class", value: "col" },
                                                { key: "style", value: "text-align: right;" },
                                                { key: "id", value: "userMenuCol" }
                                            ],
                                            children: []
                                        }
                                    ]
                                }  
                            ]
                        },

                    ]
                }
            ]
        },
        {
            objType: "domElement",
            elem: "div",
            props: [{key: "class", value: "row"}],
            children: [
                {
                    objType: "domElement",
                    elem: "div",
                    props: [{key: "id", value: "contentPanel"},{key: "class", value: "col"},{key: "style", value: "margin-top: 5px; margin-bottom: 5px;"}],
                    children: []
                }
            ]
        }
    ]
}

app.template.loginCard = {
    objType: "domElement",
    elem: "div",
    props: [
        {key: "class", value: "row justify-content-center"},
        
    ],  
    children: [
        {
            objType: "domElement",
            elem: "div",
            props: [
                {key: "class", value: "col-4"}
            ],
            children: [
                {
                    objType: "domElement",
                    elem: "div",
                    props: [
                        {key: "class", value: "card"}
                    ],  
                    children: [
                        {
                            objType: "domElement",
                            elem: "div",
                            props: [
                                {key: "class", value: "card-header"}
                            ],
                            children: [
                                {
                                    objType: "domElement",
                                    elem: "h2",
                                    props: [
                                        {key: "style", value: "text-align:center;"}
                                    ],
                                    children: [
                                        { objType: "textNode", content: "Login" }
                                    ]
                                }
                            ]
                        },
                        {
                            objType: "domElement",
                            elem: "div",
                            props: [
                                {key: "class", value: "card-body"}
                            ],
                            children: [
                                {
                                    objType: "domElement",
                                    elem: "div",
                                    props: [
                                        {key: "class", value: "row"}
                                    ],
                                    children: [
                                        {
                                            objType: "domElement",
                                            elem: "div",
                                            props: [
                                                {key: "class", value: "col"}
                                            ],
                                            children: [
                                                {
                                                    objType: "domElement",
                                                    elem: "div",
                                                    props: [{ key: "class", value: "input-group input-group-sm" }],
                                                    children: [
                                                        {
                                                            objType: "domElement",
                                                            elem: "span",
                                                            props: [
                                                                { key: "class", value: "input-group-text slim" },
                                                                { key: "id", value: "loginSelectUserInputLabel" }
                                                            ],
                                                            children: [
                                                                { objType: "textNode", content: "User" }
                                                            ]
                                                        },
                                                        {
                                                            objType: "domElement",
                                                            elem: "select",
                                                            props: [
                                                                { key: "class", value: "form-select form-select-sm" },
                                                                { key: "type", value: "text" },
                                                                { key: "id", value: "apmSelectUserLogin" },
                                                            ],
                                                            children: []
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                    ]
                                },
                                {
                                    objType: "domElement",
                                    elem: "div",
                                    props: [
                                        {key: "class", value: "row"}
                                    ],
                                    children: [
                                        {
                                            objType: "domElement",
                                            elem: "div",
                                            props: [
                                                {key: "class", value: "col"}
                                            ],
                                            children: [
                                                {
                                                    objType: "domElement",
                                                    elem: "div",
                                                    props: [{ key: "class", value: "input-group input-group-sm" }],
                                                    children: [
                                                        {
                                                            objType: "domElement",
                                                            elem: "span",
                                                            props: [
                                                                { key: "class", value: "input-group-text slim" },
                                                                { key: "id", value: "loginTextPasswordInputLabel" }
                                                            ],
                                                            children: [
                                                                { objType: "textNode", content: "Password" }
                                                            ]
                                                        },
                                                        {
                                                            objType: "domElement",
                                                            elem: "input",
                                                            props: [
                                                                { key: "class", value: "form-control" },
                                                                { key: "type", value: "password" },
                                                                { key: "id", value: "loginTextPasswordInput" },
                                                                { key: "aria-describedby", value: "loginTextPasswordInputLabel" }
                                                            ],
                                                            children: []
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            objType: "domElement",
                            elem: "div",
                            props: [
                                {key: "class", value: "card-footer"},
                            ],
                            children: [
                                {
                                    objType: "domElement",
                                    elem: "div",
                                    props: [{ key: "class", value: "row" }],
                                    children: [
                                        {
                                            objType: "domElement",
                                            elem: "div",
                                            props: [
                                                { key: "class", value: "col" },
                                                { key: "style", value: "text-align:center;" },
                                            ],
                                            children: [
                                                {
                                                    objType: "domElement",
                                                    elem: "button",
                                                    props: [
                                                        { key: "type", value: "button" },
                                                        { key: "class", value: "btn btn-primary btn-wide slim" },
                                                        { key: "id", value: "portalLoginBtn" },
                                                        { key: "onclick", value: "app.view.portalLogin()" },
                                                    ],
                                                    children: [
                                                        { objType: "textNode", content: "Login" }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

app.template.blankEntry = {
    objType: "domElement",
    elem: "option",
    props: [
        { key: "value", value: "" },
        { key: "selected", value: "selected" }
    ],
    children: [
        { objType: "textNode", content: "" }
    ]
}