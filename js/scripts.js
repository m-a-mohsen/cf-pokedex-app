// source https://pokedex.org/
// import Promise from 'js/promise-polyfill';
// import fetch from 'js/whatwg-fetch';


// IIFE variable
//--------------
let pokemonRepository = (
    function () {
        let pokemonList = [];
        let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

        // Load Pokemons list from api (Name, detalis link)
        //-------------------------------------------------
        function LoadList() {
            return fetch(apiUrl)
                .then(data => {
                    return data.json();
                    console.log(data);

                })
                .then(json => {

                    json.results.forEach(element => {
                        let pokemon = {
                            name: element.name,
                            url: element.url
                        }
                        add(pokemon)
                    })
                })
        }

        // Load Pokemon details for any item of pokemon list.
        // --------------------------------------------------
        function loadDetails(pokemon) {
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
        // get pokemon list array
        //-----------------------
        function getall() {
            return pokemonList;
        }

        // add Pokemons to pokemon list array
        //-----------------------------------
        function add(item) {
            pokemonList.push(item)
        }
        
        
        // add verified Pokemons to pokemon list array (optional)
        //----------------------------------------------------
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

        // a function to creat buttons from a pokemon object
        //--------------------------------------------------
        function addListItem(pokemon) {
            let pokemonUlList = document.querySelector('.pokemon-list');
            let pokemonList = document.createElement('li');

            let button = document.createElement('button');
            button.classList.add('button-class');
            button.innerText = pokemon.name;
            pokemonList.appendChild(button);
            pokemonUlList.appendChild(pokemonList);
            eventListener(button, pokemon);
        }

        // a function to add event listener to any DOM node
        // ------------------------------------------
        function eventListener(node, object) {
            node.addEventListener('click', e => showDetails(object))
        }

        // a function to consol log name property of an object ????
        //------------------------------------------------------
        function showDetails(pokemon) {
            pokemonRepository.loadDetails(pokemon).then(() => console.log(pokemon.name))
        }

        return {
            getall: getall,
            add: add,
            addv: addv,
            addListItem: addListItem,
            showDetails: showDetails,
            eventListener: eventListener,
            LoadList: LoadList,
            loadDetails: loadDetails
        }
    }
)();

// Function call

pokemonRepository.LoadList()
.then((result) =>
    pokemonRepository.getall()
        .forEach(pokemon => pokemonRepository.addListItem(pokemon))
        ).catch((err) => console.log(err));
