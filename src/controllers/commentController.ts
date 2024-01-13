import { Request,Response } from "express";
import Comment from "../models/commentModel";

const getAllComments=async(req:Request,res:Response)=>{

}

const postComment=async(req:Request,res:Response)=>{
 const {blog_id,user_id,comment}=req.body;
 try {
    const cmt=await Comment.create({blog_id,user_id,comment})
    if(cmt){
        return res.redirect(`/blog/${cmt.blog_id}`)
    }else{
        return res.redirect("/")
    }
 } catch (error) {
    console.log(error);
 }
}

const updateComments=async(req:Request,res:Response)=>{

}

const deleteComment=async(req:Request,res:Response)=>{
const {_id,blog_id}=req.body;
try {
    const dlt=await Comment.findByIdAndDelete(_id)
    if(dlt){
        return res.redirect(`/blog/${blog_id}`)
    }
} catch (error) {
    console.log(error);
}
}

export{
    postComment,
    deleteComment
}