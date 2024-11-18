("use strict");

import PokedexHelper from "./pokedexHelper.js";


document.addEventListener("DOMContentLoaded", async () => {
    let pokemonDataArray = await PokedexHelper.fetchMultiplePokemon(1, 15);

    document.querySelector(".pk-list").innerHTML = pokemonDataArray
        .map((pokemonData) => PokedexHelper.getPokemonCard(pokemonData))
        .join("");

    document.querySelector(".pk-search").addEventListener("submit", (e) => {
        e.preventDefault();
        const query = document.querySelector(".pk-search input").value;
        window.location.href = `/views/details.html?id=${query}`;
    });

    PokedexHelper.listenCardClick(".pokemon-card");
    PokedexHelper.loadPokemonOnScroll(".pk-list", 16, 40, 25);
});
