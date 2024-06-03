const main = document.querySelector("main");
const url = "http://localhost:3000/cars";

async function showCards(){
    const response = await fetch(url);
    const data = await response.json();

    data.forEach(element => {
        main.innerHTML += `
        <div class="card" style="width: 18rem;">
            <img src=${element.image} class="card-img-top" alt="${element.id}">
            <div class="card-body">
                <h5 class="card-title">${element.brand} ${element.model}</h5>
                <p class="card-text">${element.year}</p>
                <p class="card-text">$ ${element.price}</p>
                <a href="/app/Login/Login.html" class="btn btn-primary">Ver mas</a>
            </div>
        </div>
        `
    })

    return main;
}

await showCards()