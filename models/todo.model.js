const mongoose=require("mongoose")
const userModel = require("./user.model")

const todoSchema=mongoose.Schema({
    title:{
     type:String,
     required:true
    },
   task:{
    type:String,
    required:true
   },
   description:{
    type:String,
    required:true
   },
   status:{
type:Boolean,
default:false
   },
   author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:userModel,
  
   }

  
},
{timestamps:true}
)

const todoModel=mongoose.model("Todo",todoSchema)

module.exports=todoModel