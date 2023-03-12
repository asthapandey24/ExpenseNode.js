function login(event){
    event.preventDefault()
    let logindetails = {
        email: event.target.email.value,
        password: event.target.password.value
    }

    axios.post('http://localhost:3000/user/login',logindetails)
    .then((response)=>{
        alert(response.data.message)
        window.location.href = "expense.html";
    }).catch((err)=>{

        document.body.innerHTML = document.body.innerHTML + "<h4> user doesn't match </h4>"
       console.log(err)
    })

}