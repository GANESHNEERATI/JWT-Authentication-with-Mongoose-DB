
import express from 'express'
const router=express.Router();
import UserModel from './Model/User.js'
import  {registerValidation,loginValidation} from './validation.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



router.post('/register', async  (req,res)=>{
    
    //lets validate data before storing in DB

    const {error}=registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //checking user in database
    const emailExists=await UserModel.findOne({email:req.body.email});
    
    if(emailExists) return res.status(400).send("email alredy exists");

   
    
   //
      //HASH THE PASSWORD
   const salt=await  bcrypt.genSalt(10)
   const hashedPassword= await bcrypt.hash(req.body.password,salt);
  
   
   const user=new UserModel({
      name:req.body.name,
      email:req.body.email,
      password:hashedPassword     

   })

try{
   const SaveUser=await user.save();
   res.send(SaveUser);
}
catch(err){
    res.status(400).send(err)

}
})

router.post('/login',async (req,res)=>{
    //checking given details format before sending db to check
    const {error}=loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //checking if user alredy in dababase
    const user=await UserModel.findOne({email:req.body.email});
    
    if(!user) return res.status(400).send("email  does not exists");
    //checking password is correct
     const validpass=await bcrypt.compare(req.body.password,user.password)

     if(!validpass) return  res.status(400).send("Invalid password")

     //create and assign  a token after user successfully loged in

     const token=jwt.sign({_id:user._id},process.env.TOKEN_KEY)

     res.header('auth-token',token).send(token);


})


export default router;