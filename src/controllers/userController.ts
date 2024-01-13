import {Request,Response} from "express"
import {genSalt,compare,hash} from "bcrypt"
import User from "../models/userModel"


//login
const getLogin=async(req:Request,res:Response)=>{
    const viewsData={
        title:"login",
        isAuth:req.session.user,
        
    }
res.render("login",viewsData)
}

const postLogin=async(req:Request,res:Response)=>{
    const {email,password}=req.body;
    try {
        let user;
        user=await User.findOne({email})
        if(!user){
            return res.redirect("/signup")
        }
        const isMatch=await compare(password,user.password);
        if(isMatch){
            req.session.user=[true,user._id]
            return res.redirect("/")
        }
        return res.redirect("/signup")
    } catch (error) {
        console.log(error);
    }
}

//signup
const getSignup=async(req:Request,res:Response)=>{
   
    const viewsData={
        title:"signup",
        isAuth:req.session.user,

    }
    res.render("signup",viewsData)
}

const postSignup=async(req:Request,res:Response)=>{
    const {username,email,password}=req.body;
    try {
        let user;
        user=await User.findOne({email})
        if(user){
            return res.redirect("/login")
        }
        const salt=await genSalt();
        const hashPassword=await hash(password,salt);
        user=await User.create({username,email,password:hashPassword});
        if(user){
        req.session.user=[true,user._id]
        return    res.redirect("/")
        }
        console.log("not post signup");
    } catch (error) {
        console.log(error);
    }
}

//logout
const logout=async(req:Request,res:Response)=>{
   req.session.destroy((err)=>{
    if(err) throw err;
      return res.redirect("/login")
   })
}

export{
    getLogin,postLogin,getSignup,postSignup,logout
}