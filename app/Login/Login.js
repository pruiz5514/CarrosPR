const form = document.querySelector("form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const url = "http://localhost:3000/users"

async function validateEmail(email) {
    const response = await fetch(`${url}?email=${email.value}`);
    const data = await response.json();

    if(data.length>0){
        return data[0];
    }
        

};

form.addEventListener("submit", async(event) => {
    event.preventDefault()
    const user = await validateEmail(email)

    if(user == null){
        alert("Correo no se encuentra registrado");
    } else{
        if(user.password == password.value){
            localStorage.setItem("user",JSON.stringify(user));
            window.location.href = "/app/Dashboard/Dashboard.html"
        }else{
            alert("Contraseña invalida")
        }
    }
})