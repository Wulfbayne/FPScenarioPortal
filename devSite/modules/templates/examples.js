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
