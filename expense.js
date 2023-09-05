
const token = localStorage.getItem('token');
const pagination = document.getElementById('pagination');
const selectElement = document.getElementById('rowPerPage');
console.log(selectElement.value)
// const selectedOption = selectElement.selectedOptions[0];
// console.log(`Selected option: ${selectedOption.value}`);  
// const rowsize=selectedOption.value;
//const objUrlParams = new URLSearchParams(window.location.serach);





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
//const token = localStorage.getItem('token')


selectElement.addEventListener("change", async () => {

  const selectedOption = selectElement.selectedOption[0];
    console.log(`Selected option: ${selectedOption.value}`);  
    const rowsize=selectedOption.value;
    //objUrlParams.get('pagesize')
    localStorage.setItem('pagesize',rowsize);
    const pageno = localStorage.getItem('pageno')
    const expenseiii= await axios.get(`http://localhost:3000/expensetable/get-user?param1=${pageno}&param2=${rowsize}`,{headers:{"Authorization":token}});
    console.log(expenseiii);/////////
    showPagination(
        expenseiii.data.currentPage,
        expenseiii.data.hasNextPage,
        expenseiii.data.nextPage,
        expenseiii.data.hasPreviousPage,
        expenseiii.data.previousPage,
        expenseiii.data.lastPage)
      //  table.innerHTML="";
    for (let index = 0; index < expenseiii.data.users.length; index++) {
    display(expenseiii.data.users[index]);
    }
  
})



axios.post('http://localhost:3000/expensetable/add-user',myObj,{headers: {"Authorization": token}} )
.then((response)=>{
  
  const newExpenseId = response.data.id;
   displayUser({id: newExpenseId, ...myObj})
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



window.addEventListener('DOMContentLoaded',async(event) => { 
 // const token = localStorage.getItem('token')
 const objUrlParams = new URLSearchParams(window.location.search);
 
 var pageno = objUrlParams.get("pageno") || 1
localStorage.setItem('pageno', pageno)
var pagesize = localStorage.getItem('pagesize') || 5
  const decodeToken =  parseJwt(token)
  const ispremiumuser = decodeToken.ispremiumuser
  if(ispremiumuser){
      showPremiumuserMessage()
      showLeaderboard()

  }

 const expenseiii = await axios.get(`http://localhost:3000/expensetable/get-user?param1=${pageno}&param2=${pagesize}`, {headers: {"Authorization": token}})
 console.log(expenseiii)
 
 // .then((response) =>{
  //  console.log(response)
  //  //listProducts(response.data.products)
  //  showPagination(response.data)
  //  for(var i=0; i< response.data.users.length; i++){
  //      displayUser(response.data.users[i])
  //  }
  // })
  // .catch((error)=>{
  //   console.log(error)
  // })
//  
showPagination(
  expenseiii.data.currentPage,
  expenseiii.data.hasNextPage,
  expenseiii.data.nextPage,
  expenseiii.data.hasPreviousPage,
  expenseiii.data.previousPage,
  expenseiii.data.lastPage)

   for (let i = 0; i < expenseiii.data.users.length; i++) {
    displayUser(expenseiii.data.users[i]);
   }
  })
   


  


    function displayUser(details) {
    
        const parentNode = document.getElementById('Users');
        const childHTML = `<li id=${details._id}>${details.expense} - ${details.discription} - ${details.category}
        <button onClick=deleteUser('${details._id}')>Delete</button>
        <button onclick=edituser('${details._id}','${details.expense}','${details.discription}')>Edit</button> </li>`;
      
        parentNode.innerHTML = parentNode.innerHTML + childHTML;
      } 
    
    




function deleteUser(userId){
  //const token = localStorage.getItem('token')
  if (!userId) {
    console.error('userId is undefined or empty');
    return;
  }
 axios.delete(`http://localhost:3000/expensetable/delete-user/${userId}`, {headers:{"Authorization": token}})
 .then((response)=>{
   removeItemfromScreen(userId);
   showLeaderboard()
   
  
   console.log(response)
 })
.catch((err)=>{
   console.log(err)
})


}


// function removeItemfromScreen(userId){
 
// const elem = document.getElementById(userId)
// parentNode.removeChild(elem)


// }

function removeItemfromScreen(userId) {
  const elem = document.getElementById(userId);
  if (elem) {
    elem.parentNode.removeChild(elem);
  } else {
    console.error(`Element with id ${userId} not found`);
  }
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
     //   const token = localStorage.getItem('token')
        const userLeaderBoardArray = await axios.get('http://localhost:3000/premium/showLeaderBoard', { headers: {"Authorization" : token} })
        console.log(userLeaderBoardArray)

        var leaderboardElem = document.getElementById('leaderboard')
        leaderboardElem.innerHTML += '<h1> Leader Board </<h1>'
        userLeaderBoardArray.data.forEach((userDetails) => {
            leaderboardElem.innerHTML += `<li>Name - ${userDetails.name} Total Expense - ${userDetails.totalExpenses || 0} </li>`
        })
    }
    document.getElementById("message").appendChild(inputElement);



  }




  function download(){
    axios.get('http://localhost:3000/expensetable/download', { headers: {"Authorization" : token} })
    .then((response) => {
        if(response.status === 201){
            //the bcakend is essentially sending a download link
            //  which if we open in browser, the file would download
            var a = document.createElement("a");
            a.href = response.data.fileUrl;
            a.download = 'myexpense.txt';
            a.click();
        } else {
            throw new Error(response.data.message)
        }

    })
    .catch((err) => {
        showError(err)
    });

  }


    async function downloadfiledata(){

     try{
    const downloaddetail = await axios.get('http://localhost:3000/expensetable/downloadfiledata', { headers: {"Authorization" : token} })
    
        console.log(downloaddetail)
      var downloadElem = document.getElementById('downloadedfile')
      downloadElem.innerHTML += '<h1> All Downloads </<h1>'
      for(let i =0; i<=downloaddetail.data.downloadFileData.length; i++){
          downloadElem.innerHTML =  `<li>downloadDate - ${downloaddetail.data.downloadFileData[i].downloaddate}
          URL - ${downloaddetail.data.downloadFileData[i].filename} 
          <button onClick = downloadFile('${downloaddetail.data.downloadFileData[i].filename}')>download</button></li>`
      }
    

    } catch(err){
      console.log(err)
    }


      }
    

    

      

     
     function downloadFile(fileUrl) {
      var url = fileUrl; // replace with your file URL
      var a = document.createElement('a');
      a.href = url;
      a.download = 'Expense.pdf'; // replace with your desired file name
      a.click();
      

    }


function showPagination(
  currentPage,
  hasNextPage,
   nextPage,
   hasPreviousPage,
   previousPage,
   lastPage
  )
{
  pagination.innerHTML = '';
  if(hasPreviousPage){
  const btn2 = document.createElement('button')
  btn2.innerHTML = previousPage
  btn2.addEventListener('click', function(event){
    event.preventDefault()
    getProducts(previousPage)
 })
  pagination.appendChild(btn2)

  }

  const btn1 = document.createElement('button')
  btn1.innerHTML = `<h3>${currentPage}</h3>`
  btn1.addEventListener('click', function(event){
  event.preventDefault()
  localStorage.setItem('pageno',currentPage)
  getProducts(currentPage)
  })
  pagination.appendChild(btn1)

  if(hasNextPage){
    pagination.innerHTML='';
 const btn3 = document.createElement('button')
 btn3.innerHTML = nextPage
 btn3.addEventListener('click', function(event){
   event.preventDefault()
   getProducts(nextPage)
 })
 pagination.appendChild(btn3)
 }
  }

  async function getProducts(page){
   var rowsize = localStorage.getItem('pagesize')
  localStorage.setItem('pageno', page)
   pagination.innerHTML='';
 const expenseiii = await axios.get(`http://localhost:3000/expensetable/get-user?param1=${page}&param2=${rowsize}`,{headers:{"Authorization": token}})  
 console.log(expenseiii.data)

  for(let i=0; i< expenseiii.data.users.length; i++){
    displayUser(expenseiii.data.users[i]);
  }

  showPagination(
              expenseiii.data.currentPage,
              expenseiii.data.hasNextPage,
              expenseiii.data.nextPage,
              expenseiii.data.hasPreviousPage,
              expenseiii.data.previousPage,
              expenseiii.data.lastPage        
               )
    

 }












// integeration with razorpay code ********************************************************

   document.getElementById('rzp-button1').onclick = async function (event) {
   // const token = localStorage.getItem('token')
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





