"use strict";

const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
};

const PokedexHelper = {
    addTypes(types) {
        let colors = types.map((type) => typeColors[type]);

        let result = ``;
        types.forEach((type, index) => {
            result += `<div class="pk-type text-center rounded-2" style="background-color: ${
                colors[index]
            }; color:#ffffff; padding: 10x; max-width: 90px;">${this.uppFirstLetter(
                type.toString()
            )}</div>`;
        });

        return result;
    },

    uppFirstLetter(name) {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    },

    async fetchPokemonData(pokemon) {
        try {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${pokemon}`
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

    async fetchAdditionalPokemonData(pokemon) {
        try {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`
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
            const key = Array.isArray(attribute)
                ? i
                : Object.keys(attribute)[i];

            if (key === target) {
                results.push(attribute[key]);
            } else if (this.isIterable(attribute[key])) {
                results = results.concat(
                    this.getPokemonAttributes(attribute[key], target)
                );
            }
        }
        return results;
    },

    listenCardClick(target) {
        let pokemonCards = document.querySelectorAll(target);
        pokemonCards.forEach((card) => {
            card.addEventListener("click", () => {
                let pokemonId = card.getAttribute("data-id");
                window.location.href = `/views/details.html?id=${pokemonId}`;
            });
        });
    },

    loadPokemonOnScroll(containerSelector, startIndex, endIndex, batchSize) {
        let isLoading = false;

        window.addEventListener("scroll", async () => {
            const scrollPosition = window.scrollY + window.innerHeight;
            const totalHeight = document.documentElement.scrollHeight;

            if (scrollPosition >= totalHeight && !isLoading) {
                isLoading = true;
                setTimeout(async () => {
                    let pokemonDataArray = await this.fetchMultiplePokemon(
                        startIndex,
                        endIndex
                    );

                    document.querySelector(containerSelector).innerHTML +=
                        pokemonDataArray
                            .map((pokemonData) =>
                                this.getPokemonCard(pokemonData)
                            )
                            .join("");

                    startIndex = endIndex + 1;
                    endIndex = startIndex + batchSize - 1;
                }, 500);
            }
            isLoading = false;
            this.listenCardClick(".pokemon-card");
        });
    },

    getPokemonCard(pokemonData) {
        return `
			<div class="card pokemon-card shadow-sm flex-grow-0" style="width: 230px; height:367px;"data-id="${
                pokemonData.id
            }">
				<div style="height: 204px; width: 204px;">
					<img class="card-img-top img-fluid m-3 bg-light" style="width: 200px;" src="${
                        pokemonData.sprites.other["official-artwork"]
                            .front_default
                    }" alt="Card image cap">
				</div>
				<div class="card-body">
					<h5 class="card-title">${this.uppFirstLetter(pokemonData.species.name)}</h5>
					<p class="card-text">N.ᵒ ${pokemonData.id.toString().padStart(4, "0")}</p>
					<div class="container row type-container gap-1 d-flex flex-row">
                        ${this.addTypes(
                            this.getPokemonAttributes(pokemonData.types, "name")
                        )}
					</div>
				</div>
			</div>`;
    },
};

export default PokedexHelper;
