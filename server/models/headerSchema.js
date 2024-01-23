const mongoose = require('mongoose')

const headerSchema = mongoose.Schema({
    vrNo:{
        type:Number,
        required:true,
    },
    vrDate: {
        type: Date,
        default:new Date()
    },
    acName:{
        type:String,
        required:true,
    },
    acAmount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    }


})

const headerDb = mongoose.model('headerDb',headerSchema)

module.exports = headerDb;


