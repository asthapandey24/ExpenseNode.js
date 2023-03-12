const express=require('express');
const app=express();

const bodyParser=require('body-parser');
const router =require('./routes/router.js');
const expenseRouter = require('./routes/expenseroute.js')

var cors = require('cors');
const sequelize = require('./util/database.js');

const User = require('./models/createtable.js');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use( '/user',router);
app.use('/expensetable', expenseRouter)

// without routing testing

// app.post('/user/signUp',async(req,res,next)=>{    
//                  const name = req.body.name;
//                 const email = req.body.email;
//                  const password =  req.body.password;
//                const data = await User.create({name: name, email: email, password: password});
//                 res.status(201).json({details: data})
    
//                 })



    sequelize.sync().then((result)=>{
        console.log("-------"+result);
        app.listen(3000);
    }).catch(err=>{
        console.log(err);
    });



