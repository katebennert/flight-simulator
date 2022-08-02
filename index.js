document.addEventListener("DOMContentLoaded", () => {

    function fetchBeers() {
        return fetch("https://api.punkapi.com/v2/beers?abv_lt=4")
        .then((resp) => resp.json())
        .then(data => console.log(data))
    }

    const beerForm = document.querySelector(".find-a-beer-form");
    beerForm.addEventListener("submit", e => {
        e.preventDefault();
        console.log("hi");
    })

})