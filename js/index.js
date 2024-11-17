("use strict");

import PokedexHelper from "./pokedexHelper.js";

function listenCardClick() {
	let pokemonCards = document.querySelectorAll(".pokemon-card");
	pokemonCards.forEach((card) => {
		card.addEventListener("click", () => {
			let pokemonId = card.getAttribute("data-id");
			console.log(pokemonId);
			window.location.href = `/views/details.html?id=${pokemonId}`;
		});
	});
}

document.addEventListener("DOMContentLoaded", async () => {
	let pokemonDataArray = await PokedexHelper.fetchMultiplePokemon(1, 36);
	document.querySelector(".container").innerHTML = pokemonDataArray
		.map((pokemonData) => PokedexHelper.getPokemonCard(pokemonData))
		.join("");

	listenCardClick();
});
