
const FREE_CURRENCY_API = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_O1LwkXbf4cYpS3gVIE4fG4EVdSKd3ztVqVyBv0LY";

const FRANK_FUTER_API = "https://api.frankfurter.app/latest?from=INR&to=USD"

const currencyCodes = [
    "AUD", "BGN", "BRL", "CAD", "CHF",
    "CNY", "CZK", "DKK", "EUR", "GBP",
    "HKD", "HRK", "HUF", "IDR", "ILS",
    "INR", "ISK", "JPY", "KRW", "MXN",
    "MYR", "NOK", "NZD", "PHP", "PLN",
    "RON", "RUB", "SEK", "SGD", "THB",
    "TRY", "USD", "ZAR"
];


// selectorss..

let countryContainer = document.querySelector(".main-convert-data-container");
let converterOpenrBtn = document.querySelector(".converter-icon-div");
let conveterComponent = document.querySelector(".converter-component");
let converterBody = document.querySelector(".converter-body");
let selectInp = document.getElementById("from-currency")
let fromCurrLabel = document.getElementById("from-curr-label")
let toCurrencySelect = document.getElementById("to-currency")
let toCurrLabel = document.getElementById("to-curr-label")
let outputValue = document.querySelector(".output-currency")
let inputValue = document.getElementById("user-input")
let sidebarOpener = document.getElementById("sidebar-opener");
let sideBarCloser = document.getElementById("sidebar-close-icon")
let sidebar = document.querySelector("#sidebar")


// outputValue.innerText = "hello"




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


converterOpenrBtn.addEventListener("click", () => {
    conveterComponent.style.display = "flex"
})

conveterComponent.addEventListener("click", (e) => {
    conveterComponent.style.display = "none"
})

converterBody.addEventListener("click", (e) => {
    e.stopPropagation()
})

// input change hadel....
selectInp.addEventListener("change", (e) => {
    let countryName = e.target.value
    fromCurrLabel.innerText = getFlagEmoji(countryName);
    loadCurrencyConveterApi()
})


// output handelchage

toCurrencySelect.addEventListener("change", (e) => {
    let countryName = e.target.value
    toCurrLabel.innerText = getFlagEmoji(countryName);
    loadCurrencyConveterApi()
})


// load currecyConveterapi

const loadCurrencyConveterApi = async () => {
    try {
        let fromCurrency = selectInp.value
        let toCurrency = toCurrencySelect.value

        // console.log(fromCurrency, toCurrency)

        if (fromCurrency == toCurrency) {
            outputValue.innerText = inputValue.value
            return
        } else {

            let response = await fetch(`https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`)
            // console.log(response);
            let data = await response.json()
            outputValue.innerText = (inputValue.value * data.rates[toCurrency]);
        }

    } catch (error) {
     console.error(error)
    }
}

inputValue.addEventListener("input", () => {
    loadCurrencyConveterApi()
})


const addOptions = (selectElement) => {
    currencyCodes.forEach((curr) => {
        let createOpt = document.createElement("option")
        createOpt.value = curr
        createOpt.innerText = curr
        selectElement.appendChild(createOpt)
    })
}



//hadnel sidebar open close

sidebarOpener.addEventListener("click",()=>{
   sidebar.style.right= "0"
})

sideBarCloser.addEventListener("click",()=>{
     sidebar.style.right= "-100%"
})


// get imagoji from countryName...
function getFlagEmoji(countryCode) {
    let UPPARR = [...countryCode.toUpperCase()]
    let mainArr = [UPPARR[0], UPPARR[1]]
    return mainArr.map(char => String.fromCodePoint(char.charCodeAt(0) + 127397))
        .join('');
}

// all dom loadad events 

document.addEventListener("DOMContentLoaded", () => {
    loadUSDRate()
    addOptions(selectInp)
    addOptions(toCurrencySelect)
})