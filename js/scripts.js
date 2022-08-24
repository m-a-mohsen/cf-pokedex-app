// source https://pokedex.org/

// IIFE variable
let pokemonRepository = (
    function () {
       let pokemonList = [
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

        function getall() {
            return pokemonList;
        }
        function add(item){
            pokemonList.push(item)
        }
        return{
            getall: getall,
            add: add
        }
    }
)();

//old variable
// let pokemonList = [];

// pokemonList = [
//     {
//         name:"Bulbasaur",
//         height: 7,
//         types: ['grass', 'poison']
//     },
//     {
//         name:"Ivysaur",
//         height: 10,
//         types: ['water', 'sand']
//     },    {
//         name:"Venusaur",
//         height: 20,
//         types: ['glass', 'stone']
//     }
// ];
// console.log(pokemonList);
// loop to print pokemone names and height

// for (let i = 0; i < pokemonList.length; i++) {
//     // if condition to highlight big pokemons
//     if (pokemonList[i].height > 10) {
//         document.write(`<p>${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow That's BIG!</p>`);
//     }else{
//         document.write(`<p>${pokemonList[i].name} (height: ${pokemonList[i].height})</p>`);
//     }
// }
//impelminting for each loop

function itemWriter(item){
    document.write(`<p>${item.name} (height: ${item.height})</p>`);
};

function itemHighlighter(item){
    document.write(`<p>${item.name} (height: ${item.height})- Wow That's BIG!</p>`);
};

// combined function
function pokemonWriteSwitcher(item) {
    if (item.height > 10) {
        itemHighlighter(item)
    } else {
        itemWriter(item)
    }
}
// function call
// pokemonList.forEach(pokemonWriteSwitcher());
pokemonRepository.getall().forEach(item => pokemonWriteSwitcher(item));



//                 debuging
// pokemonList.forEach(pokemonWriteSwitcher());
// let list = pokemonRepository.getall();
// console.log(list);
// console.log(list.forEach(item => heightChecker(item)));
// list.forEach(item => console.log(item.height));
// // list.forEach(pokemonWriteSwitcher());
// // list.forEach(item => console.log(item));
// // list.forEach(item => console.log(item));
// list.forEach(item => pokemonWriteSwitcher(item));