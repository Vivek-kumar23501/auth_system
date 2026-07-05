import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose"
mongoose.connect(process.env.DB!)

import express from "express" 
import cookieParser from "cookie-parser";  
import AuthRouter from "./router/Auth.router"
import cors from "cors"
const app=express()

app.listen(process.env.PORT||8080)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)

app.use("/auth",AuthRouter)