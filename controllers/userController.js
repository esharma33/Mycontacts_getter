const asyncHandler = require("express-async-handler");``
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");// Not (jwt is made up of three parts : Header algo of the token, second contains the payload means the user's info is hidden in this part which is used to verify the user which is added in the backend , the last consists of the signature verification   )
//@desc Post register user
//@route POST /api/users/register
//@acccess public
const registerUser = asyncHandler( async(req,res) =>{
    const {username , email , password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All the feilds are mandatory!");
    }

    const userAvailable = await User.findOne({email});
     if(userAvailable){
        res.status(400);
        throw new Error("User already registered!");
     }
  // hash Password
  const hashedPwd = await bcrypt.hash(password, 10);
  console.log("Hashed Password :", hashedPwd);

  const user = await User.create({
    username,
    email,
    password: hashedPwd
  });
console.log(`User created ${user}`);
if(user){
    res.status(201).json({_id: user.id, email:user.email});
} else{
    res.status(400);
    throw new Error("User data is not valid");
}
    res.status(200).json({message: "Register the user"});
});

//@desc Post login user
//@route POST /api/users/login
//@acccess public
const loginUser = asyncHandler( async(req,res) =>{
    // const contacts = await Contact.find();
    const { email , password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All the feilds are mandatory!");
    }

    const user = await User.findOne({email});
     if(user && await bcrypt.compare(password, user.password)){
       const accessToken = jwt.sign({
        user:{
            username: user.username,
            email: user.email,
            id:user.id,
        },
       }, process.env.ACCESS_SECRECT_TOKEN,
       {expiresIn: "15m"}
       );
        res.status(200).json({accessToken});
     } else{
        res.status(401)
        throw new Error("email or password is not valid");
     }
 });

 //@desc GET current user info
//@route GET /api/users/current
//@acccess private
const getCurrentUser = asyncHandler( async(req,res) =>{
    // const contacts = await Contact.find();
     res.status(200).json(req.user);
 });
 

 module.exports ={registerUser, loginUser, getCurrentUser};