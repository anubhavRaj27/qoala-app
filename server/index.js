import  express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();
const app=express();

/*MONGOOSE SETUP*/
const PORT=process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  app.listen(PORT, ()=> console.log(`Server Port: ${PORT}`));
}).catch((error)=>{
  console.log(`${error} did not connect`);
})
