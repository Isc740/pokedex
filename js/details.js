("use strict");

import PokedexHelper from "./pokedexHelper.js";

function getPokemonPage(pokemonData) {}

document.addEventListener("DOMContentLoaded", async () => {
	const urlParams = new URLSearchParams(window.location.search);
	const pokemonId = urlParams.get("id");
	let pokemonData = await PokedexHelper.fetchPokemonData(pokemonId);
	document.querySelector(".pk-details").innerHTML =
		PokedexHelper.getPokemonCard(pokemonData);
});
