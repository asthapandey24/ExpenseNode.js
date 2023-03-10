function login(event){
    event.preventDefault()
    const email = event.target.email.value;
    const password = event.target.password.value;
    const logindetails = {
        email,
        password
    }

    axios.post('http://localhost:3000/user/login',logindetails).then((response)=>{
        console.log(response)
    }).catch((err)=>{

        document.body.innerHTML = document.body.innerHTML + "<h4> user doesn't match </h4>"
        console.log(err)
    })






}