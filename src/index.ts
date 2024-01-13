import express,{Request,Response} from "express"
import path from "path"
const app=express();
const PORT:number=3000;
import blogRouter from "./routes/blogRoutes"
import userRouter from "./routes/userRoutes"
import commentRouter from "./routes/commentRoutes"

import mongoose,{Types} from "mongoose";
import session from "express-session";
import  mongoDbSession from "connect-mongodb-session";

//adding user methods
declare module 'express-session' {
    export interface SessionData {
      user?:[boolean,Types.ObjectId];
    }
  }
const mongoDbStore=mongoDbSession(session)

  const store=new mongoDbStore({
uri:process.env.MONGO_URI,
collection:"mySession"
  })


//database connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err))

//view engine
app.set('view engine','ejs')
app.set("views",path.join(__dirname,"../views"))


//middleware
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,"../public")))
app.use(session({
    secret:"this is my session",
    saveUninitialized:false,
    resave:false,
    store:store,
    cookie:{
        maxAge:1000*60*10
    }
}))
app.use(blogRouter)
app.use(userRouter)
app.use(commentRouter)




app.listen(PORT,()=>{
    console.log("Listening on port "+PORT);
})



