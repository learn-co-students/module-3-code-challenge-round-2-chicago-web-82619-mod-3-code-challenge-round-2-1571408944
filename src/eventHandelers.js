const fetchBeers = () => {
    fetch(URL)
    .then(resp => resp.json())
    .then(json => displayBeers(json))
}

const displayInfo = event => {
    const id = (event.target.id.match(/\d+$/) || []).pop()
    console.log(URL + id)
    fetch(URL + id)
    .then(resp => resp.json())
    .then(json => displayBeerDetails(json))
}

const updateBeer = event => {
    const id = (event.target.id.match(/\d+$/) || []).pop();
    const newDesc = event.target.parentNode.children[3].value;

    fetch(URL + id,{
        method: "PATCH",
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            description: newDesc
        })
    })
}