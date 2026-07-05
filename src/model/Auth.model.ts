import {Schema, model} from "mongoose";

const authSchema=new Schema({

    fullname:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        
    },
    refreshToken: {
        type: String
    },
    expiry: {
        type: Date
    }

},{timestamps:true})

const AuthModel=model("Auth",authSchema)
export default AuthModel    