async function fetchPokemonData(pokemon) {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
	const data = await response.json();
	return data;
}

async function displayMultiplePokemons(start, end) {
	let promises = [];
	for (let i = start; i <= end; i++) {
		promises.push(fetchPokemonData(i));
	}
	let pokemonDataArray = await Promise.all(promises);
	document.querySelector(".container").innerHTML = pokemonDataArray
		.map((pokemonData) => addPokemonComponent(pokemonData))
		.join("");
}

document.addEventListener("DOMContentLoaded", async () => {
	let question = Number(
		prompt("Quieres (1) buscar, o (2) mostrar un rango de pokemones?"),
	);

	if (question === 2) {
		let start = prompt("Ingrese el numero de donde empezar");
		let end = prompt("Ingrese el numero del final");
		displayMultiplePokemons(start, end);
	} else {
		const pokemonName = prompt("Inserte el nombre del pokemon").toLowerCase();
		const pokemonData = await fetchPokemonData(pokemonName);
		document.querySelector(".container").innerHTML =
			addPokemonComponent(pokemonData);
	}
});

const addPokemonComponent = (pokemonData) => `
  <div class="card" style="width: 24rem;">
     <img class="card-img-top img-fluid" src="${pokemonData.sprites.other["official-artwork"].front_default}" alt="Card image cap">
     <div class="card-body">
         <h5 class="card-title">${pokemonData.species.name}</h5>
         <p class="card-text">Pokemon numero: <strong>${pokemonData.id}</strong></p>
         <a href="#" class="btn btn-primary">Ver pokemon</a>
     </div>
    </div>`;
