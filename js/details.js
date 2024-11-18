("use strict");

import PokedexHelper from "./pokedexHelper.js";

document.addEventListener("DOMContentLoaded", async () => {
	const urlParams = new URLSearchParams(window.location.search);
	const pokemonId = urlParams.get("id").toLowerCase();
	let pokemonData = await PokedexHelper.fetchPokemonData(pokemonId);

	if (!pokemonData) {
		document.querySelector(".pk-details").innerHTML =
			`<h1 class="text-center">Pokemon not found!</h1>`;
		return;
	}
});
