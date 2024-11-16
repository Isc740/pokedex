"use strict";

async function fetchPokemonInfo(pokemon) {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
	const data = await response.json();
	return data;
}

async function fetchMultiplePokemon(start, end) {
	let promises = [];
	for (let i = start; i <= end; i++) {
		promises.push(fetchPokemonInfo(i));
	}

	return await Promise.all(promises);
}

const getLength = (target) => {
	if (Array.isArray(target)) return target.length;
	if (typeof target === "object") return Object.keys(target).length;
};

const isIterable = (target) =>
	typeof target === "object" || Array.isArray(target) ? true : false;

function getPokemonAttributes(attribute, target) {
	let length = getLength(attribute);
	let results = [];

	for (let i = 0; i < length; i++) {
		let key = Array.isArray(attribute) ? i : Object.keys(attribute)[i];

		if (key === target) results.push(attribute[key]);
		else if (isIterable(attribute[key]))
			results = results.concat(getPokemonAttributes(attribute[key], target));
	}
	return results;
}

const addPokemonCard = (pokemonData) => `
		<div class="card pokemon-card shadow-sm" style="width: auto;">
			<img class="card-img-top img-fluid m-3 bg-light" style="width: 250px;" src="${pokemonData.sprites.other["official-artwork"].front_default}" alt="Card image cap">
			<div class="card-body">
				<h5 class="card-title">${pokemonData.species.name}</h5>
				<p class="card-text">N.ᵒ <strong>${pokemonData.id.toString().padStart(4, "0")}</strong></p>
				<p>${getPokemonAttributes(pokemonData.types, "name")}</p>
			</div>
		</div>`;
