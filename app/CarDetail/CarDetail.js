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
const idCar = localStorage.getItem("idCar");

const url = "http://localhost:3000/cars"

async function carCard(id){
    const response = await fetch(`${url}/${id}`);
    const data = await response.json();

    main.innerHTML = `
        <img class="w-25" src = ${data.image} alt = ${data.id}>
        <section class="feature-container">
            <h5>Marca</h5>
            <article class="edit-container">
                <p>${data.brand}</p>
            </article>
            <form id="brand-form">
                <input type="text" id="brand-${data.id}">
                <button type="submit" class="send-button" data-id=${data.id} data-property="brand"> Editar</button>
            </form>
        </section>

        <section class="feature-container">
            <h5>Modelo</h5>
            <article class="edit-container">
                <p>${data.model}</p>
            </article>
            <form id="model-form">
                <input type="text" id="model-${data.id}">
                <button type="submit"class="send-button" data-id=${data.id} data-property="model"> Editar</button>
            </form>
        </section>

        <section class="feature-container">
            <h5>Año</h5>
            <article class="edit-container">
                <p>${data.year}</p>
            </article>
            <form id="year-form">
                <input type="text" id="year-${data.id}">
                <button type="submit"class="send-button" data-id=${data.id} data-property="year"> Editar</button>
            </form>
        </section> 

        <section class="feature-container">
            <h5>Precio</h5>
            <article class="edit-container">
                <p>${data.price}</p>
            </article>
            <form id="price-form">
                <input type="text" id="price-${data.id}">
                <button type="submit"class="send-button" data-id=${data.id} data-property="price"> Editar</button>
            </form>
        </section> 

        <section class="feature-container">
            <h5>Imagen</h5>
            <form id="image-form">
                <input type="link" id="image-${data.id}">
                <button type="submit"class="send-button" data-id=${data.id} data-property="image"> Editar</button>
            </form>
        </section> 
    `
    
}

await carCard(idCar)

const brandForm = document.querySelector("#brand-form");
const modelForm = document.querySelector("#model-form");

async function updateProperty(id,property,input){
    const propertyToUpdate = {};
    propertyToUpdate[property] = input.value;
    await fetch(`${url}/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(propertyToUpdate)
    })
}

main.addEventListener("click",async (event)=>{
    event.preventDefault()
    if(event.target.classList.contains("send-button")){
        const id = event.target.getAttribute("data-id");
        const property = event.target.getAttribute("data-property");
        const input = document.querySelector(`#${property}-${id}`);

        await updateProperty(id,property,input);
        await carCard(idCar)
    }
})