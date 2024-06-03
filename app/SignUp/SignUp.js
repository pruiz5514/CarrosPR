const form = document.querySelector("form");
const nameUser = document.querySelector("#name");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");

const url = "http://localhost:3000/users";

function validatePassword(password, confirmPassword) {    
    if(password.value == confirmPassword.value){
        return true;
    }else{
        alert("Las contraseñas no son iguales")
        return false;
    }
}

async function validateEmail(email){
    const response = await fetch(`${url}?email=${email.value}`);
    const data = await response.json();

    if(data.length == 0){
        return true;
    }else{
        alert("El correo ya se encuentra registrado");
        return false;
    }
}

async function createUser(nameUser, lastName, email, password){
    const newUser = {
        nameUser: nameUser.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
    };

    await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
};

form.addEventListener("submit",async (event)=>{
    event.preventDefault();
    const checkEmail = await validateEmail(email);
    const checkPassword = validatePassword(password, confirmPassword);

    if(checkEmail && checkPassword){
        await createUser(nameUser, lastName, email, password);
        form.reset();
        alert("Se crea usuario exitosamente")
        window.location.href = "/app/Login/Login.html";
    }
})