
const User = require('../models/createtable.js');

//  function isstringValid(string){
// if(string == undefined || string.length ===0 ){
//  return true
// }else{
//   return false
// }
// }

 exports.signup = async(req,res)=>{ 
  try {
     const {name, email, password} = req.body;
      if(name == null || name.length ===0|| email == null|| email.length ===0||password == null ||
         password.length ===0){                                                                 // we used this code for security purpose because frontened could be hacked
         return res.status(400).json({err: "something is missing"})
        }
       await User.create({name, email, password})
        res.status(201).json({msg : 'successful'})
       }catch(err){
          res.status(500).json(err)
       }

   }

   exports.login = (req, res)=>{
    const {email, password} = req.body;
    console.log(password)
    User.findAll({where: {email}}).then(user =>{
      if(user.length>0){
        if(user[0].password == password){
           res.status(200).json({success: true, message: 'user logged in successfully'})
        }
        else{
          return res.status(400).json({success: false, message: 'password is incorrect'})
        }
      }else{
        return res.status(404).json({success: false, message: 'does not exist'})
      }
    }).catch(err =>{
      res.status(500).json({message: err, success: false})
    })
   }