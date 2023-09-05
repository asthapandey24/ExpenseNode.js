const mongoose=require('mongoose');
const mongoconnection=require('../util/database');
const expensedata = require('../models/expensetable.js');
const User = require('../models/createtable.js');
//const sequelize = require('../util/database.js');
//const AWS = require('aws-sdk');
//require('dotenv').config();
//const S3services = require('../services/userservices.js');
//const downloaddetail = require('../models/downloaddetail.js');

      


// exports.downloadexpense = async(req,res)=>{
//   const username = req.user.id
//  try{
//  const expenses = await expensedata.findAll({where: {userId: req.user.id}})
//   console.log(expenses);
//   const stringifiedExpenses = JSON.stringify(expenses);
//   const filename = `Expense${username}/${new Date()}.txt`
//   const fileURL = await S3services.uploadToS3(stringifiedExpenses, filename);
//   console.log(fileURL)
 
//   await downloaddetail.create({
//     filename: fileURL,
//     // expense:"lhjh",
//     downloaddate:Date(),
//     userId: req.user.id
// });

//   res.status(200).json({fileURL, success: true})
//  }catch(err){
//   console.log(err)
//   res.status(500).json({fileURL: '', success: false, err: err})
//  }
// }

















exports.postAdduser=(async(req,res,next)=>{

  console.log(req.body.expense);
  console.log(req.body.category);
  console.log(req.body.discription);
  console.log("inser"+req.user.id);
  const expensevalue=parseInt(req.body.expense);
  
      
  console.log("");
  try {
       const NewExpense= new expensedata({
          expense:req.body.expense,
          category:req.body.category,
          discription:req.body.discription,
          userId:req.user.id
       });


       const savedExpense =  await NewExpense.save();
      
        await User.updateOne(
              { _id: req.user.id },
              { $inc: { totalexpense: expensevalue } },
            
            )

              return res.status(200).json({id:savedExpense._id,success:true,msg:"Data Insert Successfully"})
              
  } catch (error) {
      console.log("somewent wrong in addexpense"+error);
      return res.status(400).json({success:false,msg:"Something Went Wrong"});
  } finally {
      // session.endSession();
  }

});








    // const ITEMS_PER_PAGE=parseInt(req.query.pagesize)
     exports.getAdduser = async(req, res, next)=>{
      try{
      const ITEMS_PER_PAGE=parseInt(req.query.param2)|| 5
      console.log(req.query.param2)
      const pageNumber=parseInt(req.query.param1)
      const TotalProduct =  expensedata.find({userId: req.user.id}).count()
      .then(async(TotalProduct)=>{

      console.log(TotalProduct)
      const users =  await expensedata.find( {userId: req.user.id})
        .skip((pageNumber-1)*ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE ) 
        .exec()
        if(users.length>0 && users!==null && users!==undefined)
        {
      res.status(200).json({success:true,msg:"Record Fetch successfully",
      users,ispremiumuser:req.user.ispremium,
      currentPage:pageNumber,
      hasNextPage:ITEMS_PER_PAGE*pageNumber<TotalProduct,
      nextPage:parseInt(pageNumber)+1,
      hasPreviousPage:pageNumber>1,
      previousPage:pageNumber-1,
      lastPage:Math.ceil(TotalProduct/ITEMS_PER_PAGE)
        });
        }else if(users.length===0){
          res.status(200).json({success:true,msg:"No Record Found",users,ispremiumuser:req.user.ispremium});
        }
      })
    }catch(error){
      res.status(400).json({success:false,msg:"Something went wrong"});
    }
    }
      
    

// // exports.getAdduser = (req, res)=> {
    
// //   expensedata.findAll({ where : { userId: req.user.id}}).then(expenses => {
// //       return res.status(200).json({expenses, success: true})
// //   })
// //   .catch(err => {
// //       console.log(err)
// //       return res.status(500).json({ error: err, success: false})
// //   })
// // }


  // exports.deleteuser = async(req, res) =>{
  //   const t =  await sequelize.transaction()  
  //   try{
  //   var user_Id = (req.params.id);
  //  let Datatobedeleted = await expensedata.findAll({where: {id: req.params.id}, transaction: t})
  //   console.log(Datatobedeleted)
  //    await expensedata.destroy({where: {id:user_Id , userId: req.user.id}, transaction: t} )

  //   const NewTotalExpenses = Number(req.user.totalExpenses) - Number(Datatobedeleted[0].expense)////
  //   console.log(NewTotalExpenses)
  //    await  User.update({
  //   totalExpenses: NewTotalExpenses
  //  },{
  //   where: { id: req.user.id},
  //     transaction: t
  //  })
  //  try{
  //   await t.commit()
  //   res.status(200).json({msg : 'successful'})
  //  }catch  (err){
  //  await t.rollback()
  //   return res.status(500).json({success: false, error: err})
  //  }

  // }catch (err){
  //  await t.rollback()
  //   return res.status(500).json({success: false, error: err})
  //  }

  // }

//   exports.deleteuser=(async(req,res,next)=>{ //where:{id:req.params.id,tbluserdetailId:req.user.id}
//     console.log(" i am dele"+req.user.id);
//     try {
//         console.log(" i am dele"+req.params.id);
//                 const deletedata=await expensedata.findByIdAndDelete(req.params.id);
//                 const reduceExpense = await User.findOneAndUpdate( { _id: req.user.id },
//                     { $inc: { totalexpense: -deletedata.expense
//                          } });
              
//         if(deletedata._id.toString()===req.params.id)
//         {
//             console.log("data deleted succfully"+deletedata);
//             return res.status(200).json({success:true,msg:"data deleted successfully"})
//         }

//     } catch (error) {
//         console.log("something went wrong in delete section"+error);
//         return res.status(400).json({success:false,msg:`omething went wrong in delete sections = ${error}`}) 
//     }
// })

exports.deleteuser = async (req, res, next) => {
  console.log(" i am dele" + req.user.id);
  try {
    console.log(" i am dele" + req.params.id);
    const deletedata = await expensedata.findByIdAndDelete(req.params.id);

    // Check if deletedata is null
    if (!deletedata) {
      return res
        .status(404)
        .json({ success: false, msg: "Data not found for deletion" });
    }

    const reduceExpense = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $inc: {
          totalexpense: -deletedata.expense,
        },
      }
    );

    console.log("data deleted successfully" + deletedata);
    return res.status(200).json({ success: true, msg: "Data deleted successfully" });
  } catch (error) {
    console.log("something went wrong in delete section: " + error);
    return res
      .status(400)
      .json({ success: false, msg: `Something went wrong in delete section: ${error}` });
  }
};







//   exports.downloadAllexpensedataFile=(async(req,res)=>{
//     try {
//         const downloadFileData = await downloaddetail.findAll({where:{userId: req.user.id}});
//         res.status(200).json({success:true,downloadFileData});
//     } catch (error) {
//         res.status(500).json({success:false,error:error});
//     }

// });