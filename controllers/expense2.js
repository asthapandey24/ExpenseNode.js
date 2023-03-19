
const expensedata = require('../models/expensetable.js');
const User = require('../models/createtable.js')

 exports.postAdduser = (req,res,next)=>{          
   const { expense, discription, category } = req.body;

   if(expense == undefined || expense.length === 0 ){
      return res.status(400).json({success: false, message: 'Parameters missing'})
 }
      
       expensedata.create({expense, discription, category,userId: req.user.id}).then(expenses =>{
      const TotalExpense = Number(req.user.totalExpenses) + Number(expense)
        console.log(TotalExpense)
       User.update({
        totalExpenses: TotalExpense
       },{
        where: {id: req.user.id}
       }).then(async()=>{
        res.status(200).json({details: expenses})
       }).catch(async(err) =>{
        return res.status(500).json({success: false, error: err})
       })
      })
      .catch(err => {
        return res.status(500).json({success: false, error: err})
      })
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
//      //console.log(req.params.id)
    var user_Id = (req.params.id);
//   //console.log(user_Id);
//    //console.log(user_Id.typeOf())
    await expensedata.destroy({where: {id:user_Id , userId: req.user.id}})
      res.status(200);
   }

