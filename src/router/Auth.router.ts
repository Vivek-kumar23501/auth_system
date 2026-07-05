import {Router} from "express";
import { login, Signup ,getSession, refreshToken} from "../controller/Auth.controller";
import RefreshToken from "../middleware/refresh_token.middleware";


const AuthRouter=Router()

 AuthRouter.post("/signup",Signup)
 AuthRouter.post("/login",login)
 AuthRouter.get("/session",getSession)
 AuthRouter.get("/refresh-token", RefreshToken, refreshToken)


 export default AuthRouter