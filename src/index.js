function main() {
    document.addEventListener('DOMContentLoaded', () => {
        //after the DOM is loaded, call the function that will handle fetching the beers data
        fetchBeers()
    })
}

function fetchBeers() {
    //GET fetch request to beer index, pull json data, send along to next funtion to begin render process
    fetch('http://localhost:3000/beers')
    .then(resp => resp.json())
    .then(beers => renderBeers(beers))
    .catch(error => console.log(error))
}

function renderBeers(beers) {
    //for each beer within the data, send to function to render individual beers in sidebar list
    beers.forEach(renderBeer)
}

function renderBeer(beer) {
    //get the beer list via query selector for the class name
    //create an li element
    const beerList = document.querySelector(".list-group")
    const beerLi = document.createElement('li')

    //append the created li to the located list element
    beerList.append(beerLi)

    //set innerHTML to display the beer name
    //set attributes for each beer on the list including matching the given class name and creating an id equivalent to the beer id
    beerLi.innerHTML = beer.name
    beerLi.setAttribute('class', 'list-group-item')
    beerLi.setAttribute('id', beer.id)

    //add a click event listener to each beer in the sidebar that will pass the event data to the next fetch request
    beerLi.addEventListener('click', (event) => {
        fetchBeer(event)
    })
}

// get the beer id to use in the fetch URL by pulling data from event.target and fetch individual beer data
function fetchBeer(event) {
    const ext = event.target.id
    fetch(`http://localhost:3000/beers/${ext}`)
    .then(resp => resp.json())
    .then(beer => displayBeer(beer))
    .catch(error => console.log(error))
}

//using the fetched data, locate the div everything should be appended to and clear div content
//this prevents the page from showing all the beers as you click on them and refreshes to show just the most recently clicked
function displayBeer(beer) {
    const div = document.getElementById('beer-detail')
    div.innerHTML = ''

    //create all the necessary elements given by the deliverables and append to the main div
    const h1 = document.createElement('h1')
    const img = document.createElement('img')
    const h3 = document.createElement('h3')
    const textArea = document.createElement('textarea')
    const button = document.createElement('button')

    div.append(h1, img, h3, textArea, button)

    //set all the beer data to their respective display elements
    //also set an id to the text area so it can be easily selected later
    h1.innerHTML = beer.name
    img.src = beer.image_url
    h3.innerHTML = beer.tagline

    textArea.innerHTML = beer.description
    textArea.setAttribute('id', 'beerDescription')

    //everything related to the description save button
    //assigned the button id and class attributes as well as some dataset information
    //this information will be passed along with the button when the created click event listener is triggered
    button.innerHTML = "Save"
    button.setAttribute('id', 'edit-beer')
    button.setAttribute('class', 'btn btn-info')
    button.dataset.action = 'save'
    button.dataset.id = beer.id
    button.addEventListener('click', (event) => {
        if (event.target.dataset.action === 'save') {
            updateBeer(event)
        }
    })

    //bonus object elements to display on page
    //skip to line 117 below for the PATCH fetch
    //create all elements to hold extra beer data (tips, contributer, and food pairings)
    const newDiv = document.createElement('div')
    const tipsTitle = document.createElement('h3')
    const tips = document.createElement('p')
    const contributerTitle = document.createElement('h3')
    const contributer = document.createElement('p')
    const foodTitle = document.createElement('h3')
    const foodList = document.createElement('ul')

    //append created elements to the new div and assign all of the innerHTML
    newDiv.append(tipsTitle, tips, contributerTitle, contributer, foodTitle, foodList)
    div.append(newDiv)

    tipsTitle.innerHTML = 'Brewers Tips:'
    tips.innerHTML = beer.brewers_tips

    contributerTitle.innerHTML = "Contributed by:"
    contributer.innerHTML = beer.contributed_by

    // assign food pairings to an array variable and display list item for each food item in the array
    foodTitle.innerHTML = "Recommended Food Pairing:"
    let foodArray = beer.food_pairing
    foodArray.forEach( function(food) {
        const foodLi = document.createElement('li')
        foodList.append(foodLi)
        foodLi.innerHTML = food
    }) 
}

//locate the id using the previously created dataset id to be used in fetch-patch
//get the text from within the description textarea field
//submit patch request via fetch to update the description with the new textarea value
function updateBeer(event) {

    const beerId = event.target.dataset.id
    const beerDescription = document.getElementById('beerDescription').value

    fetch(`http://localhost:3000/beers/${beerId}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            description: beerDescription
        })
    }).then(resp => resp.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
}

main()
