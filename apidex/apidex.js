let btnP = document.querySelector('#btnb');
let btnN = document.querySelector('#btnn');

btnP.setAttribute('data-url-personajes', '');
btnN.setAttribute('data-url-personajes', 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');

btnN.addEventListener('click', function (e) {
    let url = e.target.getAttribute('data-url-personajes');
    if (url != 'null') {
        personajes_lista(e.target.dataset.urlPersonajes);
    }
});

btnP.addEventListener('click', function (e) {
    let url = e.target.getAttribute('data-url-personajes');
    if (url != 'null' && url) {
        personajes_lista(e.target.dataset.urlPersonajes);
    }
});

personajes_lista();

function personajes_lista(url_pokemon = "https://pokeapi.co/api/v2/pokemon") {
    fetch(url_pokemon)
        .then(response => response.json())
        .then(infojson => {
            let carhtml = '';
            infojson.results.forEach(element => {
                let pokeurl = element.url;
                
                fetch(pokeurl)
                    .then(response => response.json())
                    .then(infopokemon => {
                        carhtml += `
                            <div class="card mb-4 shadow " style="max-width: 540px;">
                                <div class="row g-0 ">
                                    <div class="col-md-3 d-block ">
                                        <img src="${infopokemon.sprites.other.dream_world.front_default}" class="img-fluid rounded-start w-100 h-100" alt="${element.name}">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 id="pokename" class="card-title">${element.name}</h5>
                                            <p id="pokeinfo" class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                            <p id="pokevivo" class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                        document.getElementById('carhtml').innerHTML = carhtml;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });

            btnP.setAttribute('data-url-personajes', infojson.previous || '');
            btnN.setAttribute('data-url-personajes', infojson.next || '');

            btnP.disabled = !infojson.previous;
            btnN.disabled = !infojson.next;
        })
        .catch(error => {
            console.log(error);
        });
}