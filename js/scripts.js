// source https://pokedex.org/

// IIFE variable
let pokemonRepository = (
    function () {
        let pokemonList = [
            {
                name: "Bulbasaur",
                height: 7,
                types: ['grass', 'poison']
            },
            {
                name: "Ivysaur",
                height: 10,
                types: ['water', 'sand']
            }, {
                name: "Venusaur",
                height: 20,
                types: ['glass', 'stone']
            }
        ];

        function getall() {
            return pokemonList;
        }
        function add(item) {
            pokemonList.push(item)
        }
        // Bonus Task
        // https://www.30secondsofcode.org/articles/s/javascript-array-comparison
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
        function addv(object) {
            let orginalKeys = Object.keys(object);
            let newItemKeys = ['name', 'height', 'types'];

            if (typeof (object) == 'object' &&
                (orginalKeys.length == newItemKeys.length &&
                    orginalKeys.every((key, i) => key === newItemKeys[i]))) {
                pokemonList.push(object)
            } else {
                console.log('Not a real Pokemon !')
            }
        }
        // a function to creat buttons from an object
        function addListItem(pokemon) {
            let pokemonUlList = document.querySelector('.pokemon-list');
            let pokemonList = document.createElement('li');
            let button = document.createElement('button');
            button.classList.add('button-class');
            button.innerText = pokemon.name;
            pokemonList.appendChild(button);
            pokemonUlList.appendChild(pokemonList);

            // button.addEventListener('click', e => {
            //     showDetails(pokemon)
            // });

            eventListener(button, pokemon);
        }

        // a function to add event listener to a node
        function eventListener(node, object) {
            node.addEventListener('click', e => showDetails(object))
        }

        // a function to print name property of an object
        function showDetails(pokemon) {
            console.log(pokemon.name);
        }

        return {
            getall: getall,
            add: add,
            addv: addv,
            addListItem: addListItem,
            showDetails: showDetails,
            eventListener: eventListener
        }
    }
)();

//impelminting for each loop

pokemonRepository.getall().forEach(pokemon => {
    pokemonRepository.addListItem(pokemon);
});
