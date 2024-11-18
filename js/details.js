import PokedexHelper from "./pokedexHelper.js";

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get("id").toLowerCase();
    const pokemonData = await PokedexHelper.fetchPokemonData(pokemonId);

    if (!pokemonData) {
        document.querySelector(".main").innerHTML =
            `<h1 class="text-center">Pokemon not found!</h1>`;
        return;
    }

    const additionalPokemonData =
        await PokedexHelper.fetchAdditionalPokemonData(pokemonId);

    document.querySelector(".main").innerHTML = template(
        pokemonData,
        additionalPokemonData,
    );

    addStatChart(pokemonData.stats);
});

function addStatChart(stats) {
    const names = stats.map((stat) => stat.stat.name);
    const values = stats.map((stat) => stat.base_stat);

    const statColors = [
        "#F39C12",
        "#E74C3C",
        "#1F618D",
        "#9B59B6",
        "#16A085",
        "#F39C12",
    ];

    const ctx = document.getElementById("statsChart").getContext("2d");
    const statsChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: names,
            datasets: [
                {
                    label: "Base Stats",
                    data: values,
                    backgroundColor: "#2B59C3",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            indexAxis: "y",
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true,
                    max: 255,
                },
                y: {
                    beginAtZero: true,
                    max: 255,
                },
            },
        },
    });
}

const template = (pokemonData, additionalPokemonData) => `
    <section class="basic-pk-info container">
        <h1 class="pk-name text-center fw-bolder">
            ${PokedexHelper.uppFirstLetter(pokemonData.species.name)}
        </h1>
        <h2 class="pk-number text-center fw-bold mb-5">
            N.ᵒ ${pokemonData.id.toString().padStart(4, "0")}
        </h2>
        <div class="row gap-5">
            <div class="col">
                <p class="pk-description fs-5">
                    ${additionalPokemonData.flavor_text_entries[3].flavor_text}
                </p>
                <div class="row bg-info-subtle p-3 rounded-3">
                    <div class="col">
                        <p class="fs-5 fw-bold">Height:</p>
                        <p class="pk-height">${(pokemonData.height / 10).toFixed(1)}m</p>
                        <p class="fs-5 fw-bold">Weight:</p>
                        <p class="pk-weight">${(pokemonData.weight / 10).toFixed(1)}kg</p>
                    </div>
                    <div class="col">
                        <p class="fs-5 fw-bold">Abilities:</p>
                        <p class="pk-abilities">
                            ${PokedexHelper.getPokemonAttributes(
                                pokemonData.abilities,
                                "name",
                            )
                                .map((type) =>
                                    PokedexHelper.uppFirstLetter(type),
                                )
                                .join(" ")}
                        </p>
                        <p class="fs-5 fw-bold">Types:</p>
                        <div class="pk-type">
                            ${PokedexHelper.getPokemonAttributes(
                                pokemonData.types,
                                "name",
                            )
                                .map((type) =>
                                    PokedexHelper.uppFirstLetter(type),
                                )
                                .join(" ")}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col d-flex align-items-center flex-column bg-light">
                <div style="width: 350px; height: 350px">
                    <img
                        class="pk-image img-fluid"
                        alt="Image of ${PokedexHelper.uppFirstLetter(pokemonData.species.name)}"
                        src="${pokemonData.sprites.other["official-artwork"].front_default}"
                    />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <canvas id="statsChart" width="400" height="200"></canvas>
            </div>
        </div>
    </section> `;
