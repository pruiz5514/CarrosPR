const user = localStorage.getItem("user");
const logOut = document.querySelector("#log-out");

if(user == null){
    window.location.href = "/"
};

logOut.addEventListener("click", ()=>{
    localStorage.clear()
    window.location.href = "/"
})


const main = document.querySelector("main");
const url = "http://localhost:3000/cars";

async function showCards(){
    const response = await fetch(url);
    const data = await response.json();

    data.forEach(element => {
        if(element.isActive){
            main.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src=${element.image} class="card-img-top" alt="${element.id}">
                <div class="card-body">
                    <h5 class="card-title">${element.brand} ${element.model}</h5>
                    <p class="card-text">${element.year}</p>
                    <p class="card-text">$ ${element.price}</p>
                    <a href="/app/CarDetail/CarDetail.html" class="btn btn-primary view-more" id=${element.id}>Ver mas</a>
                </div>
            </div>
            `
        }
        
    })

    document.addEventListener("click",(event)=>{
        if(event.target.classList.contains("view-more")){
            const idCar = event.target.id;
            localStorage.setItem("idCar",idCar);
        }
    })
    return main;
}

await showCards()