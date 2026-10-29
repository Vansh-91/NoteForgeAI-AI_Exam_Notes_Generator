import jwt from "jsonwebtoken";
export const gettoken=(userId)=>{
try{
 const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"});
   console.log(token)
   return token;
}
catch(e){
    console.log(e);
}
}