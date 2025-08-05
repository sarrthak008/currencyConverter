
const FREE_CURRENCY_API = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_O1LwkXbf4cYpS3gVIE4fG4EVdSKd3ztVqVyBv0LY";

const FRANK_FUTER_API = "https://api.frankfurter.app/latest?from=INR&to=USD"

// selectorss..

let countryContainer = document.querySelector(".main-convert-data-container")



let countryInnerHTMl = ""
const loadUSDRate = async () => {
    try {
        let responce = await fetch(FREE_CURRENCY_API);
        let data = await responce.json()
        for (let country in data.data) {
            countryInnerHTMl += `<div class="data-iteam">
                       <div class="country-logo">${getFlagEmoji(country)}</div>
                       <div class="currency-value">${data.data[country]}</div>
                   </div>`
        }
        countryContainer.innerHTML = countryInnerHTMl
    } catch (error) {

        countryInnerHTMl = `<div class="error-component">
                    <div class="error-container">
                        <div class="error-image-container">
                            <img src="./assets/rupee.png">
                        </div>
                        <span>${error.message}</span>
                    </div>
                </div>`
        countryContainer.innerHTML = countryInnerHTMl

    }
}

document.addEventListener("DOMContentLoaded", loadUSDRate)




// get imagoji from countryName...
function getFlagEmoji(countryCode) {
    let UPPARR = [...countryCode.toUpperCase()]
    let mainArr = [UPPARR[0], UPPARR[1]]
    return mainArr.map(char => String.fromCodePoint(char.charCodeAt(0) + 127397))
        .join('');
}
