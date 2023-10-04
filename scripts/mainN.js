const container = document.getElementById('container');

async function requisicaoApiPokemon() {
    const retornoPromessas = [];

    for (let index = 1; index <= 150; index++) {
        const fetchApiPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
        const retornoApiPokemon = await fetchApiPokemon.json();
        retornoPromessas.push(retornoApiPokemon);
    }

    const arrayPokemon = await Promise.all(retornoPromessas);
    return arrayPokemon;
}

async function filtraPokemon(nomePokemon) {
    const arrayPokemonsCompleto = await requisicaoApiPokemon();

    if (!nomePokemon) {
        return arrayPokemonsCompleto;
    }

    const arrayPokemonsFiltrados = arrayPokemonsCompleto.filter(
        (pokemon) => pokemon.name.toLowerCase().includes(nomePokemon.toLowerCase())
    );

    return arrayPokemonsFiltrados;
}

async function renderizaPokemons(arrayPokemons) {
    const cardPokemon = arrayPokemons.map((pokemon) => {
        return `
            <div class="card-container ${pokemon.types[0].type.name} modohover">
                <div class="card-imagem">
                    <img class="back" src="${pokemon.sprites.back_default}" alt=""></img>
                    <img class="back" src="${pokemon.sprites.back_shiny}" alt=""></img>
                    <img class="front" src="${pokemon.sprites.front_default}"></img>
                    <img class="front" src="${pokemon.sprites.front_shiny}" alt=""></img>
                </div>
                <div class="card-texto">
                    <h2>${pokemon.name}</h2>
                    <div>
                        <h3>Tipos: ${pokemon.types.map(type => type.type.name).join(', ')}</h3>
                    </div>
                    <div>
                        <h3>Habilidades: ${pokemon.moves[0].move.name} </h3>
                    </div>
                </div>
            </div>
        `;
    });
    container.innerHTML = cardPokemon.join("");
}

// Adicione um ouvinte de evento ao botão de pesquisa
const botaoPesquisa = document.getElementById('botao');
botaoPesquisa.addEventListener('click', async () => {
    const campoFiltro = document.getElementById('filtro');
    const nomePokemon = campoFiltro.value.trim(); // Obtenha o valor do campo de pesquisa e remova espaços em branco desnecessários

    // Chame a função de filtro e, em seguida, a função de renderização com o resultado filtrado
    const pokemonsFiltrados = await filtraPokemon(nomePokemon);
    renderizaPokemons(pokemonsFiltrados);
});

// Renderize todos os Pokémon na inicialização
requisicaoApiPokemon().then((arrayPokemons) => {
    renderizaPokemons(arrayPokemons);
});
