URL = "http://localhost:3000/beers/"

const {fetchBeers, displayInfo, updateBeer} = API;

const main = () => {
    document.addEventListener("DOMContentLoaded", () => {
        fetchBeers();
    })
}

const displayBeers = (beers) => {
    const list = document.getElementById("list-group");

    beers.forEach(beer => list.append(makeLi(beer)));
}

const makeLi = (beer) => {
    const li = document.createElement("li");
    li.id = `beer-id-${beer.id}`
    li.className = "list-group-item";
    li.textContent = beer.name;
    li.addEventListener("click", displayInfo);

    return li
}

const displayBeerDetails = (beer) => {
    const div = document.getElementById("beer-detail");
    div.innerHTML = "";

    const h1 = document.createElement("h2");
    h1.textContent = beer.name;

    const img = document.createElement("img");
    img.src = beer.image_url;

    const h3 = document.createElement("h3");
    h3.textContent = beer.tagline;

    const textarea = document.createElement("textarea");
    textarea.textContent = beer.description;

    const btn = document.createElement("button");
    btn.textContent = "Save";
    btn.id = `edit-beer-${beer.id}`
    btn.className = "btn btn-info"
    btn.addEventListener("click", updateBeer);

    div.append(h1, img, h3, textarea, btn);
}

main();