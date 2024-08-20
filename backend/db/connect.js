import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config(); 
const connect=async()=>{
    // console.log(process.env.Mongo_db_Uri)
    try{
        // console.log(process.env.Mongo_db_Uri)
        await mongoose.connect(process.env.Mongo);
        console.log("ok");
    }
    catch(error){
console.log(error);
    }
};
export default connect;
