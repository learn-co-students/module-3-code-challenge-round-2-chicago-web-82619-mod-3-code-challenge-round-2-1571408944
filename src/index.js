// housing function for document readability
function main() {
    document.addEventListener('DOMContentLoaded', () => {
        fetchAllBeers();
    });
}

// fetch all beers and call display beers passing in json data returned from fetch
function fetchAllBeers() {
    fetch(`http://localhost:3000/beers`)
        .then(resp => resp.json())
        .then(json => displayAllBeers(json))
}

// use passed in json data to render each beer in list and then add event listener to show more info on click
function displayAllBeers(beers) {
    const ul = document.querySelector('.list-group');
    beers.forEach(beer => {
        ul.insertAdjacentHTML('beforeend', 
        `
            <li data-id="${beer.id}" class="list-group-item">${beer.name}</li>
        `)
    });

    addBeerInfoListener();
}

// add a listener to li elements to call function to get single beer info
function addBeerInfoListener() {
    const lis = document.querySelectorAll('li');
    lis.forEach(li => {
        li.addEventListener('click', (event) => {
            const beerId = event.target.dataset.id;
            fetchSingleBeer(beerId);
        })
    });
}

// get info for a single beer and call function to render beer html using passed json data
function fetchSingleBeer(beerId) {
    fetch(`http://localhost:3000/beers/${beerId}`)
        .then(resp => resp.json())
        .then(json => displaySingleBeer(json))
}

// render a single beer on the page after click and create a listener to save and edit on the description
function displaySingleBeer(beerInfo) {
    const div = document.querySelector('#beer-detail');
    div.innerHTML = '';
    div.insertAdjacentHTML('beforeend', 
    `
        <h1>${beerInfo.name}</h1>
        <img src="${beerInfo.image_url}">
        <h3>${beerInfo.tagline}</h3>
        <textarea>${beerInfo.description}</textarea>
        <button data-id="${beerInfo.id}" id="edit-beer" class="btn btn-info">Save</button>
    `);

    addSaveListener();
}

// adds a listener to the save button and calls a fetch to update the db then render changes
function addSaveListener() {
    const saveBtn = document.querySelector('#edit-beer');
    saveBtn.addEventListener('click', (event) => {
        const id = event.target.dataset.id;
        const description = document.querySelector('textarea').value;
        const beerObj = {
            "id": id,
            "description": description
        }

        patchBeer(beerObj);
    });
}

// fetch patch request to db and then update the html on page to reflect edits
function patchBeer(beerObj) {
    fetch(`http://localhost:3000/beers/${beerObj.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(beerObj)
    })
        .then(alert('Successfully saved description.'))
}

main();