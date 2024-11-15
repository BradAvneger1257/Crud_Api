// Función para obtener los datos del Pokémon por nombre o ID
async function getPokemon() {
    const pokemonNameOrId = document.getElementById("pokemonInput").value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`;
    const pokemonInfoDiv = document.getElementById("pokemonInfo");

    try {
        const response = await fetch(url);
        const data = await response.json();

        const pokemonName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        const pokemonTypes = data.types.map(type => type.type.name).join(", ");
        const pokemonImage = data.sprites.front_default;
        const pokemonStats = data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join("<br>");

        pokemonInfoDiv.innerHTML = `
            <h2>${pokemonName}</h2>
            <img src="${pokemonImage}" alt="${pokemonName}">
            <p><strong>Tipo(s):</strong> ${pokemonTypes}</p>
            <p><strong>Estadísticas:</strong><br> ${pokemonStats}</p>
        `;
    } catch (error) {
        pokemonInfoDiv.innerHTML = `<p>No se encontró el Pokémon. Verifica el nombre o ID.</p>`;
    }
}

// Función para listar los Pokémon de una generación específica
async function listGenerationPokemons() {
    const generation = document.getElementById("generation").value;
    const generationPokemonsDiv = document.getElementById("generationPokemons");

    const url = `https://pokeapi.co/api/v2/generation/${generation}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        const pokemonList = data.pokemon_species;

        generationPokemonsDiv.innerHTML = ""; // Limpiar lista anterior

        pokemonList.forEach(pokemon => {
            const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            const pokemonUrl = pokemon.url;

            fetch(pokemonUrl).then(res => res.json()).then(pokemonData => {
                const pokemonImage = pokemonData.sprites.front_default;

                generationPokemonsDiv.innerHTML += `
                    <div class="pokemon">
                        <img src="${pokemonImage}" alt="${pokemonName}">
                        <p>${pokemonName}</p>
                    </div>
                `;
            });
        });
    } catch (error) {
        generationPokemonsDiv.innerHTML = `<p>No se pudieron obtener los Pokémon de la generación seleccionada.</p>`;
    }
}
