
import { Router,Request,Response } from "express";
import { createBlog, getBlogDetails, getBlogs, postBlog } from "../controllers/blogController";
import auth from "../middleware/auth";

const router=Router();


router.get("/",getBlogs)

//post blog 
router.post("/blogs",postBlog)

//createBlog page
router.get("/create",auth,createBlog)

//get single blog
router.get("/blog/:id",getBlogDetails)

export default router