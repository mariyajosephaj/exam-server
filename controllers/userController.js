const users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// register
exports.registerController = async (req,res)=>{
    console.log("Inside registerController");
     const {firstname,lastname,email,password,phonenumber}=req.body
     console.log(firstname,lastname,email,password,phonenumber);
    //  password eccryption using bcrypt
     var value = req.body.password
     const salt = await bcrypt.genSalt(20)
     value = await bcrypt.hash(value,salt)
    //  console.log(value);
    // ex : $2b$20$UD7g91o6B3msFXbcP2pM6ezgzN1PuOBj4x4q.XDpU7PxpJQ07Jo3W
     
     try{
       const existingUser=await users.findOne({email})
       if(existingUser){
        res.status(406).json("User already exist !! please login")
       }
       else{
           const newUser = new users({
            firstname,lastname,email,password:value,phonenumber
           })
           await newUser.save()
           res.status(200).json(newUser)
       }
     }catch(err){
        res.status(401).json(err)
     }

    }

    // login

    exports.loginController = async (req,res)=>{
        console.log("Inside loginController");
         const {email,password}=req.body
         console.log(email,password);
    
         try{
           const existingUser=await users.findOne({email,password})
           if(existingUser){
            // token generation
            const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({
                user:existingUser,
                token
            })
           }
           else{
              res.status(404).json("Invalid Email/Password")
           }
         }catch(err){
            res.status(401).json(err)
         }
    
        }

        // get user details 
exports.getUserController = async (req,res)=>{
    console.log("Inside getUserController");
    const userId=req.userId
    try{
         const allUsers= await users.find().select('-password')
         res.status(200).json(allUsers)
    }
    catch(err){
         res.status(401).json(err)
    }
    
}
    
