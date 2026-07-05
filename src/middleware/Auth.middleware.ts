import mongoose from "mongoose";
import {NextFunction ,Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'

export interface payloadinterface {
    id:mongoose.Types.ObjectId,
    fullname:string,
    mobile:string,
    email:string
}

export interface Sessioninterface extends Request{
    session?:payloadinterface
}

const Authmiddleware=(req:Sessioninterface, res:Response, next:NextFunction )=>{
    try {
const accessToken=req.cookies.accessToken

if(!accessToken)
    res.status(401).json({"message":"Unauthorized"  })

const payload=jwt.verify(accessToken, process.env.JWT_SECRET!) as JwtPayload

req.session={
    id:payload.id,
    fullname:payload.fullname,
    mobile:payload.mobile,
    email:payload.email
}
next()
        
    } catch (err) {
        res.status(401).json({"message":"Unauthorized"  })
    }
}