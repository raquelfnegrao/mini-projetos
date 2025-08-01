let form = document.getElementById("converterForm")
let amount = document.getElementById("amount")
let fromCurrency = document.getElementById("fromCurrency")
let toCurrency = document.getElementById("toCurrency")
let convertedAmount = document.getElementById("convertedAmount")
let loading = document.querySelector(".loading")
let result = document.querySelector(".result")
let error = document.querySelector(".error")
let converterBtn = document.querySelector(".converterBtn")

const API_URL = "https://api.exchangerate-api.com/v4/latest/"

async function convertMoney (){

    loading.style.display = "block"
    result.style.display = "none"
    error.style.display = "none"

    try{
        const response = await fetch(API_URL + fromCurrency.value)
        const data = await  response.json()

        const rate = data.rates[toCurrency.value]
        const convertedValue = (amount.value * rate).toFixed(2)

        convertedAmount.value = convertedValue
        result.style.display = "block"    

        result.innerHTML = `
             <div style="font-size: 1.4rem">
                ${amount.value} ${fromCurrency.value} = ${convertedAmount.value} ${toCurrency.value}
             </div> 
             <div style="font-size: 0.8rem; margin-top: 10px">
                Taxa: 1 ${fromCurrency.value} = ${rate} ${toCurrency.value}
             </div>
             `
    }
    catch(err){
        error.style.display = "block"
        error.innerHTML = `Falha ao tentar encontrar servidor`
    }
    loading.style.display = "none"
}


form.addEventListener("submit", function(event) {
    event.preventDefault()
    convertMoney()
})