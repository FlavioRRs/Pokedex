const pokemonName = document.querySelector(".pokemon__name");
const pokemonId = document.querySelector(".pokemon__id");
const pokemonImage = document.querySelector(".pokemon__image");
const form = document.querySelector("form")
const input = document.querySelector(".input__search")
const buttonNext = document.querySelector(".btn-next")
const buttonPrev = document.querySelector(".btn-prev")

let pokeId = 1

const fetchPokemon = async (pokemon) => {

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if (response.status === 200){
        const data = await response.json()
        return data
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = "Loading...";
    pokemonId.innerHTML = "";

    const data = await fetchPokemon(pokemon)

    if (data) {

        pokemonName.innerHTML = data.name;
        pokemonId.innerHTML = data.id;
        pokeId = data.id;
        pokemonImage.style.display = "block";
        if (data.id >= 650) {
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['front_default'];
        } else {
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        }
        
    
        input.value = ""
    } else {
        pokemonName.innerHTML = "Not found...";
        pokemonId.innerHTML = "X";
        pokemonImage.style.display = "none";
    }
}

form.addEventListener('submit', event => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase())
})

buttonNext.addEventListener("click", () => renderPokemon(++pokeId))
buttonPrev.addEventListener("click", () => {
    if (pokeId > 1) {
        renderPokemon(--pokeId)
    }
})

renderPokemon(pokeId)