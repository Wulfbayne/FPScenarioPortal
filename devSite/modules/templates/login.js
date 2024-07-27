const loginCard = {
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
                                                                { key: "id", value: "loginUserInputLabel" }
                                                            ],
                                                            children: [
                                                                { objType: "textNode", content: "User Name" }
                                                            ]
                                                        },
                                                        {
                                                            objType: "domElement",
                                                            elem: "input",
                                                            props: [
                                                                { key: "class", value: "form-control" },
                                                                { key: "type", value: "text" },
                                                                { key: "id", value: "loginInputUserName" },
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
                                                        // { key: "onclick", value: "portalLogin()" },
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

export default loginCard