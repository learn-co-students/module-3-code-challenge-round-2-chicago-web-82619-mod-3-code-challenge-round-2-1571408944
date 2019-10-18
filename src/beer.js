

class Beer {

  constructor(jsonBeer) {
    this.id = jsonBeer.id
    this.name = jsonBeer.name
    this.description = jsonBeer.description
    this.tagline = jsonBeer.tagline
    this.imageUrl = jsonBeer.image_url
    this.foodPairing = jsonBeer.food_pairing
    this.brewersTips = jsonBeer.brewers_tips
    this.contributedBy = jsonBeer.contributed_by}


    renderLi() {
      let li = document.createElement('li')
      li.classList.add("list-group-item")
      li.setAttribute('data-id', this.id)
      li.textContent = this.name


      return li
    }

    renderDetail() {
    return `<h1>${this.name}</h1>
<img src="${this.imageUrl}">
<h3>${this.tagline}</h3>
<textarea>${this.description}</textarea>
<button id="edit-beer" data-id="${this.id}" class="btn btn-info">
  Save
</button>`
    }

}


Beer.fetchBeers = async function(beersUl) {
  let resp = await fetch('http://localhost:3000/beers')
  console.log(resp)
  let beersData = await resp.json()
  let beers = beersData.map(beerEl => new Beer(beerEl))
  beers.forEach(beerObj=> beersUl.appendChild(beerObj.renderLi()))

}
