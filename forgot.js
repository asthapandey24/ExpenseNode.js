function forgotpassword(event){
    event.preventDefault()
    const form = new FormData(event.target);

    let Resetpassword = {
        email: form.get("email"),
    }
    console.log(Resetpassword)
      axios.post('http://localhost:3000/password/forgotpassword',Resetpassword)
    .then((response)=>{
        alert(response)
      //  console.log(userid.data.FormData);
    //  localStorage.setItem("forgetuserid",userid.data.Resetpassword);

    }).catch((err)=>{

        document.body.innerHTML = document.body.innerHTML + "<h4> user doesn't match </h4>"
       console.log(err)
    })

}