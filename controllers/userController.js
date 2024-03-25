const User = require("../models/userModel");
const bcrypt =require('bcrypt');

const loadRegister= async(req, res) =>{
    try{
        res.render('register');

    }catch(error){
      console.log(error.message);
    }
}
const securePassword = async(password)=>{
    try{
        const passwordHash= await bcrypt.hash(password,10);
        return passwordHash;

    }catch(error){
        console.log(error.message);
    }
}
const insertUser = async (req, res) => {
  try {
    // console.log("Request Body:", req.body);
    // Check if request body contains the necessary fields
    if (!req.body || !req.body.name || !req.body.email || !req.body.mobile || !req.body.password) {
      return res.status(400).json({ message: "Incomplete user data" });
    }

    const spassword = await securePassword(req.body.password);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: spassword,
      is_admin: 0
    });

    const userData = await user.save();
    if (userData) {
      return res.render('register', { "message": "Registration successful" });
    } else {
      return res.render('register', { "message": "Unable to register user" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}


// const insertUser= async(req, res)=>{
//     try{
//         const spassword= await securePassword(req.body.password);

//         const user = new User({
//         name:req.body.name,
//         email :req.body.email,
//         mobile :req.body.mobile,
//         password :spassword,
//         is_admin :0

//         });
//         const userData= await user.save();
//         if(userData){
//           console.log("User Data:", userData);
//             res.render('register',{"message": "Registraion suceessfully" })
//         }
//         else{
//             res.render('register',{"message": "Unable to Register" })

//         }
        
//     }catch(error){
//         console.log(error.message);
      
//     }
// }

// logi user
const loadLogin= async(req, res) =>{
  try{
      res.render('login');

  }catch(error){
    console.log(error.message);
  }
}

const userLogin = async (req, res) => {
  try{
    console.log("Session before login:", req.session);
    const email=req.body.email;
    const password=req.body.password;
    
   const userData = await User.findOne({email:email});
   if(userData){
   const passwordMatch = await bcrypt.compare(password,userData.password);
    if(passwordMatch){
      res.session.user_id = userData._id;
      // req.session.userData = userData;
      // req.session.authorized= true;
      res.redirect('/home');

    }
    else{
      res.render('login',{message:"email or password is incorrect"});
    }
   }
   else{
    res.render('login',{message:"email or password is incorrect"});
   }
   console.log("Session after login:", req.session);
  }catch(error){
    console.log(error.message);
  }
}

const loadHome = async(req, res) =>{
  try{
    const userData = await User.findByID({_id:req.session.user_id});
    res.render('home',{user:userData});

  }catch(error){
    console.log(error.message);
  }
}

const userLogout =async(req, res)=>{
  try{
    req.session.destroy();
    res.redirect('/');

  }catch(error){
    console.log(error.message);
  }
}
module.exports={
    loadRegister,
    insertUser,
    loadLogin,
    userLogin,
    loadHome,
    userLogout
}