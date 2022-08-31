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
        // Bonus Task
        // https://www.30secondsofcode.org/articles/s/javascript-array-comparison
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
        function addv(object) {
            let orginalKeys = Object.keys(object);
            let newItemKeys = [ 'name', 'height', 'types' ];

            if (typeof(object) == 'object' &&
            (orginalKeys.length == newItemKeys.length &&
                orginalKeys.every((key, i) => key === newItemKeys[i]))) {
                pokemonList.push(object)
            } else {
                console.log('Not a real Pokemon !')
            }
        }
        return{
            getall: getall,
            add: add,
            addv: addv
        }
    }
)();

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
// pokemonRepository.getall().forEach(item => pokemonWriteSwitcher(item));
pokemonRepository.getall().forEach( pokemon => {
    let pokemonUlList = document.querySelector('.pokemon-list');
    let pokemonList = document.createElement('li');
    let button = document.createElement('button')
    button.innerText = pokemon.name;
    pokemonList.appendChild(button);
    pokemonUlList.appendChild(pokemonList);
});



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