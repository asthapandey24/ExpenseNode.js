function expenseStorage(event){
    event.preventDefault();
    const expense = event.target.expense.value;
    const discription = event.target.discription.value;
    const category = event.target.category.value;
    const myObj = {
        expense,
        discription,
        category
    }

console.log(myObj)
const token = localStorage.getItem('token')



axios.post('http://localhost:3000/expensetable/add-user',myObj,{headers: {"Authorization": token}} )
.then((response)=>{
   displayUser(response.data.details)
   console.log(response) 
})
.catch((err)=>{
   document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>"
   console.log(err)
})



}

function showPremiumuserMessage() {
  document.getElementById('rzp-button1').style.visibility = "hidden"
  document.getElementById('message').innerHTML = "You are a premium user "
}

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}



window.addEventListener('DOMContentLoaded', (event) => { 
  const token = localStorage.getItem('token')
  const decodeToken =  parseJwt(token)
  const ispremiumuser = decodeToken.ispremiumuser
  if(ispremiumuser){
      showPremiumuserMessage()
      showLeaderboard()
  }

axios.get('http://localhost:3000/expensetable/get-user', {headers: {"Authorization": token}})
  .then((response) =>{
   console.log(response)
   for(var i=0; i< response.data.details.length; i++){
       displayUser(response.data.details[i])
   }
  })
  .catch((error)=>{
    console.log(error)
  })
 
});    


function displayUser(details){


const parentNode = document.getElementById('Users');
const childHTML = `<li id = ${details.id} >${details.expense} - ${details.discription} - ${details.category}
<button onClick = deleteUser('${details.id}')>Delete</button>
<button onclick = edituser('${details.id}','${details.expense}','${details.discription}')>Edit</button> </li>`

parentNode.innerHTML = parentNode.innerHTML + childHTML;



}


function deleteUser(userId){
  const token = localStorage.getItem('token')
 axios.delete(`http://localhost:3000/expensetable/delete-user/${userId}`, {headers:{"Authorization": token}})
 .then((response)=>{
   removeItemfromScreen(userId);
   console.log(response)
 })
.catch((err)=>{
   console.log(err)
})


}


function removeItemfromScreen(userId){
 
const elem = document.getElementById(userId)
parentNode.removeChild(elem)

}


function edituser(userId,expense,discription){
    document.getElementById('id1').value = discription
    document.getElementById('id0').value = expense
  
     deleteUser(userId)
   }
  
function showLeaderboard(){
  const inputElement = document.createElement("input")
    inputElement.type = "button"
    inputElement.value = 'Show Leaderboard'
    inputElement.onclick = async() => {
        const token = localStorage.getItem('token')
        const userLeaderBoardArray = await axios.get('http://localhost:3000/premium/showLeaderBoard', { headers: {"Authorization" : token} })
        console.log(userLeaderBoardArray)

        var leaderboardElem = document.getElementById('leaderboard')
        leaderboardElem.innerHTML += '<h1> Leader Board </<h1>'
        userLeaderBoardArray.data.forEach((userDetails) => {
            leaderboardElem.innerHTML += `<li>Name - ${userDetails.name} Total Expense - ${userDetails.total_cost || 0} </li>`
        })
    }
    document.getElementById("message").appendChild(inputElement);



  }






// integeration with razorpay code ********************************************************

   document.getElementById('rzp-button1').onclick = async function (event) {
    const token = localStorage.getItem('token')
    const response  = await axios.get('http://localhost:3000/purchase/premiummembership', { headers: {"Authorization" : token} });
    console.log(response);
    var options =
    {
     "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
     "order_id": response.data.order.id,// For one time payment
     // This handler function will handle the success payment
     "handler": async function (response) {
        const res = await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} })
        
        console.log(res)
         alert('You are a Premium User Now')
         document.getElementById('rzp-button1').style.visibility = "hidden"
         document.getElementById('message').innerHTML = "You are a premium user"
         localStorage.setItem('token', res.data.token)
         showLeaderboard()
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  event.preventDefault();

  rzp1.on('payment.failed', function (response){
    console.log(response)
    alert('something went wrong')
 });
}





