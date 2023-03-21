
const expensedata = require('../models/expensetable.js');
const User = require('../models/createtable.js')
const sequelize = require('../util/database.js')

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


     exports.getAdduser = async(req, res, next)=>{

      const users =  await expensedata.findAll({where: {userId: req.user.id}})
      res.status(200).json({details: users})
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

    const NewTotalExpenses = Number(req.user.totalExpenses) - Number(Datatobedeleted[0].dataValues.expense)
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