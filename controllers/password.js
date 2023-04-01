

const User = require('../models/createtable.js');


exports.forgotpassword=(async(req,res,next)=>{
  
try{
    // const data= await User.findAll({where:{email:req.body.email}}) // its return array of object
    // console.log(data[0].id);
   // console.log(data.length);


   const Sib=require('sib-api-v3-sdk');
   const client=Sib.ApiClient.instance

   const apiKey = client.authentications['api-key'];
    apiKey.apiKey ='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';
     //apiKey.apiKey ='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';
   
   console.log('------------------------------------------------');
   const tranEmailApi = new Sib.TransactionalEmailsApi();
   
   const sender = {
     email :'apsinghrana100@gmail.com',
   }
   
   const receivers = [
     {
       email :'ashaa00123@gmail.com',
     },
   ]
  
       console.log("data found");
       tranEmailApi.sendTransacEmail({
         sender,
         to: receivers,
         subject: "Reset Password",
         textContent: "Send a reset password mail",
         htmlContent: `<h1>this side ajay</h1>`,
 
     }).then(response=>{
         console.log("successfully"+response)

         }).catch(err =>{
          console.log(err)
         })
  

   // res.end();
 } catch (error) {
  console.log("Fail"+error);
 }
});



















  
    














 