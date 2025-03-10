document.addEventListener("DOMContentLoaded", function () {
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
    const playButton = document.getElementById("playButton");
    const homePage = document.getElementById("homePage");
    const gamePage = document.getElementById("gamePage");

    // Create a hacker theft log
    const hackerLogElement = document.createElement("div");
    hackerLogElement.id = "hackerLog";
    hackerLogElement.style.position = "fixed";
    hackerLogElement.style.bottom = "10px";
    hackerLogElement.style.right = "10px";
    hackerLogElement.style.background = "rgba(0, 0, 0, 0.8)";
    hackerLogElement.style.color = "white";
    hackerLogElement.style.padding = "10px";
    hackerLogElement.style.borderRadius = "8px";
    hackerLogElement.style.display = "none"; // Initially hidden
    document.body.appendChild(hackerLogElement);

    // Event Listeners
    mineButton.addEventListener("click", mineBitcoin);
    buyHackerButton.addEventListener("click", buyHacker);

    // Play Button (Fixing the Page Transition)
    playButton.addEventListener("click", function () {
        homePage.style.display = "none";
        gamePage.style.display = "block";
    });

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
            alert("❌ Not enough Bitcoin to buy a hacker!");
        }
    }

    // Show a popup message
    function showPopup(message) {
        hackerLogElement.innerHTML = `<p>${message}</p>`;
        hackerLogElement.style.display = "block";
        setTimeout(() => {
            hackerLogElement.style.display = "none";
        }, 4000); // Hide after 4 seconds
    }

    // Random Hacker Theft Event
    function hackerSteal() {
        if (bitcoinAmount > 0 && Math.random() < 0.3) { // 30% chance
            let maxSteal = bitcoinAmount * 0.09; // Up to 9% stolen
            let stolenAmount = Math.random() * maxSteal;

            // Reduce theft based on security level (each level reduces by 10%)
            stolenAmount *= (1 - securityLevel * 0.1);
            stolenAmount = Math.max(stolenAmount, 0);

            bitcoinAmount -= stolenAmount;
            updateUSD();

            // Show a popup alert
            showPopup(`💀 A hacker stole ${stolenAmount.toFixed(4)} BTC!`);
        }
    }

    // Run hacker theft every 10 seconds
    setInterval(hackerSteal, 10000);

    // Initialize USD
    updateUSD();
});
