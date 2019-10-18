BEER_URL = 'http://localhost:3000/beers';

//Since we're using DOM Manipulation, we'll want to load
//the page before running any js
document.addEventListener('DOMContentLoaded', function(){
    fetchBeers();
})

function fetchBeers(){
    //will fetch all beers from above URL
    fetch(BEER_URL)
    .then(res => res.json())
    //for each beer in our response data,
    //we'll render them individually
    //(iterating here to avoid creating a whole new function
    //that would only be used to iterate)
    .then(data => data.forEach(beer => {
        //each beer is passed to renderBeer function
        renderBeer(beer)
    }))
    //error catching
    .catch(error => console.error(error))
}

function renderBeer(beer){
    //grab the ul, create li to append to the list
    let beerList = document.getElementById('list-group');
    let li = document.createElement('li');
    li.setAttribute('class', 'list-group-item');
    //set li text to the beer's name
    li.innerHTML = beer.name;
    //when user clicks on the beer name,
    //we want to populate the detail div
    li.addEventListener('click', function(){
        fetch(`${BEER_URL}/${beer.id}`)
        .then(res => res.json())
        .then(data => showBeerDetails(data))
        //passes the currently selected beer to show details function
    })
    //append each li item to the ul
    beerList.append(li);
}

function showBeerDetails(beer){
    //grab the beer detail div
    let beerDetails = document.getElementById('beer-detail');
    //clear the div from any previously displayed details
    beerDetails.innerHTML = '';
    //these create all the details we want to see, 
    //in the manner we want to see them
    let beerName = document.createElement('h1');
    beerName.innerHTML = beer.name;
    let beerImg = document.createElement('img');
    beerImg.src = beer.image_url;
    let beerTag = document.createElement('h3');
    beerTag.innerHTML = beer.tagline;
    let beerDesc = document.createElement('textarea');
    beerDesc.innerHTML = beer.description;
    let editBtn = document.createElement('button');
    editBtn.setAttribute('id', 'edit-beer');
    editBtn.setAttribute('class', 'btn btn-info');
    editBtn.innerHTML = 'Save';
    //when used clicks, we should persist the change
    editBtn.addEventListener('click', function(){
        //this passes the current beer to the save function
        saveBeer(beer);
    })
    //append all of the html elements into their parent div
    beerDetails.append(beerName, beerImg, beerTag, beerDesc, editBtn);
}

function saveBeer(beer){
    //grab the textarea value where the beer description is
    let newDesc = document.querySelector('textarea').value;
    //patch request with an interpolated URL
    fetch(`${BEER_URL}/${beer.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        //we're only changing the description here so
        //the body only needs the new description
        body: JSON.stringify({
            description: newDesc
        })
    })
    //we receive the single, newly updated beer object as a response
    .then(res => res.json())
    .then(data => {
        //ensure that the textarea is set to the new description rather than
        //the original description we got from fetchBeers(), when users 
        //selects another beer and then this one the new description 
        //will still be here
        showBeerDetails(data);
    })
    //error catching
    .catch(error => console.error(error))
}