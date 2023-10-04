const container = document.getElementById('container')
console.log(container)


async function requisicaoApiPokemon(){

    const retornoPromessas = []

    for(let index = 1; index <= 150; index ++){
    const fetchApiPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
    const retornoApiPokemon = await fetchApiPokemon.json()
    retornoPromessas.push(retornoApiPokemon)
}

const arrayPokemon = await(retornoPromessas)
console.log(arrayPokemon)
return arrayPokemon
}

async function filtraPokemon(nomePokemon){
    const arrayPokemonsCompleto
}

async function renderizaPokemons() {
    const arrayPokemons = await requisicaoApiPokemon();
    const cardPokemon = arrayPokemons.map((pokemon) => {
        return `
            <div class="card-container ${pokemon.types[0].type.name} modohover">
                <div class="card-imagem">

                <img class="back" src="${pokemon.sprites.back_default}" alt=""></img>
                <img class="back" src="${pokemon.sprites.back_shiny}" alt=""></img >

                        <img class="front" src="${pokemon.sprites.front_default}"></img>
                        <img class="front" src="${pokemon.sprites.front_shiny}" alt="" ></img>
                    
              </div>
                
                <div class="card-texto">
                    <h2>${pokemon.name}</h2>
                    
                    <div>                    
                        <h3>Tipos: ${pokemon.types.map(type => type.type.name).join(', ' )}</h3>
                    </div>

                    <div>                    
                        <h3>Habilidades: ${pokemon.moves[0].move.name} </h3>
                    </div>            
                </div>          
            </div>
            
        `;
    });
    container.innerHTML = cardPokemon.join(""); // Use .join("") para converter o array em uma única string
}

const inputFiltro = document.getElementById('filtro')

inputFiltro.addEventListener('keyup', () => {
    const nomePokemon = inputFiltro.value.trim();
    renderizaPokemons(nomePokemon);
});

renderizaPokemons();
inputFiltro.addEventListener('keyup', renderizaPokemons)

const cardContainers = document.querySelectorAll('.card-container')
cardContainers.forEach(cardContainer => {
    cardContainer.addEventListener('mouseenter', () => {
        const imgFront = cardContainer.querySelector('.card-imagem img.front');
        const imgBack = cardContainer.querySelector('.card-imagem img.back');
        imgFront.style.display = 'none';
        imgBack.style.display = 'block';
    })

    cardContainer.addEventListener('mouseleave', () => {
        const imgFront = cardContainer.querySelector('.card-imagem img.front');
        const imgBack = cardContainer.querySelector('.card-imagem img.back');
        imgFront.style.display = 'block';
        imgBack.style.display = 'none';

    })
})


