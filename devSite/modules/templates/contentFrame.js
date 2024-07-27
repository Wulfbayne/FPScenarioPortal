import appConfig from "../classes/config";
import logo from '../../assets/logo.png';
/**
 * Main Application
 */
const contentFrame = {
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
                                                {key: "src", value: logo},
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
                                            children: [
                                                {
                                                    objType: "domElement",
                                                    elem: "div",
                                                    props: [
                                                        { key: "class", value: "dropdown" }
                                                    ],
                                                    children: [
                                                        {
                                                            objType: "domElement",
                                                            elem: "button",
                                                            props: [
                                                                { key: "class", value: "btn btn-light btn-sm btn-slim nav-btn cog" },
                                                                { key: "type", value: "button" },
                                                                { key: "data-bs-toggle", value: "dropdown" },
                                                                { key: "aria-haspopup", value: "true" },
                                                                { key: "aria-expanded", value: "false" },
                                                                { key: "id", value: "userMenu" }
                                                            ],
                                                            children: [
                                                                {
                                                                    objType: "domElement",
                                                                    elem: "i",
                                                                    props: [
                                                                        { key: "class", value: "fas fa-cogs" }
                                                                    ],
                                                                    children: []
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            objType: "domElement",
                                                            elem: "div",
                                                            props: [
                                                                { key: "class", value: "dropdown-menu dropdown-menu-end" },
                                                                { key: "aria-labelledby", value: "dropdown-menu" },
                                                                { key: "id", value: "userMenuPanel" }
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

export default contentFrame;