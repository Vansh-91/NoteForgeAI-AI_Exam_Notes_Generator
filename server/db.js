import mongoose from "mongoose";
const connect=async()=>{
    try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Mongoose Connected");
    }
    catch(e){
  console.log(e);
    }
}
export default connect;