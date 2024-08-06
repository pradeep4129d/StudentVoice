const mongoose=require('mongoose')

const concernSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    images:[{type:Buffer,default:[]}],
    description:{
        type:String
    },
    location:{type:String,default:0},
    block:{type:String},
    state:{type:String,default:"Not Seen Yet"},
    public:{type:Boolean,default:true},
    likeCount:{type:Number,default:0}
},{timestamps:true})
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    concerns:[{type:concernSchema,default:[]}],
    liked:[{type:String,default:[]}]
})
const adminSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    block:{
        type:String
    }
})
const adminmodel=mongoose.model('adminmodel',adminSchema)
const usermodel=mongoose.model('usermodel',userSchema)
module.exports={ adminmodel, usermodel}