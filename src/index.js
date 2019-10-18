

let beersUl = document.querySelector('ul.list-group')
let beerDiv = document.getElementById('beer-detail')
Beer.fetchBeers(beersUl)

beersUl.addEventListener('click', showBeerDetails)
beerDiv.addEventListener('click', updateBeer)


async function updateBeer(event) {

  if (event.target.id == 'edit-beer') {
    let input = event.target.parentNode.querySelector('textarea').value
    console.log(input)

    let req = {method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({description: `${input}`})
  }

  let resp = await fetch(`http://localhost:3000/beers/${event.target.dataset.id}`, req)
  let update = await resp.json()
  console.log(update)


  }
}


async function showBeerDetails(event) {

  let id = event.target.dataset.id
  let resp = await fetch(`http://localhost:3000/beers/${id}`)
  let beerData = await resp.json()
  let beer = new Beer(beerData)
  console.log(beer)
  beerDiv.innerHTML = ""
  beerDiv.innerHTML += beer.renderDetail()


}
