function main() {
  document.addEventListener('DOMContentLoaded', () => {
    const URL = 'http://localhost:3000/beers'
    const beerListUl = document.getElementById('list-group')
    // console.log(beerListUl)

    getBeers()

    // get all the beerzes LIST

    function getBeers() {
      fetch(URL)
        .then(resp => resp.json())
        .then(beersData => {
          renderBeerList(beersData)
        })
    }

    function renderBeerList(beersData) {
      beerListUl.innerHTML = ""
      const beerListLis = beersData.map(beer => {
        return renderBeerListItem(beer)
      }).join('')
      // console.log(beerListLis)
      beerListUl.innerHTML = beerListLis
      // console.log(beerListUl)
    }

    function renderBeerListItem(beer) {
      // console.log(beer)
      return (`
        <li class="list-group-item" id="${beer.id}">${beer.name}</li>
        `)
      // console.log(beerLi)
    }

    // beer list event listeners

    beerListUl.addEventListener('click', (event) => {
      // console.log(event.target)
      getBeer(event.target)
    })


    // get A beer

    function getBeer(target) {
      // console.log(target.id)
      fetch(URL + `/${target.id}`)
        .then(resp => resp.json())
        .then(beerData => renderBeer(beerData))
    }


    // render one beer

    function renderBeer(beerData) {
      const beerDetail = document.getElementById('beer-detail')
      // console.log(beerDetail)
      beerDetail.innerHTML = ""

      const newBeer = new Beer(beerData)
      const newBeerRendered = newBeer.render()

      beerDetail.innerHTML = newBeerRendered
      // console.log(beerDetail)

      const saveBtn = document.querySelector('.btn')
      // console.log(saveBtn)
      saveBtn.addEventListener('click', (event) => {
        updateBeerInfo(event.target)
      })

    }

    // update a beerz info

    function updateBeerInfo(target) {
      // console.log(target.parentNode.children[3].value)
      const newDescription = target.parentNode.children[3].value
      const beerId = target.id;
      // console.log(beerId)

      const beerData = {
        id: beerId,
        description: newDescription
      }

      runBeerPatch(beerData)

    }

    // patch the data for single beer

    function runBeerPatch(beerData){
      // console.log(beerData.id)
      // console.log(beerData.description)
      reqObj = {
        method: 'PATCH',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(beerData)
      }
      fetch(URL + `/${beerData.id}`, reqObj)
    }

  })
}





































main()
