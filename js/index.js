import PokedexHelper from "./pokedexUtils.js";
("use strict");

document.addEventListener("DOMContentLoaded", async () => {
	let question = Number(
		prompt("Quieres (1) buscar, o (2) mostrar un rango de pokemones?"),
	);

	if (question === 2) {
		let start = prompt("Ingrese el numero de donde empezar");
		let end = prompt("Ingrese el numero del final");
		let pokemonDataArray = await PokedexHelper.fetchMultiplePokemon(start, end);
		document.querySelector(".container").innerHTML = pokemonDataArray
			.map((pokemonData) => PokedexHelper.addPokemonCard(pokemonData))
			.join("");
	} else {
		const pokemonName = prompt("Inserte el nombre del pokemon").toLowerCase();
		const pokemonData = await PokedexHelper.fetchPokemonInfo(pokemonName);
		document.querySelector(".container").innerHTML =
			PokedexHelper.addPokemonCard(pokemonData);
	}
});
