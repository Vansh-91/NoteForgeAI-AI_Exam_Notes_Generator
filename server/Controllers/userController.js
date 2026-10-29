import User from "../Models/userModel.js";

 const getcurrentuser=async(req,res)=>{
  try{
const userId=req.userId;
const user=await User.findById(userId)
if(!user){
    return res.status(404).json({message:"User not found"});
}
return res.status(200).json(user)
  }
  catch(e){
     return res.status(500).json({message:e.message});
  }
}
export default getcurrentuser;