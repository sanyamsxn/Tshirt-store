const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true,
        maxlength : 32,
        unique : true
    }
}, {timestamps : true})         // when there will be new entry through this Schema , it will save the time in database.


module.exports = mongoose.model('Category',categorySchema);