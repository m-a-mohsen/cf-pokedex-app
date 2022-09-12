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
            console.log({pokemon})
            let pokemonUrl = pokemon.url;
            let detailedPokemon = pokemon;
            return fetch(pokemonUrl)
                .then(pokemonJson => {
                    let jsonPromis = pokemonJson.json();
                    console.log({jsonPromis})
                    return jsonPromis;
                })
                .then((pokemonData) => {
                        // let pokemonIndex = pokemonList.indexOf(pokemon);

                        // pokemonList[pokemonIndex].imageUrl = pokemonData.sprites.front_default;
                        // pokemonList[pokemonIndex].height = pokemonData.height;
                        console.log({pokemonData});
                        console.log(pokemon.name);
                        pokemon.imageUrl = pokemonData.sprites.front_default;
                        pokemon.height = pokemonData.height;
                        console.log({pokemon});
                        return pokemon
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
            button.setAttribute('id',`${pokemon.name}`);
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
            pokemonRepository.loadDetails(pokemon).then((pokemonD) => {
                console.log(pokemonD);
                let modalContainer = document.querySelector('#modal-container');
                let title = pokemonD.name;
                console.log(title);
                let text = ` <strong>Name :</strong> ${title} <br> <strong>Height :</strong> ${pokemon.height} meter`;
                let img = pokemonD.imageUrl;
  
                function showModal(title, text, img) {
                    modalContainer.innerHTML = '';
                    let modal = document.createElement('div');
                    modal.classList.add('modal');

                    let closeButtonElement = document.createElement('button');
                    closeButtonElement.classList.add('modal-close');
                    closeButtonElement.innerText = 'Close';
                    closeButtonElement.addEventListener('click', hideModal);

                    let titleElement = document.createElement('h1');
                    titleElement.innerText = title;

                    let contentElement = document.createElement('p');
                    contentElement.innerHTML = text;

                    let imageElement = document.createElement("img");
                    imageElement.setAttribute("src", img);
                    imageElement.setAttribute("width", "304");
                    imageElement.setAttribute("height", "228");
                    imageElement.setAttribute("alt", "Pokemon Picture");

                    modal.appendChild(closeButtonElement);
                    modal.appendChild(titleElement);
                    modal.appendChild(contentElement);
                    modal.appendChild(imageElement);

                    modalContainer.appendChild(modal);
                    
                    modalContainer.classList.add('is-visible');
                }

                function hideModal() {
                    modalContainer.classList.remove('is-visible');
                }

                window.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                    hideModal();  
                    }
                });
                
                modalContainer.addEventListener('click', (e) => {
                    // Since this is also triggered when clicking INSIDE the modal
                    // We only want to close if the user clicks directly on the overlay
                    let target = e.target;
                    if (target === modalContainer) {
                    hideModal();
                    }
                });

                document.querySelector(`#${pokemon.name}`).addEventListener('click', () => {
                    showModal(title, text);
                });

                // THE RETURN STATEMENT HERE
                showModal(pokemon);
            })
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
