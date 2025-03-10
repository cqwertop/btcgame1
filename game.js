// Game Variables
let bitcoinAmount = 0;
let usdAmount = 0;
let hashRate = 0.01;
let powerUsage = 10;
let rigCost = 0.05;
let securityLevel = 0;
let poolBonus = 0;
let bitcoinValue = 50000;
let poolCost = 120;
let darkWebRisk = 0;
let prestigeCost = 2000;
let hackerCount = 0;
let hackerCost = 100;

// DOM Elements
const mineButton = document.getElementById("mineButton");
const bitcoinAmountElement = document.getElementById("bitcoinAmount");
const usdAmountElement = document.getElementById("usdAmount");
const securityLevelElement = document.getElementById("securityLevel");
const hackerCountElement = document.getElementById("hackerCount");
const buyHackerButton = document.getElementById("buyHackerButton");
const hackerLogElement = document.createElement("div"); // Create a log for hacker events

// Add the hacker log to the page
hackerLogElement.id = "hackerLog";
document.body.appendChild(hackerLogElement);

// Event Listeners
mineButton.addEventListener("click", mineBitcoin);
buyHackerButton.addEventListener("click", buyHacker);

// Update USD amount
function updateUSD() {
    usdAmount = bitcoinAmount * bitcoinValue;
    usdAmountElement.textContent = usdAmount.toFixed(2);
    bitcoinAmountElement.textContent = bitcoinAmount.toFixed(2);
}

// Mining Logic
function mineBitcoin() {
    bitcoinAmount += (hashRate * (0.01 + poolBonus / 100));
    updateUSD();
}

// Buy Hacker
function buyHacker() {
    if (bitcoinAmount >= hackerCost) {
        bitcoinAmount -= hackerCost;
        hackerCount++;
        hackerCountElement.textContent = hackerCount;
        updateUSD();
    } else {
        alert("Not enough Bitcoin to buy a hacker!");
    }
}

// Random Hacker Theft Event
function hackerSteal() {
    if (bitcoinAmount > 0 && Math.random() < 0.3) { // Increased to 30% chance
        let maxSteal = bitcoinAmount * 0.09; // Up to 9% stolen
        let stolenAmount = Math.random() * maxSteal;

        // Reduce theft based on security level (each level reduces by 10%)
        stolenAmount *= (1 - securityLevel * 0.1);
        stolenAmount = Math.max(stolenAmount, 0); // Ensure not negative

        bitcoinAmount -= stolenAmount;
        updateUSD();

        // Log the theft event
        hackerLogElement.innerHTML += `<p>💀 A hacker stole ${stolenAmount.toFixed(2)} BTC!</p>`;
    }
}

// Run hacker theft every 10 seconds (for testing)
setInterval(hackerSteal, 10000);

// Initialize USD
updateUSD();
