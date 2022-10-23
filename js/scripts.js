// IIFE variable
// --------------
const pokemonRepository = (function () {
  const pokemonList = []
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'
  const modalContainer = document.querySelector('.modal-body')

  // Load Pokemons list from api (Name, detalis link)
  // -------------------------------------------------
  function LoadList () {
    return fetch(apiUrl)
      .then((data) => {
        return data.json()
      })
      .then((json) => {
        json.results.forEach((element) => {
          const pokemon = {
            name: element.name,
            url: element.url
          }
          add(pokemon)
        })
      })
  }

  // get pokemon list array
  // -----------------------
  function getall () {
    return pokemonList
  }

  // add Pokemons to pokemon list array
  // -----------------------------------
  function add (item) {
    pokemonList.push(item)
  }

  // add verified Pokemons to pokemon list array (optional)
  // ----------------------------------------------------
  function addv (object) {
    if (typeof object === 'object' && 'name' in object) {
      pokemonList.push(object)
    } else {
      console.log('Not a real Pokemon !')
    }
  }

  // Load Pokemon details for any item of pokemon list.
  // --------------------------------------------------
  function loadDetails (pokemon) {
    console.log({ pokemon })
    const pokemonUrl = pokemon.url
    return fetch(pokemonUrl)
      .then((pokemonJson) => {
        const jsonPromis = pokemonJson.json()
        console.log({ jsonPromis })
        return jsonPromis
      })
      .then((pokemonData) => {
        console.log({ pokemonData })
        console.log(pokemon.name)
        pokemon.imageUrl = pokemonData.sprites.front_default
        pokemon.height = pokemonData.height
        console.log({ pokemon })
        return pokemon
      })
      .catch((err) => console.log(err))
  }

  // a function to creat buttons from a pokemon object
  // --------------------------------------------------
  function addListItem (pokemon) {
    const pokemonUlList = document.querySelector('.list-group')
    const pokemonList = document.createElement('li')
    pokemonList.classList.add('list-group-item')

    const button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-primary')
    button.setAttribute('id', `${pokemon.name}`)
    button.setAttribute('data-bs-toggle', 'modal')
    button.setAttribute('data-bs-target', '#pokemonModal')
    button.innerText = pokemon.name
    pokemonList.appendChild(button)
    pokemonUlList.appendChild(pokemonList)
    eventListener(button, pokemon)
  }

  // a function to add event listener to any DOM node
  // ------------------------------------------
  function eventListener (node, object) {
    node.addEventListener('click', (e) => showDetails(object))
  }

  // a function to consol log name property of an object
  // ------------------------------------------------------
  function showDetails (pokemon) {
    pokemonRepository.loadDetails(pokemon).then((pokemon) => {
      showModal(pokemon)
    })
  }

  // Show content of a selected pokemon on the modal
  function showModal (pokemon) {
    const modal = document.createElement('div')
    modal.innerHTML = ''
    modalContainer.innerHTML = ''

    const titleElement = document.createElement('h1')
    titleElement.innerText = pokemon.name

    const contentElement = document.createElement('p')
    contentElement.innerHTML = 'Height: ' + pokemon.height

    const imageElement = document.createElement('img')
    imageElement.setAttribute('src', pokemon.imageUrl)
    imageElement.setAttribute('width', '304')
    imageElement.setAttribute('height', '228')
    imageElement.setAttribute('alt', 'Pokemon Picture')

    // modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement)
    modal.appendChild(contentElement)
    modal.appendChild(imageElement)

    modalContainer.appendChild(modal)

    modalContainer.classList.add('is-visible')
  }

  // Function to hide modal
  function hideModal () {
    modalContainer.classList.remove('is-visible')
  }

  // Hide modal when pressing the ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal()
    }
  })

  // Hide modal when clicking outside the modal
  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    const target = e.target
    if (target === modalContainer) {
      hideModal()
    }
  })

  return {
    getall,
    add,
    addv,
    addListItem,
    showDetails,
    eventListener,
    LoadList,
    loadDetails
  }
})()

// Function call

pokemonRepository
  .LoadList()
  .then((result) =>
    pokemonRepository
      .getall()
      .forEach((pokemon) => pokemonRepository.addListItem(pokemon))
  )
  .catch((err) => console.log(err))
