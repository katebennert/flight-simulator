document.addEventListener("DOMContentLoaded", () => {

    const beerForm = document.querySelector(".find-a-beer-form");
    beerForm.addEventListener("submit", fetchBeers);

    function fetchBeers(e) {
        e.preventDefault();

        const colorSelection = document.querySelector("#color-select").value;
        let ebcLow = 0;
        let ebcHigh = 0;
        const flavorSelection = document.querySelector("#flavor-select").value;
        let ibuLow = 0;
        let ibuHigh = 0;
        const abvSelection = document.querySelector("#abv-select").value;
        let abvLow = 0;
        let abvHigh = 0;

        // darkest beer = 390 ebc
        // bitterest beer = 1157 ibu

        switch (colorSelection) {
            case "pale":
                ebcLow = 0;
                ebcHigh = 17;
                break;
            case "golden":
                ebcLow = 16;
                ebcHigh = 25;
                break;
            case "amber":
                ebcLow = 23;
                ebcHigh = 60;
                break;
            case "brown":
                ebcLow = 59;
                ebcHigh = 79;
                break;
            case "dark":
                ebcLow = 78;
                ebcHigh = 390;
        }

        switch (flavorSelection) {
            case "fruity":
                ibuLow = 0;
                ibuHigh = 20;
                break;
            case "lager":
                ibuLow = 19;
                ibuHigh = 40;
                break;
            case "pale-ale":
                ibuLow = 38;
                ibuHigh = 60;
                break;
            case "ipa":
                ibuLow = 59;
                ibuHigh = 100;
                break;
            case "dank":
                ibuLow = 99;
                ibuHigh = 1157;
        }

        switch (abvSelection) {
            case "high":
                abvLow = 10;
                break;
            case "med-high":
                abvLow = 6;
                abvHigh = 10;
                break;
            case "med":
                abvLow = 5;
                abvHigh = 7;
                break;
            case "med-low":
                abvLow = 3;
                abvHigh = 6;
                break;
            case "low":
                abv = 4;
        }

         return fetch(`https://api.punkapi.com/v2/beers?ebc_gt=${ebcLow}&ebc_lt=${ebcHigh}&ibu_gt=${ibuLow}&ibu_lt=${ibuHigh}&abv_gt=${abvLow}&abv_lt=${abvHigh}`)
        .then((resp) => resp.json())
        .then((beerData) => {
            if(beerData[0]) {
                for (let beer of beerData) {
                    buildABeer(beer);
                    console.log(beer);
                }
            } else {
                console.log("Your perfect beer doesn't exist (yet). Try again or try our random beer generator!");
            }
        });
    }

    function buildABeer(beer) {
        const flipCard = document.createElement("div");
        flipCard.setAttribute("class", "flip-card");
        
        const flipCardInner = document.createElement("div");
        flipCardInner.setAttribute("class", "flip-card-inner");

        const flipCardFront = document.createElement("div");
        flipCardFront.setAttribute("class", "flip-card-front");

        const beerImg = document.createElement("img");
        beer.image_url ? beerImg.setAttribute("src", `${beer.image_url}`) : beerImg.setAttribute("src", `https://usercontent.one/wp/www.ndfletcher.org.uk/wp-content/uploads/2019/01/bd-logo.png`);
        beerImg.setAttribute("alt", `${beer.name}`);
        beerImg.setAttribute("class", "beer-img");

        const flipCardBack = document.createElement("div");
        flipCardBack.setAttribute("class", "flip-card-back");

        // beer info
        const beerName = document.createElement("h1");
        beerName.innerText = `${beer.name}`;
        const beerTagLine = document.createElement("h3");
        beerTagLine.innerText = `${beer.tagline}`;
        const beerDescription = document.createElement("p");
        beerDescription.innerText = `${beer.description}`;
        const h4 = document.createElement("h4");
        h4.innerText = "Food Pairings:"
        const ul = document.createElement("ul");
        ul.setAttribute("id", "food-pairing-list");
        
        const beerResultsContainer = document.querySelector("#beer-results-container");

        // appending elements to the beer results container
        beerResultsContainer.appendChild(flipCard);
        flipCard.appendChild(flipCardInner);
        flipCardInner.appendChild(flipCardFront);
        flipCardFront.append(beerImg, beerName);
        flipCardInner.appendChild(flipCardBack);
        flipCardBack.append(beerTagLine, beerDescription, h4, ul);
        for (let food of beer.food_pairing) {
            let li = document.createElement("li");
            li.innerText = `${food}`;
            ul.appendChild(li);
        }

    }

        
    
})