import mongoose,{Schema,model} from "mongoose";

interface USER{
username:string,    
email:string,
password:string
}

const userSchema=new Schema<USER>({
username:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
}
})

const User=model<USER>("user",userSchema)

export default User
