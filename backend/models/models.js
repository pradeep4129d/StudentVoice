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
    upvotes:{type:Number},
    block:{type:String},
    state:{type:String,default:"posted"
    }
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
    concerns:[{type:concernSchema,default:[]}]
})
const feedbackSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    images:{type:Buffer,default:[]}
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
    },
    feedbackposts:[{type:feedbackSchema,default:[]}]
})
const adminmodel=mongoose.model('adminmodel',adminSchema)
const usermodel=mongoose.model('usermodel',userSchema)
module.exports={ adminmodel, usermodel}