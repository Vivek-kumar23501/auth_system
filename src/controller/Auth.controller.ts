import { Request, Response } from "express";
import AuthModel from "../model/Auth.model";
import bcrypt from "bcrypt"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import { Sessioninterface } from "../middleware/Auth.middleware";
import moment from "moment"
import {v4 as uuid} from 'uuid'


const accessTokenExpiry = '10m'
const tenMinuteInMs = (10*60)*1000
const sevenDaysInMs = (7*24*60*60)*1000

interface payload{
   id: mongoose.Types.ObjectId,
   fullname: string,
   email: string,
   mobile: string
}

type TokenType = "at" | "rt"

const getOptions = (tokenType: TokenType)=>{
    return {
            httpOnly: true,
            maxAge: tokenType === "at" ? tenMinuteInMs : sevenDaysInMs,
            secure: false,
            
        }
}
const generateToken=(payload:payload)=>{
   const accessToken=jwt.sign(payload,process.env.JWT_SECRET!, {expiresIn:accessTokenExpiry})
  const refreshToken = uuid()
    return {
        accessToken,
        refreshToken
    }
}

export const Signup = async (req: Request, res: Response) => {
  
   try{
   
     const {fullname,email, mobile, password}=req.body

    const existingUser = await AuthModel.findOne({
  $or: [
    { email },
    { mobile }
  ]
});

if (existingUser) {
  return res.status(409).json({
    message: "User already exists"
  });
}
        
     const hashedPassword=await bcrypt.hash((password),12)
     const payload={
      fullname,
      email,
      mobile,
      password:hashedPassword
     }

const User =await AuthModel.create(payload)
 res.status(201).json(User)

   }
   catch(err)
   {
    res.status(500).json({"message":"Internal server error"})
   }

};

export const login=async (req:Request, res:Response)=>{
   try{
     const {email, password}=req.body

      const existingUser = await AuthModel.findOne({ email })
      if(!existingUser)
         return res.status(401).json({"message":"Invalid email or password"})

      const islogin =await bcrypt.compare(password,existingUser.password)

      if(!islogin)
         return res.status(401).json({"message":"Invalid email or password"})

      const payload={
         id:existingUser._id,
         fullname:existingUser.fullname,
         email:existingUser.email,
         mobile:existingUser.mobile
      }

     

      const {accessToken, refreshToken} = generateToken(payload)
        
        await AuthModel.updateOne({_id: existingUser._id}, {$set: {
            refreshToken,
            expiry: moment().add(7, 'days').toDate()
        }})
        
        res.cookie("accessToken", accessToken, getOptions('at'))
        res.cookie("refreshToken", refreshToken, getOptions('rt'))
        res.json({message: 'Login success'})
    


   }
   catch(err)
   {
      res.status(500).json({"message":"Failed to login, please try again later"})
   }
}

export const getSession=async (req:Request,res:Response)=>{
   try{
      const accessToken=req.cookies.accessToken
      if(!accessToken)
         return res.status(401).json({"message":"Please login first"})

     const session =await jwt.verify(accessToken, process.env.JWT_SECRET!)
     res.json(session)
   }
   catch(err)
   {
      res.status(401).json({"message":"Invalid or expired session, please login again"})
   }
}

export const refreshToken=async (req:Sessioninterface,res:Response)=>{
try{
  
   if(!req.session)
      return res.status(401).json({"message":"Please login first"})

  const {accessToken, refreshToken}=generateToken(req.session)
      await AuthModel.updateOne({_id: req.session.id}, {$set: {
            refreshToken,
            expiry: moment().add(7, 'days').toDate()
        }})
         res.cookie("accessToken", accessToken, getOptions('at'))
        res.cookie("refreshToken", refreshToken, getOptions('rt'))
        res.json({message: 'Token refreshed'})


}
catch(err)
{
   res.status(500).json({"message":"Failed to refresh token, please try again later"})
}
}