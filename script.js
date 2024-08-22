const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg")

for (let select of dropdowns) {
    for (let currencyCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        if (select.name === "from" && currencyCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currencyCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    console.log(`Updating flag for ${currencyCode} to ${newSrc}`); // Debugging log
    let img = element.parentElement.querySelector("img");
    if (img) {
        img.src = newSrc;
    } else {
        console.error("Image element not found");
    }
};

btn.addEventListener("click", async  (evt)=>{
    evt.preventDefault();//it is for to not refresh the page
    let amount=document.querySelector(".amount input");
        let amtVal=amount.value;
        if(amount.value === "" || amtVal < 1 ){
            amtVal=1;
            amount.value="1";
        }

        
        const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
        console.log(`Fetching data from: ${URL}`); // Debugging log
        try {
            let response = await fetch(URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let data = await response.json();
            console.log("API response:", data); // Debugging log
            let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
            console.log(`Exchange rate: ${rate}`); // Debugging log
            let finalAmount = amtVal * rate;
            msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
        } catch (error) {
            console.error("Error fetching the exchange rate:", error);
            msg.innerText = "Failed to fetch exchange rate. Please try again later.";
        }
    });
    



