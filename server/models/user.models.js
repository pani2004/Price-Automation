import mongoose,{mongo, Schema} from "mongoose";


const userSchema = new Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true
    }
},{timestamps:true})

export  const User = mongoose.model("User",userSchema)