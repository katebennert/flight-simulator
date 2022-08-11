document.addEventListener("DOMContentLoaded", () => {

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

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
                removeAllChildNodes(document.querySelector("#beer-recipe-container"));
                removeAllChildNodes(document.querySelector("#beer-results-container"));
                // removes unhide class from recipe container
                document.querySelector("#beer-recipe-container").setAttribute("class", "");
                for (let beer of beerData) {
                    buildABeer(beer);
                    console.log(beer);
                }
            } else {
                document.querySelector("#beer-recipe-container").setAttribute("class", "");
                removeAllChildNodes(document.querySelector("#beer-recipe-container"));
                removeAllChildNodes(document.querySelector("#beer-results-container"));
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

        // creating html elements for beer info
        const beerName = document.createElement("h1");
        beerName.innerText = `${beer.name}`;
        const beerTagLine = document.createElement("h3");
        beerTagLine.setAttribute("style", "font-family: 'Roboto Mono', monospace;");
        beerTagLine.innerText = `${beer.tagline}`;
        const beerDescription = document.createElement("p");
        beerDescription.innerText = `${beer.description}`;
        const h4 = document.createElement("h4");
        h4.innerText = "Food Pairings:"
        const ul = document.createElement("ul");
        ul.setAttribute("id", "food-pairing-list");
        const recipeBtn = document.createElement("button");
        recipeBtn.setAttribute("class", "btn");
        recipeBtn.setAttribute("id", "recipe-btn");
        recipeBtn.innerText = "View Recipe";
        recipeBtn.addEventListener("click", buildRecipeCard);
        
        const beerResultsContainer = document.querySelector("#beer-results-container");

        // appending elements to the flip cards in beer results container
        beerResultsContainer.appendChild(flipCard);
        flipCard.appendChild(flipCardInner);
        flipCardInner.appendChild(flipCardFront);
        flipCardFront.append(beerImg, beerName, beerTagLine);
        flipCardInner.appendChild(flipCardBack);
        flipCardBack.append(beerDescription, h4, ul);
        for (let food of beer.food_pairing) {
            let li = document.createElement("li");
            li.innerText = `${food}`;
            ul.appendChild(li);
        }
        flipCardBack.append(recipeBtn);
    

        function buildRecipeCard(e) {
            removeAllChildNodes(document.querySelector("#beer-recipe-container"));

            const beerRecipeContainer = document.querySelector("#beer-recipe-container");
            beerRecipeContainer.setAttribute("class", "unhide-recipe-container");

            const recipeName = document.createElement("h1");
            recipeName.setAttribute("style", "font-family: 'Permanent Marker', cursive;");
            recipeName.innerText = `${beer.name}`;
            beerRecipeContainer.appendChild(recipeName);

            const recipeContributer = document.createElement("h3");
            recipeContributer.innerText = `Contributed by: ${beer.contributed_by.substring(0, beer.contributed_by.indexOf("<"))}`;
            beerRecipeContainer.appendChild(recipeContributer);

            const hops = document.createElement("p");
            hops.innerText = `Hops and Additions:`;
            beerRecipeContainer.appendChild(hops);

            const hopsList = document.createElement("ul");
            beerRecipeContainer.appendChild(hopsList);

            for (let hop of beer.ingredients['hops']) {
                let hopElement = document.createElement("li");
                hopElement.innerText = `${hop.amount['value']} ${hop.amount['unit']} ${hop.name} hops, Add: ${hop.add}`;
                hopsList.append(hopElement);
            }
            
            const malt = document.createElement("p");
            malt.innerText = "Malts:";
            beerRecipeContainer.appendChild(malt);

            const maltList = document.createElement("ul");
            beerRecipeContainer.appendChild(maltList);

            for (let malt of beer.ingredients['malt']) {
                let maltElement = document.createElement("li");
                maltElement.innerText = `${malt.amount['value']} ${malt.amount['unit']} ${malt.name} malt`;
                maltList.append(maltElement);
            }
            
            const yeast = document.createElement("p");
            yeast.innerText = `Yeast: ${beer.ingredients['yeast']}`;
            beerRecipeContainer.appendChild(yeast);

            const boilVolume = document.createElement("p");
            boilVolume.innerText = `Boil Volume: ${beer.boil_volume['value']} ${beer.boil_volume['unit']}`;
            beerRecipeContainer.appendChild(boilVolume);

            const yield = document.createElement("p");
            yield.innerText = `Yield: ${beer.volume['value']} ${beer.volume['unit']}`;
            beerRecipeContainer.appendChild(yield);

            const fermentationTemp = document.createElement("p");
            fermentationTemp.innerText = `Fermentation Temperature: ${beer.method['fermentation']['temp']['value']} ${beer.method['fermentation']['temp']['unit']}`;
            beerRecipeContainer.appendChild(fermentationTemp);

            const mashTempHead = document.createElement("p");
            mashTempHead.innerText = "Mash Temperature(s):";
            beerRecipeContainer.appendChild(mashTempHead);

            const mashList = document.createElement("ol");
            beerRecipeContainer.appendChild(mashList);
            for (let mash of beer.method['mash_temp']) {
                const mashTemp = document.createElement("li");
                mashTemp.innerText = `Hold mash at ${mash.temp['value']} ${mash.temp['unit']} for ${mash['duration']} minutes.`;
                mashList.appendChild(mashTemp);
            }

            if (beer.method['twist']) {
                const twist = document.createElement("p");
                twist.innerText = `Twist: ${beer.volume['value']} ${beer.volume['unit']}`;
                beerRecipeContainer.appendChild(yield);
            }

            const brewersTip = document.createElement("p");
            brewersTip.innerText = `Brewer's Tip: ${beer.brewers_tips}`;
            beerRecipeContainer.appendChild(brewersTip);
            
            // gets position of beer recipe container
            let recipeContainerPos = beerRecipeContainer.getBoundingClientRect();
            window.scrollTo({
                top: recipeContainerPos.bottom,
                left: 0,
                behavior: 'smooth'
            });

        }
    }
    
})