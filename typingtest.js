let speedTypingTestEl = document.getElementById("speedTypingTest");
let timerEl = document.getElementById("timer");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let quoteInputEl = document.getElementById("quoteInput");
let resultEl = document.getElementById("result");
let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");
let spinnerEl = document.getElementById("spinner");
let quotation = "";
let uniqueId = null;
let counter = 0;

function getRandomQuestion() {
    let options = {
        method: "GET"
    };
    speedTypingTestEl.classList.add("d-none");
    spinnerEl.classList.remove("d-none");
    fetch("https://apis.ccbp.in/random-quote", options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            speedTypingTestEl.classList.remove("d-none");
            spinnerEl.classList.add("d-none");
            quotation = jsonData.content;
            quoteDisplayEl.textContent = jsonData.content;
            //console.log(jsonData.content);
        });

    uniqueId = setInterval(function() {
        counter = counter + 1;
        timerEl.textContent = counter;
    }, 1000);
}
submitBtnEl.addEventListener("click", function() {
    if (quoteInputEl.value === quotation) {
        clearInterval(uniqueId);
        resultEl.textContent = "You typed in " + counter + " seconds";
    } else {
        resultEl.textContent = "You typed incorrect sentence";
    }
});
resetBtnEl.addEventListener("click", function() {
    clearInterval(uniqueId);
    quoteInputEl.value = "";
    counter = 0;
    resultEl.textContent = "";
    timerEl.textContent = 0;
    getRandomQuestion();

})
getRandomQuestion();