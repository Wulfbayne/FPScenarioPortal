// DOME --> Document Object Model Engine
const dome = {
    /**
     * 
     * @param {object} tempObj JSON formatted object that consists of the HTML template
     * @param {object} parent DOM Element Object to which the template is being attached to
     * @todo Add error catching and reporting
     * @returns JavaScript Promise
     */
    generateObj (tempObj, parent){
        var promise = new Promise(function(resolve, reject){
            const checkForData = (data) => {
                if (data == "" || data === null || data === undefined){
                    return false;
                }
                else{
                    return true;
                }
            }
            if (checkForData(tempObj)){
                if (checkForData(parent)){
                    if (tempObj.objType == "textNode"){
                        var domObj = document.createTextNode(tempObj.content);
                        parent.appendChild(domObj);
                        resolve();
                    }
                    else if (tempObj.objType == "domElement"){
                        var domObj = document.createElement(tempObj.elem);
                        for (var i = 0; i < tempObj.props.length; i++){
                            domObj.setAttribute(tempObj.props[i].key, tempObj.props[i].value);
                        }
                        if (tempObj.children.length > 0){
                            for (var n = 0; n < tempObj.children.length; n++){
                                dome.generateObj(tempObj.children[n], domObj);
                            }
                            parent.appendChild(domObj);
                            resolve();
                        }
                        else{
                            parent.appendChild(domObj);
                            resolve();
                        }
                    }        
                }
                else{
                    reject("No parent");
                }
                
            }
            else{
                reject("No tempObj");
            }
        });    
        return promise;
    }
};

export default dome;