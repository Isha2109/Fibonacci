const crypto = require("crypto");

 function getReqId(){
    var reqId = crypto.randomBytes(8).toString("hex");
    return reqId
 }

 module.exports= {
    getReqId
}