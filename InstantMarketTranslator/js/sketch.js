let rate1 = document.querySelector(".rate1");
let rate2 = document.querySelector(".rate2");
let resultBtn = document.querySelector(".result");
let selects = document.querySelectorAll(".options select");
let sel1 = selects[0];
let sel2 = selects[1];
let inputs = document.querySelectorAll(".input input");
let inpt1 = inputs[0];
let inpt2 = inputs[1];

let rates = {};
let access_key = 'fca_live_4hHRrOqFtyOt7fNK3A2rM3zMU7yHlsjthp9jxgDu';
let requestURL = `https://api.freecurrencyapi.com/v1/latest?apikey=${access_key}`;

fetchRates();

async function fetchRates() {
    try {
        let res = await fetch(requestURL);
        let data = await res.json();
        if (data.data) {
            rates = data.data;
            populateOptions();
        } else {
            console.error("Error fetching rates:", data);
        }
    } catch (error) {
        console.error("Error fetching rates:", error);
    }
}

function populateOptions() {
    let val = "";
    Object.keys(rates).forEach(code => {
        let str = `<option value="${code}">${code}</option>`;
        val += str;
    });
    selects.forEach(s => (s.innerHTML = val));
    displayRate(); // Display the initial rate after options are populated
}

function convert(val, fromCurr, toCurr) {
    if (rates[fromCurr] && rates[toCurr]) {
        let v = (val / rates[fromCurr]) * rates[toCurr];
        let v1 = v.toFixed(3);
        return v1 == 0.0 ? v.toFixed(5) : v1;
    } else {
        return 0;
    }
}

function displayRate() {
    let v1 = sel1.value;
    let v2 = sel2.value;
    let val = convert(1, v1, v2);
    rate1.innerHTML = `1 ${v1} equals`;
    rate2.innerHTML = `${val} ${v2}`;
}

resultBtn.addEventListener("click", () => {
    let fromCurr = sel1.value;
    let fromVal = parseFloat(inpt1.value);
    let toCurr = sel2.value;

    if (isNaN(fromVal)) {
        alert("Please enter a number");
    } else {
        let cVal = convert(fromVal, fromCurr, toCurr);
        inpt2.value = cVal;
    }
});

selects.forEach(s => s.addEventListener("change", displayRate));

document.querySelector(".swap").addEventListener("click", () => {
    let in1 = inpt1.value;
    let in2 = inpt2.value;
    let op1 = sel1.value;
    let op2 = sel2.value;

    inpt2.value = in1;
    inpt1.value = in2;

    sel2.value = op1;
    sel1.value = op2;

    displayRate();
});
