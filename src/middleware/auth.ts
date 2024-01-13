import { NextFunction, Request,Response } from "express"
const auth=async(req:Request,res:Response,next:NextFunction)=>{
    if(req.session.user){
        return next();
}else{
    return res.redirect("/login")

}
}


export default auth