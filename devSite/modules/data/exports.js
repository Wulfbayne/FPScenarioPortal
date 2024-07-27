import $ from "jquery";
import appConfig from "../classes/config";
import { postData } from "../handlers/data";




export const loginUser = (data) => {
    let dfd = $.Deferred();
    const route = appConfig.get("userRoute", "string");
    const opts ={
        route : route + "/login",
        content: data
    }
    let req = postData(opts);
    req.then(response => response.json())
    .then(res => {dfd.resolve(res)});
    return dfd.promise();
}