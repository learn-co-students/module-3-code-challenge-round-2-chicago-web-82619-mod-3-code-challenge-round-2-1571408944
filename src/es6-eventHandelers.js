const API = {
    fetchBeers: async () => {
        try{
        const resp = await fetch(URL)
        const json = await resp.json()

        displayBeers(json)
        } catch (error){
            console.error(error)
        }
    },
    displayInfo: async event => {
        try{
            const id = (event.target.id.match(/\d+$/) || []).pop()

            const resp = await fetch(URL + id)
            const json = await resp.json()
            
            displayBeerDetails(json)
        } catch (error){
            console.error(error)
        }
    },
    updateBeer: async event => {
        try {
            const id = (event.target.id.match(/\d+$/) || []).pop();
            const newDesc = event.target.parentNode.children[3].value;
        
            return fetch(URL + id,{
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
        catch (error){
            console.error(error)
        }
    }
}