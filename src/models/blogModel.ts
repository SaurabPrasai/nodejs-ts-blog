import mongoose,{Schema,model} from "mongoose";

interface BLOG{
subject:string,
content:string,
user_id:string
}

const blogSchema=new Schema<BLOG>({
subject:{
    type:String,
    required:true
},
content:{
    type:String,
    required:true
},
user_id:{
    type:String,
    required:true
}
},{timestamps:true})

const Blog=model<BLOG>("blog",blogSchema)

export default Blog
