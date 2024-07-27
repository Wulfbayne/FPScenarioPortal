import banner3 from '../../assets/banner3.png';

const mainScreen = {
    objType: "domElement",
    elem: "div",
    props: [
        {key: "class", value: "row justify-content-center"},
    ],
    children: [
        {
            objType: "domElement",
            elem: "img",
            props: [
                { key: "id", value: "appBanner"},
                { key: "alt", value: ""},
                { key: "title", value: "Freedom Park Banner"},
                // {key: "style", value: "cursor: pointer;"},
                {key: "src", value: banner3},
                { key: "style", value: "height:50%; width: 50%;"},
                { key: "class", value: "align-middle"},
            ],
            children: []
        }
    ]
}

export default mainScreen;