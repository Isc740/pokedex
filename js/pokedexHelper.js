"use strict";

const PokedexHelper = {
	uppFirstLetter(name) {
		return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
	},

	async fetchPokemonData(pokemon) {
		try {
			const response = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${pokemon}`,
			);
			if (!response.ok) {
				throw new Error("Pokemon not found");
			}
			const data = await response.json();
			return data;
		} catch (error) {
			return null;
		}
	},

	async fetchMultiplePokemon(start, end) {
		const promises = [];
		for (let i = start; i <= end; i++) {
			promises.push(this.fetchPokemonData(i));
		}
		return await Promise.all(promises);
	},

	getLength(target) {
		if (Array.isArray(target)) return target.length;
		if (typeof target === "object") return Object.keys(target).length;
		return 0;
	},

	isIterable(target) {
		return target !== null && typeof target === "object";
	},

	getPokemonAttributes(attribute, target) {
		const length = this.getLength(attribute);
		let results = [];

		for (let i = 0; i < length; i++) {
			const key = Array.isArray(attribute) ? i : Object.keys(attribute)[i];

			if (key === target) {
				results.push(attribute[key]);
			} else if (this.isIterable(attribute[key])) {
				results = results.concat(
					this.getPokemonAttributes(attribute[key], target),
				);
			}
		}
		return results;
	},

	getPokemonCard(pokemonData) {
		return `
			<div class="card pokemon-card shadow-sm" style="width: auto;"data-id="${pokemonData.id}">
				<img class="card-img-top img-fluid m-3 bg-light" style="width: 250px;" src="${pokemonData.sprites.other["official-artwork"].front_default}" alt="Card image cap">
				<div class="card-body">
					<h5 class="card-title">${this.uppFirstLetter(pokemonData.species.name)}</h5>
					<p class="card-text">N.ᵒ ${pokemonData.id.toString().padStart(4, "0")}</p>
					<div class="type-container d-flex">
						<p>${this.getPokemonAttributes(pokemonData.types, "name")
							.map((type) => this.uppFirstLetter(type))
							.join(" ")}</p>
					</div>
				</div>
			</div>`;
	},
};

export default PokedexHelper;
