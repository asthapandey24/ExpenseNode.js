
const expensedata = require('../models/expensetable.js');

exports.postAdduser = async(req,res,next)=>{          
    const expense = req.body.expense;
    const discription = req.body.discription
    const category =  req.body.category;
  const data = await expensedata.create({expense:expense, discription: discription, category: category,userId: req.user.id});
   res.status(201).json({details: data})

   }

   exports.getAdduser = async(req, res, next)=>{

    const users =  await expensedata.findAll({where: {userId: req.user.id}})
    res.status(200).json({details: users})
 }


exports.deleteuser = async(req, res) =>{
    //console.log(req.params.id)
  var user_Id = (req.params.id);
  //console.log(user_Id);
  //console.log(user_Id.typeOf())
  await expensedata.destroy({where: {id:user_Id , userId: req.user.id}})
    res.status(200);
 }