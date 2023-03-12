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



axios.post(`http://localhost:3000/expensetable/add-user`,myObj )
.then((response)=>{
   displayUser(myObj)
   console.log(response) 
})
.catch((err)=>{
   document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>"
   console.log(err)
})



}




window.addEventListener('DOMContentLoaded', (event) => { 
axios.get('http://localhost:3000/expensetable/get-user')
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
 axios.delete(`http://localhost:3000/expensetable/delete-user/${userId}`)
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
  


