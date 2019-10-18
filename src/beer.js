class Beer {
  constructor(beer) {
      this.id = beer.id;
      this.name = beer.name;
      this.tagline = beer.tagline;
      this.description = beer.description;
      this.imageUrl = beer.image_url;
      this.foodPairing = beer.food_pairing;
      this.brewersTips = beer.brewers_tips;
      this.contributedBy = beer.contributed_by;
  }

  render() {
    return (`
      <h1>${this.name}</h1>
      <img src="${this.imageUrl}">
      <h3>${this.tagline}</h3>
      <textarea>${this.description}</textarea>
      <button id="${this.id}" class="btn btn-info">
      Save
      </button>
      `)
  }


}
