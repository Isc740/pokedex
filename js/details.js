("use strict");

import PokedexHelper from "./pokedexUtils.js";

document.addEventListener("DOMContentLoaded", async () => {
	const urlParams = new URLSearchParams(window.location.search);
	const pokemonId = urlParams.get("id");
	let pokemonInfo = await PokedexHelper.fetchPokemonInfo(pokemonId);
	document.querySelector(".container").innerHTML =
		PokedexHelper.getPokemonCard(pokemonInfo);
});
