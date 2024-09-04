const { timeStamp } = require("console")
const mongoose = require("mongoose")
const { type } = require("os")

const hisaabSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minLenth:3,
        maxLength:100,
        required:true,
    },
    data: {
        type: String,
        trim: true,
        required:true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    isEncrypted: {
        type: Boolean,
        default:false,
    },
    shareable: {
        type: Boolean,
        default:"false",
    },
    passcode: {
        type: String,
        default:"",
    },
    editable: {
        type: Boolean,
        default:"false",
    },
    createdAt:{
        type: Date,
        default:Date.now
    }
}, 
 {timeStamp:true}
);

const Hisaab = mongoose.model("Hisaab", hisaabSchema);

module.exports = Hisaab