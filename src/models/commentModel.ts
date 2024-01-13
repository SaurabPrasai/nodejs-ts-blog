import mongoose,{Schema,model} from "mongoose";

interface COMMENT{
comment:string,    
blog_id:string,
user_id:string,

}

const commentSchema=new Schema<COMMENT>({
comment:{
    type:String,
    required:true
},
blog_id:{
    type:String,
    required:true
},
user_id:{
    type:String,
    required:true
}
})

const Comment=model<COMMENT>("comment",commentSchema)

export default Comment
