const Base_URL =   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

console.log(dropdown);

for(let select of dropdown){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" &&  currCode  === "USD"){
            newOption.selected =  "selected";
        }else if(select.name === "to" &&      currCode  === "INR"){
            newOption.selected =  "selected";
        }

        select.append(newOption);
    }
    select.addEventListener("change", (evt)  => {
        updateFlag(evt.target);
    });
}

const updateExchangeRate =async () =>{
    let amount = document.querySelector(".amount input");
    let amtval =  amount.value;
    if(amtval === "" || amtval < 1){
        amtval = 1;
        amount.value = "1";
    }

    const URL = `https://api.exchangerate-api.com/v4/latest/${fromCurr.value}`;
    let responce = await fetch(URL);
    let data = await responce.json();
    let rate = data.rates[toCurr.value];
    if (!rate) {
        throw new Error("Invalid exchange rate data");
      }
    let finalAmount = amtval*rate;
    msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};


const updateFlag = (Element) => {
    let currCode = Element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = Element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt) =>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});