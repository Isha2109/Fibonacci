const mongoose=require('mongoose')

var Schema = mongoose.Schema

var FibSchema = new Schema({
    indexNum:{
        type: Number
    },
    IPAddress:{
        type: String
    },
    reqId:{
        type: String,
    },
    createdAt:{
        type: Date
    }
});


var FibSchema  = mongoose.model('fibonacci_log', FibSchema);

module.exports = {
    FibSchema
}