
const User = require('../models/createtable.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

  function isstringValid(string){
 if(string == undefined || string.length ===0 ){
  return true
 }else{
   return false
}
}

 exports.signup = async(req,res)=>{ 
  try {
     const {name, email, password} = req.body;
      // if(name == null || name.length ===0|| email == null|| email.length ===0||password == null ||
      //    password.length ===0){                                                                 // we used this code for security purpose because frontened could be hacked
      //    return res.status(400).json({err: "something is missing"})
      //   }

      if(isstringValid(name)|| isstringValid(email)|| isstringValid(password)){
        res.status(400).json({msg: 'something is missing'})
      }
        const saltrounds = 10
        bcrypt.hash(password, saltrounds, async(err, hash)=>{
          console.log(err)
       await User.create({name, email, password: hash})
        res.status(201).json({msg : 'successful'})
        })
       }catch(err){
          res.status(500).json(err)
       }

   }

   function generateToken(id, name ){
    return jwt.sign({userId: id , name: name } , 'mySecretKey')
   }



   exports.login = async(req, res)=>{
    try{
    const {email, password} = req.body;
    if(isstringValid(email)|| isstringValid(password)){
      res.status(400).json({msg: 'something is missing'})
    }
    console.log(password)
     const user = await User.findAll({where: {email}})
        if(user.length>0){
         bcrypt.compare(password, user[0].password, (err, response)=>{
        if(response == true){
           res.status(200).json({success: true, message: 'user logged in successfully', token: generateToken(user[0].id, user[0].name)})
          }
        else if(err){
                return res.status(500).json({message: 'something went wrong'})
          }
        else{
          return res.status(400).json({success: false, message: 'password is incorrect'})
        }
       })
       }else{
        return res.status(404).json({success: false, message: 'does not exist'})
       }
       }catch(err){
      res.status(500).json({message: err, success: false})
      }
    }