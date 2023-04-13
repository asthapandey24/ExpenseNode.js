 const sequelize=require('sequelize');
 const Sequelize=require('../util/database.js');
 const bcrpt=require('bcrypt');
 const Forgetpassword=require('../models/forgotpassword.js');
 const dotenv = require('dotenv');
 dotenv.config();
 const uuid=require('uuid');
 const jwt=require('jsonwebtoken');
// const { and } = require('sequelize');

// function detailencryption(id)// this function through we are encryption aur data with some special keys(secret key)
// {
//     return jwt.sign({userid:id},'mySecreteKey');
// }

const User = require('../models/createtable.js');

const nodemailer = require("nodemailer");


// function generateToken(id){
//   return jwt.sign({userId: id } , 'mySecretKey')
//  }




exports.forgotpassword= (async(req,res,next)=>{
  
//  try{
    
  const user = await User.findOne({where:{email :req.body.email}}) // its return array of object
   console.log(user.id)

//     const Sib=require('sib-api-v3-sdk');
//     require('dotenv').config()
//     const client=Sib.ApiClient.instance

//     const apikey = client.authentications['api-key'];
// //   // apikey.apikey = process.env.API_KEY
//     apikey.apikey ='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'
// //    //console.log('------------------------------------------------');
//     const tranEmailApi = new Sib.TransactionalEmailsApi();
  
//     const sender = {
//       email :'asthaa2024@gmail.com'
//     }
   
//     const receivers = [
//       {
//         email :'ashaa00123@gmail.com',
    
//       },
//     ]
  
// //        //console.log("data found");
//         tranEmailApi.sendTransacEmail({
//           sender,
//           to: receivers,
//           subject: "Reset Password",
//           textContent: "Send a reset password mail",
//           htmlContent: `<h1>this side ajay</h1>`,
 
//       }).then(response=>{
//           console.log("successfully"+response)

//           }).catch(err =>{
//            console.log(err)
//           })
  

//    // res.end();
//   } catch (error) {
//    console.log("Fail"+error);
//   }
           
          if(user){
              const id = uuid.v4();
             Forgetpassword.create({ id , 
                active: true,
              userId: user.id})
                  .catch(err => {
                     throw new Error(err)
                 })




const transporter = nodemailer.createTransport({
 // host: 'smtp.ethereal.email',
 host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: process.env.USER_NAME,
      pass: process.env.USER_PASSWORD//
        
  }
});


 let info = await transporter.sendMail({
   from: '"Astha" <asthaa2024@gmail.com>', // sender address
   to:  req.body.email, // list of receivers
   subject: "Hello ✔", // Subject line
   text: "Hello world?", // plain text body
   html: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`, // html body
  })
   console.log("Message sent: %s",info.messageId);
  res.json(info);
 }
 else{
     throw new Error('User doesnt exist')
 }
// }catch(error){
//   return res.status(400).json({message:error});
//  }
 })


   exports.resetpassword = (async(req, res) => {
     try{
    const id =  req.params.id;
    console.log(req.params.id)
    const isValid = await Forgetpassword.findOne({ where: {id}})
   // console.log(isValid)
       if(isValid){
           Forgetpassword.update({ active: false}, {where: {id}})
           
             res.status(200).send(`<html>
                                     <script>
                                         function formsubmitted(e){
                                             e.preventDefault();
                                             console.log('called')
                                         }
                                      </script>
                                      <form action="/password/updatepassword/${id}" method="get">
                                          <label for="newpassword">Enter New password</label>
                                         <input name="newpassword" type="password" required></input>
                                         <button>reset password</button>
                                     </form>
                                </html>`)
          //  res.redirect(`http://127.0.0.1:5500/resetPassword.html`)
                                            }

                                              else{
                                              console.log('link not valid')
                                                   }

                                                  }catch(err){
                                                    console.log(err);
                                                  }
                                                   res.end()   
   }) 

 
          
  //  exports.updatepassword=(async(req,res)=>{
  //   console.log("i am updatepassword calling");
  //   console.log(req.params.id); 
  //   console.log("userpass"+req.body.newpass);
  //   const passowrd= req.body.newpass;
  //   const saltround=10;
  //   try {
  //     bcrpt.hash(passowrd,saltround, async(err,hash)=>{
  //       const ouput= await User.update({ userpass: hash}, { where: { id: req.params.id } })
  //       console.log("output"+ouput);
  //              return res.json(true);
  //     })
          
  // } catch (error) {
  //   console.log("errpr+"+error);
  //     return res.json(false);
      
  // }
  //  })

  exports.updatepassword =(async(req, res) => {

    try {
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        console.log(resetpasswordid)
        const resetpasswordrequest = await Forgetpassword.findOne({ where : { id: resetpasswordid }})
        console.log(resetpasswordrequest)
          const user =  await User.findOne({where: { id : resetpasswordrequest.userId}})
                // console.log('userDetails', user)
                if(user) {
                    //encrypt the password

                    const saltRounds = 10;
                    bcrpt.genSalt(saltRounds, function(err, salt) {
                        if(err){
                            console.log(err);
                            throw new Error(err);
                        }
                        bcrpt.hash(newpassword, salt, function(err, hash) {
                            // Store hash in your password DB.
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                              User.update({ password: hash },{where: {id: resetpasswordrequest.userId}})
                                //res.status(201).json({message: 'Successfuly update the new password'})
                            })
                        });
            } else{
                return res.status(404).json({ error: 'No user Exists', success: false})
            }
    } catch(error){
        return res.status(403).json({ error, success: false } )
    }
  
})








