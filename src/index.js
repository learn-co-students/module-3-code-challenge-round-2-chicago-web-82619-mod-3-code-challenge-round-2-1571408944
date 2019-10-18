const BEER_URL = 'http://localhost:3000/beers/'

function main() {
    document.addEventListener('DOMContentLoaded', () => {
        fetch(BEER_URL)
        .then(resp => resp.json())
        .then(json => {
            json.forEach(beer => {
                renderBeerList(beer)
            });
        })
    })
}

function renderBeerList(beer) {
    const list = document.querySelector('#list-group')
    
    const li = document.createElement('li')
    li.className = 'list-group-item'
    li.dataset.id = beer.id
    li.innerHTML = beer.name
    
    list.appendChild(li)

    li.addEventListener('click', (event) => {
        const beerId = li.dataset.id

        fetch(BEER_URL + beerId)
        .then(resp => resp.json())
        .then(beer => renderBeer(beer))
    })
}  

function renderBeer(beer) {
    const div = document.querySelector('#beer-detail')
    div.innerHTML = ""

    const h1 = document.createElement('h1')
    h1.innerHTML = beer.name
    div.appendChild(h1)

    const img = document.createElement('img')
    img.src = beer.image_url
    div.appendChild(img)

    const h3 = document.createElement('h3')
    h3.innerHTML = beer.tagline
    div.appendChild(h3)

    const textarea = document.createElement('textarea')
    textarea.className = 'beer-desc'
    textarea.innerHTML = beer.description
    div.appendChild(textarea)

    const button = document.createElement('button')
    button.dataset.id = beer.id
    button.className = 'btn btn-info'
    button.innerHTML = 'Save'
    div.appendChild(button)

    button.addEventListener('click', (event) => {
        handleEdit(beer)
    })
}

function handleEdit(beer) {
    const beerId = beer.id 
    const beerDiv = document.querySelector('#beer-detail')
    const newDescription = beerDiv.querySelector('.beer-desc')

    fetch(BEER_URL + beerId, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            description: newDescription.value
        })
    })
    .then(resp => resp.json())
    .then(json => {
        const myNotification = window.createNotification();
        myNotification({
            title: 'Notification',
            message: 'Successfully Saved!'
        });
    })
}


main()