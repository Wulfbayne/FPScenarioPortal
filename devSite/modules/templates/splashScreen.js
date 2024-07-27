const splashScreen = {
    objType: "domElement",
    elem: "div",
    props: [
        { key: "id", value: "splashScreen" },
        { key: "style", value: "position: absolute; top: 0px; left: 0px; right:0px; bottom:0px; z-index:100;background-color: #eeeeee;" }
    ],
    children: [
        {
            objType: "domElement",
            elem: "div",
            props: [
                { key: "class", value: "container" }
            ],
            children: [
                {
                    objType: "domElement",
                    elem: "div",
                    props: [
                        { key: "class", value: "row" },
                        { key: "style", value: "position: absolute; top: 50%; left:50%; transform: translate(-50%, -50%); padding: 10px; text-align:center;" }
                    ],
                    children: [
                        {
                            objType: "domElement",
                            elem: "div",
                            props: [
                                { key: "class", value: "col" }
                            ],
                            children: [
                                {
                                    objType: "domElement",
                                    elem: "h2",
                                    props: [],
                                    children: [
                                        {
                                            objType: "textNode",
                                            content: "Freedom Park Scenario Portal - Loading",
                                        }
                                    ]
                                },
                                {
                                    objType: "domElement",
                                    elem: "div",
                                    props: [
                                        { key: "class", value: "cssload-loader" }
                                    ],
                                    children: [
                                        {
                                            objType: "domElement",
                                            elem: "div",
                                            props: [
                                                { key: "class", value: "cssload-inner cssload-one" }
                                            ],
                                            children: []
                                        },
                                        {
                                            objType: "domElement",
                                            elem: "div",
                                            props: [
                                                { key: "class", value: "cssload-inner cssload-two" }
                                            ],
                                            children: []
                                        },
                                        {
                                            objType: "domElement",
                                            elem: "div",
                                            props: [
                                                { key: "class", value: "cssload-inner cssload-three" }
                                            ],
                                            children: []
                                        }
                                    ]
                                },
                                {
                                    objType: "domElement",
                                    elem: "div",
                                    props: [],
                                    children: [
                                        {
                                            objType: "domElement",
                                            elem: "span",
                                            props: [
                                                { key: "id", value: "loadStage" }
                                            ],
                                            children: []
                                        },
                                        {
                                            objType: "domElement",
                                            elem: "span",
                                            props: [
                                                { key: "id", value: "loadMessage" }
                                            ],
                                            children: []
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

export default splashScreen;