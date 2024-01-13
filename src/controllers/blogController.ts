import { Request,Response } from "express"
import Blog from "../models/blogModel"
import Comment from "../models/commentModel";
import User from "../models/userModel";

enum statusCode{
    success=200,
    redirect=300,
    error=400
}

//get all blogs from db
const getBlogs=async(req:Request,res:Response)=>{
try {
    const blogs=await Blog.find({}).sort({createdAt:-1});
    const users=await User.find({},'username')
    const viewsData={
        title:"blog",
        blogs,
        isAuth:req.session.user,
        users
    }
    res.status(statusCode.success).render("home",viewsData)
} catch (error) {
    console.log(error);
}
}

//create new blog
const createBlog=async(req:Request,res:Response)=>{
    try {
        const viewsData={
            title:"create",
            isAuth:req.session.user,
        }
        res.status(statusCode.success).render("create",viewsData)
    } catch (error) {
        console.log(error);
    }
}


//post blog in db
const postBlog=async(req:Request,res:Response)=>{
   const {subject,content,user_id}=req.body;
   try {
    const blog=await Blog.create({subject,content,user_id})
    if(blog){
        return res.status(statusCode.redirect).redirect("/")
    }
    return res.status(statusCode.redirect).redirect("/create")
   } catch (error) {
    
   }
}


//blogdetails
const getBlogDetails=async(req:Request,res:Response)=>{
   const _id=req.params.id;
    try {
        let blog,comments,users
         blog=await Blog.findById(_id)
        if(blog){
            comments=await Comment.find({blog_id:_id})
        }
        //sending all username for comments
        users=await User.find({},'username')
        const viewsData={
            title:blog.subject,
            blog,
            isAuth:req.session.user,
            users,
            comments
        }
        res.status(statusCode.success).render("blogdetail",viewsData)
    } catch (error) {
        
    }
}




export {
    postBlog,createBlog,getBlogs,getBlogDetails
}
