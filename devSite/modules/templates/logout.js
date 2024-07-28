const logoutBtn = {
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

export default logoutBtn;