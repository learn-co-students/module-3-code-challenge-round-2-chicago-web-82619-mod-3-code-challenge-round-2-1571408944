function main() {
  document.addEventListener('DOMContentLoaded', function() {
    getBeers()
  })
  
  function getBeers() {
    fetch('http://localhost:3000/beers')
      .then(resp => resp.json())
      .then(beersData => renderBeers(beersData))
      .catch(error => console.log(error))
  }
  
  function renderBeers(beersData) {
    const beersList = document.querySelector('.list-group');

    beersData.forEach( (beer) => {
      const newLi = document.createElement('li');
      newLi.innerText = beer.name;
      newLi.setAttribute('class', 'list-group-item')
      newLi.addEventListener('click', function(event) {
        fetchBeer(beer.id)
      });
      beersList.append(newLi)
    })
  }

  function fetchBeer(beerId) {
    fetch(`http://localhost:3000/beers/${beerId}`)
      .then(resp => resp.json())
      .then(beerObj => renderBeer(beerObj))
      .catch(error => console.log(error))
  }

  function renderBeer(beer) {
    const beerContainer = document.getElementById('beer-detail')
    beerContainer.innerHTML = '';

    const h1 = document.createElement('h1');
    h1.innerText = beer.name;
    
    const img = document.createElement('img');
    img.src = beer.image_url;

    const h3 = document.createElement('h3');
    h3.innerText = beer.tagline;

    const textarea = document.createElement('textarea');
    textarea.value = beer.description;

    const button = document.createElement('button');
    button.setAttribute('class', 'btn btn-info');
    button.setAttribute('id', 'edit-beer');
    button.innerHTML = 'Save';
    button.addEventListener('click', function(event) {
       editBeer(event, beer)
    });

    beerContainer.append(h1, img, h3, textarea, button)
  }

  function editBeer(event, beer) {
    const newDescription = event.target.previousSibling.value;
    
    fetch(`http://localhost:3000/beers/${beer.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        description: newDescription
        })
      })
      .then(resp => resp.json())
      .then(beerObj => fetchBeer(beerObj.id))
      .catch(error => console.log(error))
  }
} 

main()