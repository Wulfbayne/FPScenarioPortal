import appSetting from "../classes/setting";

const userName = appSetting.get("userName", "string");

const adminUserMenu = {
    objType: "domElement",
    elem: "div",
    props: [],
    children: [
        {
            objType: "domElement",
            elem: "li",
            props: [],
            children: [
                {
                    objType: "domElement",
                    elem: "h6",
                    props: [
                        { key: "class", value: "dropdown-header text-center slim" },
                    ],
                    children: [
                        {
                            objType: "textNode",
                            content: userName,
                        }
                    ]
                }
            ]
        },
        {
            objType: "domElement",
            elem: "li",
            props: [],
            children: [
                {
                    objType: "domElement",
                    elem: "hr",
                    props: [
                        { key: "class", value: "dropdown-divider" },
                    ],
                    children: [
                    ]
                }
            ]
        },
        {
            objType: "domElement",
            elem: "li",
            props: [],
            children: [
                {
                    objType: "domElement",
                    elem: "hr",
                    props: [
                        { key: "class", value: "dropdown-divider" },
                    ],
                    children: [
                    ]
                }
            ]
        },
        {
            objType: "domElement",
            elem: "li",
            props: [
                { key: "class", value: "text-center" },
            ],
            children: [
                {
                    objType: "domElement",
                    elem: "button",
                    props: [
                        { key: "type", value: "button" },
                        { key: "class", value: "btn btn-primary btn-wide slim" },
                        { key: "id", value: "portalLogoutBtn" },
                    ],
                    children: [
                        { objType: "textNode", content: "Logout" }
                    ]
                }
            ]
        }
    ]
}

export default adminUserMenu;