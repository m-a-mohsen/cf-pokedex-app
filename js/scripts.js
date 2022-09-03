// source https://pokedex.org/
// import Promise from 'js/promise-polyfill';
// import fetch from 'js/whatwg-fetch';


// IIFE variable
let pokemonRepository = (
    function () {
        let pokemonList = [];
        let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

        function LoadList() {
            return fetch(apiUrl)
            .then(data => {
                return data.json();
                console.log(data);

            })
            .then(json => {
                
                json.results.forEach(element => {
                    let pokemon = {
                      name : element.name,
                      url : element.url
                    }
                    // console.log(element);
                    add(pokemon)
                  })
            }
            )
        }

        function loadDetails(pokemon){
            const pokemonUrl = pokemon.url;
            return fetch(pokemonUrl)
            .then(pokemonJson => pokemonJson.json())
            .then(
                pokemonData => {
                    pokemon.imageUrl = pokemonData.sprites.front_default;
                    pokemon.height = pokemonData.height;
                }
            )
            .catch(err => console.log(err))
        }

        function getall() {
            return pokemonList;
        }
        function add(item) {
            pokemonList.push(item)
        }

        // Bonus Task (add verification method to add)
        // -----option 1------

        // https://www.30secondsofcode.org/articles/s/javascript-array-comparison
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
        // function addv(object) {
        //     let orginalKeys = Object.keys(object);
        //     let newItemKeys = ['name', 'height', 'types'];

        //     if (typeof (object) == 'object' &&
        //         (orginalKeys.length == newItemKeys.length &&
        //             orginalKeys.every((key, i) => key === newItemKeys[i]))) {
        //         pokemonList.push(object)
        //     } else {
        //         console.log('Not a real Pokemon !')
        //     }
        // }
        // -----option 2------

        // https://careerfoundry.com/en/course/full-stack-immersion/exercise/apis-ajax-and-asynchronous-behavior

        function addv(object) {

            if (
                typeof object === 'object' &&
                 'name' in object
                 ) {
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
            pokemonRepository.loadDetails(pokemon).then(()=>console.log(pokemon))
        }

        return {
            getall: getall,
            add: add,
            addv: addv,
            addListItem: addListItem,
            showDetails: showDetails,
            eventListener: eventListener,
            LoadList : LoadList,
            loadDetails: loadDetails
        }
    }
)();

//impelminting for each loop

let loadList = pokemonRepository.LoadList();
console.log({loadList});
loadList.then((result) => {
    pokemonRepository.getall()
    .forEach( pokemon => {
        pokemonRepository.addListItem(pokemon);
        console.log(pokemon);
        
    }
    )
}).catch((err) => {
    console.log(err);
});// .then((respon) => respon.getall()).forEach(pokemon => pokemon.addListItem())
