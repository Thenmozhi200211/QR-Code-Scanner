//get data
const nameInput=document.querySelector("#name");
const email=document.querySelector("#email");
const message=document.querySelector("#message");
const success=document.querySelector("#success");
const errornodes=document.querySelectorAll(".error");

//validate data
function validateform(){

     clearMessages();
     let errorflag = false;

    if(nameInput.ariaValueMax.length < 1){
        errornodes[0].innerText = "Name cannot be blank";
        nameInput.classList.add("error-border");
        errorflag =true;
    }

    if(!emailIsvalid(email.value)){
        errornodes[1].innerText = "Invalid email address";
        email.classList.add("error-border");
        errorflag = true;

    }
    if(message.value.length < 1){
        errornodes[2].innerText = "please enter message";
        message.classList.add("error-border");
        errorflag = true;
    }

    if(errorflag){
        success.innerText = "success!";
    }
}

//clear error/success messages
function clearMessages(){
    for(let i=0; i < errornodes.length; i++){
        errornodes[i].innerText ="";
    }
    nameInput.classList.remove("error-border");
    email.classList.remove("error-border");
    message.classList.remove("error-border");
}

function emailIsvalid(email){
    let pattern= /\S+@\S+\.\S+/;
    return pattern.test(email);
}