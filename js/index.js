async function fetchPokemonData(pokemon) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const data = await response.json();
    return data;
}

document.addEventListener("DOMContentLoaded", async () => {
    let question = Number(prompt("Quieres (1) buscar, o (2) mostrar un rango de pokemones?"));
    if (question === 1) {
        const pokemonName = prompt("Inserte el nombre del pokemon")
        const pokemonData = await fetchPokemonData(pokemonName);
        document.querySelector(".container").innerHTML = addPokemonComponent(pokemonData);
    } else {
        let start = prompt("Ingrese el numero de donde empezar");
        let end = prompt("Ingrese el numero del final");

        for (let i = start; i <= end; i++) {
            const pokemonData = await fetchPokemonData(i);
            document.querySelector(".container").innerHTML += addPokemonComponent(pokemonData);
        }
    }
})

const addPokemonComponent = (pokemonData) => `
  <div class="card" style="width: 25rem;">
     <img class="card-img-top img-fluid" src="${pokemonData.sprites.front_default}" alt="Card image cap">
     <div class="card-body">
         <h5 class="card-title">${pokemonData.species.name}</h5>
         <p class="card-text">Pokemon numero: <strong>${pokemonData.id}</strong></p>
         <a href="#" class="btn btn-primary">Ver pokemon</a>
     </div>
    </div>`;