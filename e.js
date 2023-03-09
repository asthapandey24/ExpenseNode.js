function saveinLocalStorage(event){
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const myObj = {
        name,
        email,
        password
    }



    axios.post(`http://localhost:3000/expensetable/signUp`,myObj )
     .then((response)=>{
      //  displayUser(myObj)
        console.log(response) 
     })
     .catch((err)=>{
        document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>"
        console.log(err)
     })
     
    }