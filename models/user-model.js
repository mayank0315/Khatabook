const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        required: true,
        trim: true,
    },

    profilepicture: {
        type: String,
        trim: true
    },
      email: {
        type: String,
        required: true,
        trim: true
    },
      password: {
        type: String,
        required: false,
        trim: true
    },
    hisaab:[
        {type: mongoose.Schema.Types.ObjectId, ref:"hisaab"}
    ]
})

module.exports = mongoose.model("user",userSchema)