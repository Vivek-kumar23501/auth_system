import { NextFunction, Response } from "express";


import moment from "moment";
import { SessionOperation } from "mongoose";
import AuthModel from "../model/Auth.model";
import { Sessioninterface } from "./Auth.middleware";



const RefreshToken = async (req: Sessioninterface, res: Response, next: NextFunction)=>{
    try {
        const refreshToken = req.cookies.refreshToken

        if(!refreshToken)
         return res.status(401).json({"message":"Unauthorized"  })

        const user = await AuthModel.findOne({refreshToken})

        if(!user)
         return res.status(401).json({"message":"Unauthorized"  })

        const today = moment()
        const expiry = moment((user as any).expiry)

        const isExpired = today.isAfter(expiry)

        if(isExpired)
            return res.status(401).json({"message":"Unauthorized"  })

        req.session = {
            id: user._id,
            email: user.email,
            mobile: user.mobile,
            fullname: user.fullname,
         
        }
        next()
    }
    catch(err)
    {
        return res.status(401).json({"message":"Unauthorized"  })
    }
}

export default RefreshToken