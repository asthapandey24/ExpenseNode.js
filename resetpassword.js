const submitbtn=document.getElementById('submitid');

submitbtn.addEventListener('click',passwordChecking);

async function passwordChecking(event)
{
    event.preventDefault();
    const newpass=document.getElementById('new_password').value;
    const confirmpassword=document.getElementById('confirmpassword').value;
    passobj={
        newpass
    }


     if(newpass===confirmpassword)
     {
        const userid=localStorage.getItem("forgetuserid");
         console.log("dd"+userid);

        axios.put(`http://localhost:3000/password/updatepassword/${userid}`,passobj);

     }else{
         console.log("Password are not matched");
     }
 }

