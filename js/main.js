class Pokedex {
    #index = 1;
    #id;
    #image;
    #name;

    constructor() {
        this.#id = document.querySelector('.pokemon-id');
        this.#image = document.querySelector('.pokemon');
        this.#name = document.querySelector('.pokemon-name');

        this.render(this.#index);
    }

    async search(pokemon) {
        const request = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);

        if (request.status === 200) {
            const data = await request.json();
            return data;
        }

        return null;
    }

    prev() {
        if (this.#index > 1) {
            this.#index -= 1;

            this.render(this.#index);
        }
    }

    next() {
        this.#index += 1;

        this.render(this.#index);
    }

    async render(pokemon) {
        this.#id.innerHTML = '';
        this.#image.classList.add('not-found');
        this.#name.innerHTML = 'Carregando...';

        const data = await this.search(pokemon);

        if (data == null) {
            this.#name.innerHTML = '0 resultados!';
            this.#index = 0;
            return;
        }

        this.#id.innerHTML = data.id;

        if (this.#image.classList.contains('not-found')) {
            this.#image.classList.remove('not-found');
        }

        this.#image.setAttribute('src', data.sprites.versions['generation-v']['black-white'].animated.front_default);

        this.#name.innerHTML = data.name;
        this.#index = data.id;
    }
}

const pokedex = new Pokedex();

const search = document.querySelector('.search-form');

search.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchInput = document.querySelector('#search');

    pokedex.render(searchInput.value.trim().toLowerCase());

    searchInput.value = '';
});