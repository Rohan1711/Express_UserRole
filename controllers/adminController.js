const User = require("../models/userModel");
const bcrypt =require('bcrypt');


const loadLogin= async(req, res) =>{
    try{
        res.render('login');

    }catch(error){
      console.log(error.message);
    }
}

const adminLogin = async (req, res) => {
    try{
      const email=req.body.email;
      const password=req.body.password;
      
     const userData = await User.findOne({email:email});
     if(userData){
     const passwordMatch = await bcrypt.compare(password,userData.password);
      if(passwordMatch){
        if(userData.is_admin === 0){
            res.render('login',{message:"email or password is incorrect"});
        }
        else{
            res.session.user_id =userData._id;
            res.redirect('/admin/home');
        }
        
      }
      else{
        res.render('login',{message:"email or password is incorrect"});
      }
     }
     else{
      res.render('login',{message:"email or password is incorrect"});
     }
  
    }catch(error){
      console.log(error.message);
    }
  }

const loadDashboard = async(req, res) =>{
    try{
    //   const userData = await User.findByID({_id:req.session.user_id});
    //   res.render('/home',{user:userData});
         res.render('home');
  
    }catch(error){
      console.log(error.message);
    }
  }


const adminLogout =async(req, res)=>{
    try{
      req.session.destroy();
      res.redirect('/admin');
  
    }catch(error){
      console.log(error.message);
    }
  }

module.exports={
    loadLogin,
    adminLogin,
    loadDashboard,
    adminLogout
}