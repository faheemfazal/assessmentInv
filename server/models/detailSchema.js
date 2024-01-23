
const mongoose = require('mongoose')

const detailSchema = mongoose.Schema({
    vrNo:{
        type:Number,
        required:true,
    },
    srNo:{
        type:Number,
        required:true,
    },
    itemCode: {
        type:String,
        required:true,
    },
    itemName:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    qty:{
        type:Number,
        required:true
    },
    rate:{
        type:Number,
        required:true
    }

})

const detailDb = mongoose.model('detailDb',detailSchema)

module.exports =  detailDb;