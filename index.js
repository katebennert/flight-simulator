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
        // return fetch("https://api.punkapi.com/v2/beers?ibu_lt=100&ibu_gt=60")
        .then((resp) => resp.json())
        .then(data => console.log(data));
    }

        
    
})