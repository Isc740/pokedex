async function fetchPokemonData(pokemon) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const data = await response.json();
    return data;
}

document.addEventListener("DOMContentLoaded", async () => {
    let pokemon = prompt("Inserte nombre de pokemon").toLowerCase();
    const pokemonData = await fetchPokemonData(pokemon);

    document.querySelector(".container").innerHTML = addPokemonComponent(pokemonData);
})

const addPokemonComponent = (pokemonData) => `
  <div class="card my-5" style="width: 25rem;">
     <img class="card-img-top img-fluid" src="${pokemonData.sprites.other["official-artwork"].front_default}" alt="Card image cap">
     <div class="card-body">
         <h5 class="card-title">${pokemonData.species.name}</h5>
         <p class="card-text">Pokemon numero: <strong>${pokemonData.id}</strong></p>
         <a href="#" class="btn btn-primary">Go somewhere</a>
     </div>
     <div class="accordion" id="accordionExample">
       <div class="accordion-item">
           <h2 class="accordion-header" id="headingOne">
           <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
               Stats 
           </button>
           </h2>
           <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
           <div class="accordion-body">
               <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
           </div>
           </div>
       </div>
       <div class="accordion-item">
           <h2 class="accordion-header" id="headingTwo">
           <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
               Accordion Item #2
           </button>
           </h2>
           <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
           <div class="accordion-body">
               <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
           </div>
           </div>
       </div>
       <div class="accordion-item">
           <h2 class="accordion-header" id="headingThree">
           <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
               Accordion Item #3
           </button>
           </h2>
           <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
           <div class="accordion-body">
               <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
           </div>
           </div>
       </div>
       </div>
    </div>`;