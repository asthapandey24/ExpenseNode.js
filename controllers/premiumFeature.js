const User = require('../models/createtable.js');
const Expense = require('../models/expensetable.js');
const sequelize = require('../util/database.js');
const e = require('express');

const getUserLeaderBoard = async (req, res) => {
    try{
        
            
             const leaderboardofusers = await User.findAll({
            //     attributes: ['id', 'name',[sequelize.fn('sum', sequelize.col('expense')), 'total_cost'] ],
            //      include: [
            //          {
            //             model: Expense,
            //              attributes: []
            //         }
            //      ],
            //      group:['user.id'],
                order:[['totalExpenses', 'DESC']]
    
            })
           
            res.status(200).json(leaderboardofusers)

        
    
        // const expenses = await Expense.findAll({
        //     attributes: ['userId',[sequelize.fn('sum', sequelize.col(Expense.expense)), 'total_cost']],
        //     group: ['userId']
        // })
        // const userAggregateExpenses = {} // object
        // expenses.forEach(expenseAmount => {
        //     if(userAggregateExpenses[expenseAmount.userId]){
        //     userAggregateExpenses[expenseAmount.userId] =  userAggregateExpenses[expenseAmount.userId]+ expenseAmount.expense
        //     }else{
        //         userAggregateExpenses[expenseAmount.userId] = expenseAmount.expense
        //     }
        // })
        //  var UserLeaderBoardDetails = []
        //   users.forEach((user)=>{
        //       UserLeaderBoardDetails.push({name: user.name, total_cost: userAggregateExpenses[user.id] || 0})
        //   })


        // console.log(UserLeaderBoardDetails)
        // UserLeaderBoardDetails.sort((a,b)=> b.total_cost - a.total_cost )
        // res.status(200).json(UserLeaderBoardDetails)
    
} catch (err){
    console.log(err)
    res.status(500).json(err)
}
}

module.exports = {
    getUserLeaderBoard
}