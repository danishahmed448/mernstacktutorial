const mongoose = require ("mongoose");

const MovieSchema = new mongoose.Schema(
    {
        title:{type:String,required:true,unique:true},
        desc:{type:String},
        img:{type:String},
        imgTitle:{type:String},
        imgSm:{type:String},
        trailer:{type:String},
        video:{type:String},
        year:{type:String},
        limit:{type:String},
        genre:{type:String},
        duration:{type:String},
        isSeries:{type:Boolean,default:false},
        likes:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]
    },
    {
        timestamps : true
    }
);

module.exports = mongoose.model("Movie",MovieSchema);