
const path = require('path')
const express=require('express');
const app=express();

var cors = require('cors');

const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const mongoose = require("mongoose");
require("./util/database");


const dotenv = require('dotenv');




const User = require('./models/createtable.js');
const expensedata = require('./models/expensetable.js')
const Order = require('./models/order.js');
const forgetPasswordRequest = require('./models/forgotpassword.js');
//const downloadmodels = require('./models/downloaddetail.js');


const router =require('./routes/router.js');
const expenseRouter = require('./routes/expenseroute.js');
const purchaseRoutes = require('./routes/purchase.js');
const premiumFeatureRoutes = require('./routes/premiumFeature.js');
const forgotPassword = require('./routes/forgotpassword.js');

app.use(cors());

dotenv.config();

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
//app.use(express.json());


app.use( '/user',router);
app.use('/expensetable', expenseRouter)
app.use('/purchase', purchaseRoutes)
app.use('/premium', premiumFeatureRoutes)
app.use('/password', forgotPassword)

//User.hasMany(expensedata)
//expensedata.belongsTo(User)

//User.hasMany(Order);
// Order.belongsTo(User)

// User.hasMany(forgetPasswordRequest);
// forgetPasswordRequest.belongsTo(User);  


// User.hasMany(downloadmodels);
// downloadmodels.belongsTo(User);
// // without routing testing

// app.post('/user/signUp',async(req,res,next)=>{    
//                  const name = req.body.name;
//                 const email = req.body.email;
//                  const password =  req.body.password;
//                const data = await User.create({name: name, email: email, password: password});
//                 res.status(201).json({details: data})
    
//                 })



    // sequelize.sync()
    // .then((result)=>{
    //  //   console.log("-------"+result);
    //     app.listen(process.env.PORT|| 3000);
    // }).catch(err=>{
    //     console.log(err);
    // });
    
    const connectDB = async () => {
      try {
        await mongoose.connect("mongodb://127.0.0.1:27017/ExpenseTracker", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
          console.log("Server started on port 3000");
        });
      } catch (error) {
        console.error("Failed to connect to the database:", error);
      }
    };
    
    connectDB();



