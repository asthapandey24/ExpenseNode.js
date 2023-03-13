const jwt = require('jsonwebtoken');
const User = require('../models/createtable.js')


const authenticate = (req, res, next)=>{
    try{
const token = req.header('Authorization')
console.log(token)                                                 // verify is dcrypt thing 
    const user =  jwt.verify(token, 'mySecretKey');  // here we try to dcrypt it (// process.env.TOKEN_SECRET
                                                                                  // we need to put the same secret key which we used earlier)
        console.log('userID->>>>',user.userId)
       User.findByPk(user.userId).then(user =>{
     //   console.log(JSON.stringify(user))
        req.user = user; /// (v imp we are attaching user as key in global object req )
        next()
    })
   }catch(err){
     console.log(err)
     return res.status(401).json({success: false})
    }


}


module.exports = {
    authenticate
}