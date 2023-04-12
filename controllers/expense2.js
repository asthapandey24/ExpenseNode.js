
const expensedata = require('../models/expensetable.js');
const User = require('../models/createtable.js');
const sequelize = require('../util/database.js');
//const AWS = require('aws-sdk');
//require('dotenv').config();
const S3services = require('../services/userservices.js');
const downloaddetail = require('../models/downloaddetail.js');

      


exports.downloadexpense = async(req,res)=>{
  const username = req.user.id
 try{
 const expenses = await expensedata.findAll({where: {userId: req.user.id}})
  console.log(expenses);
  const stringifiedExpenses = JSON.stringify(expenses);
  const filename = `Expense${username}/${new Date()}.txt`
  const fileURL = await S3services.uploadToS3(stringifiedExpenses, filename);
  console.log(fileURL)
 
  await downloaddetail.create({
    filename: fileURL,
    // expense:"lhjh",
    downloaddate:Date(),
    userId: req.user.id
});

  res.status(200).json({fileURL, success: true})
 }catch(err){
  console.log(err)
  res.status(500).json({fileURL: '', success: false, err: err})
 }
}














 exports.postAdduser = async(req,res,next)=>{   
  const t =  await sequelize.transaction()      
   const { expense, discription, category } = req.body;

   if(expense == undefined || expense.length === 0 ){
      return res.status(400).json({success: false, message: 'Parameters missing'})
 }
      try{
     const data =  await expensedata.create({expense, discription, category,userId: req.user.id, }, {transaction: t})
      const TotalExpense = Number(req.user.totalExpenses) + Number(expense)
        console.log(TotalExpense)
        await User.update({
        totalExpenses: TotalExpense
       },{
        where: {id: req.user.id},
        transaction: t
       })
       try{
        await t.commit()
        res.status(200).json({details: data})
       }catch(err){
       await t.rollback()
        return res.status(500).json({success: false, error: err})
       }
    
      }catch (err) {
       await t.rollback()
        return res.status(500).json({success: false, error: err})
      }
     }



    // const ITEMS_PER_PAGE=parseInt(req.query.pagesize)
     exports.getAdduser = async(req, res, next)=>{
      
      const ITEMS_PER_PAGE=parseInt(req.query.param2)
      console.log(req.query.param2)
      const pageNumber=parseInt(req.query.param1)
      const TotalProduct =  expensedata.count({where: {userId: req.user.id}})
      .then(async(TotalProduct)=>{

      console.log(TotalProduct)
      const users =  await expensedata.findAll({where: {userId: req.user.id}
      ,offset:(pageNumber-1)*ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE }) 
        if(users.length>0 && users!==null && users!==undefined){

        
      res.status(200).json({success:true,msg:"Record Fetch successfully",users,ispremiumuser:req.user.ispremium,
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


  exports.deleteuser = async(req, res) =>{
    const t =  await sequelize.transaction()  
    try{
    var user_Id = (req.params.id);
   let Datatobedeleted = await expensedata.findAll({where: {id: req.params.id}, transaction: t})
    console.log(Datatobedeleted)
     await expensedata.destroy({where: {id:user_Id , userId: req.user.id}, transaction: t} )

    const NewTotalExpenses = Number(req.user.totalExpenses) - Number(Datatobedeleted[0].expense)////
    console.log(NewTotalExpenses)
     await  User.update({
    totalExpenses: NewTotalExpenses
   },{
    where: { id: req.user.id},
      transaction: t
   })
   try{
    await t.commit()
    res.status(200).json({msg : 'successful'})
   }catch  (err){
   await t.rollback()
    return res.status(500).json({success: false, error: err})
   }

  }catch (err){
   await t.rollback()
    return res.status(500).json({success: false, error: err})
   }

  }

  exports.downloadAllexpensedataFile=(async(req,res)=>{
    try {
        const downloadFileData = await downloaddetail.findAll({where:{userId: req.user.id}});
        res.status(200).json({success:true,downloadFileData});
    } catch (error) {
        res.status(500).json({success:false,error:error});
    }

});