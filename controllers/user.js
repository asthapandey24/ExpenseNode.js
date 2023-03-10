
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