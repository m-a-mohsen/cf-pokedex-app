// source https://pokedex.org/

let pokemonList = [];

pokemonList = [
    {
        name:"Bulbasaur",
        height: 7,
        types: ['grass', 'poison']
    },
    {
        name:"Ivysaur",
        height: 10,
        types: ['water', 'sand']
    },    {
        name:"Venusaur",
        height: 20,
        types: ['glass', 'stone']
    }
];
// loop to print pokemone names and height

for (let i = 0; i < pokemonList.length; i++) {
    // if condition to highlight big pokemons
    if (pokemonList[i].height > 10) {
        document.write(`<p>${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow That's BIG!</p>`);
    }else{
        document.write(`<p>${pokemonList[i].name} (height: ${pokemonList[i].height})</p>`);
    }
}