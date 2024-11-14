async function fetchPokemonData(pokemon) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const data = await response.json();
    return data;
}

document.addEventListener("DOMContentLoaded", async () => {
    let times = prompt("Ingrese el numero de pokemones que quiere ver")
    for (let i = 1; i <= times; i++) {
        const pokemonData = await fetchPokemonData(i);
        document.querySelector(".container").innerHTML += addPokemonComponent(pokemonData);
    }

})

const addPokemonComponent = (pokemonData) => `
  <div class="card my-5" style="width: 25rem;">
     <img class="card-img-top img-fluid" src="${pokemonData.sprites.front_default}" alt="Card image cap">
     <div class="card-body">
         <h5 class="card-title">${pokemonData.species.name}</h5>
         <p class="card-text">Pokemon numero: <strong>${pokemonData.id}</strong></p>
         <a href="#" class="btn btn-primary">Ver pokemon</a>
     </div>
    </div>`;