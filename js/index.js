("use strict");

import PokedexHelper from "./pokedexHelper.js";

function listenCardClick() {
	let pokemonCards = document.querySelectorAll(".pokemon-card");
	pokemonCards.forEach((card) => {
		card.addEventListener("click", () => {
			let pokemonId = card.getAttribute("data-id");
			window.location.href = `/views/details.html?id=${pokemonId}`;
		});
	});
}

document.addEventListener("DOMContentLoaded", async () => {
	let pokemonDataArray = await PokedexHelper.fetchMultiplePokemon(1, 35);
	document.querySelector(".pk-list").innerHTML = pokemonDataArray
		.map((pokemonData) => PokedexHelper.getPokemonCard(pokemonData))
		.join("");

	document.querySelector(".pk-search").addEventListener("submit", (e) => {
		e.preventDefault();
		const query = document.querySelector(".pk-search input").value;
		window.location.href = `/views/details.html?id=${query}`;
	});
	listenCardClick();
});
