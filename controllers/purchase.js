const Razorpay = require('razorpay');
const Order = require('../models/order.js')
const User = require('../models/createtable.js');
const dotenv = require('dotenv');
dotenv.config();


exports.purchasepremium =async (req, res) => {
    try {
        var rzp = new Razorpay({
            key_id :process.env.RAZORPAY_KEY_ID ,
            key_secret: process.env.RAZORPAY_KEY_SECRET 

        })
        const amount = 6000;

         rzp.orders.create({amount, currency: "INR"}, (err, order) => {
            if(err) {
                throw new Error(JSON.stringify(err));
            }
        //     req.user.createOrder({ orderid: order.id, status: 'PENDING'}).then(() => {
        //         return res.status(201).json({ order, key_id : rzp.key_id});

        //     }).catch(err => {
        //         throw new Error(err)
        //     })
        // })

        const newdata = Order({
            orderid:order.id,
            status:'Pending',
            userId:req.user.id
        });
             newdata.save() 
            .then(()=>{
                console.log("success");
                return res.status(201).json({order,key_id:rzp.key_id});
            }).catch(err=>{
                console.log("eroor"+err)
            });
        })
    } catch(err){
        console.log(err);
        res.status(403).json({ message: 'Sometghing went wrong', error: err})
    }
}

 exports.updateTransactionStatus = async (req, res ) => {
    try {
        const userId = req.user.id;
        const {payment_id, order_id} = req.body;
        const order  = await Order.findOne( {orderid : order_id}) //2
        const promise1 =  order.updateOne({ paymentid: payment_id, status: 'SUCCESSFUL'}) 
        const promise2 =  req.user.updateOne({ ispremiumuser: true }) 

        Promise.all([promise1, promise2]).then(()=> {
            return res.status(202).json({sucess: true, message: "Transaction Successful" });
        }).catch((error ) => {
            throw new Error(error)
        })

        
                
    } catch (err) {
        console.log(err);
        res.status(403).json({ error: err, message: 'Sometghing went wrong' })

    }
}











