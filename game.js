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
    let poolCost = 200 ;
    let darkWebRisk = 0;
    let prestigeCost = 2000;
    let hackerCount = 0;
    let hackerCost = 50;
    let securityUpgradeCost = 100;

    // DOM Elements
    const mineButton = document.getElementById("mineButton");
    const bitcoinAmountElement = document.getElementById("bitcoinAmount");
    const usdAmountElement = document.getElementById("usdAmount");
    const securityLevelElement = document.getElementById("securityLevel");
    const hackerCountElement = document.getElementById("hackerCount");
    const buyHackerButton = document.getElementById("buyHackerButton");
    const checkDarkMarketButton = document.getElementById("checkDarkMarketButton");
    const upgradeSecurityButton = document.getElementById("upgradeSecurityButton");
    const playButton = document.getElementById("playButton");
    const homePage = document.getElementById("homePage");
    const gamePage = document.getElementById("gamePage");

    // Popup Log Box
    const popupLog = document.createElement("div");
    popupLog.id = "popupLog";
    popupLog.style.position = "fixed";
    popupLog.style.bottom = "10px";
    popupLog.style.right = "10px";
    popupLog.style.background = "rgba(0, 0, 0, 0.8)";
    popupLog.style.color = "white";
    popupLog.style.padding = "10px";
    popupLog.style.borderRadius = "8px";
    popupLog.style.display = "none";
    document.body.appendChild(popupLog);

    // Event Listeners
    mineButton.addEventListener("click", mineBitcoin);
    buyHackerButton.addEventListener("click", buyHacker);
    checkDarkMarketButton.addEventListener("click", checkDarkMarket);
    upgradeSecurityButton.addEventListener("click", upgradeSecurity);

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
        securityLevelElement.textContent = securityLevel;
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
            showPopup("❌ Not enough Bitcoin to buy a hacker!");
        }
    }

    // Show a popup message
    function showPopup(message) {
        popupLog.innerHTML = `<p>${message}</p>`;
        popupLog.style.display = "block";
        setTimeout(() => {
            popupLog.style.display = "none";
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

    // Check Dark Market (New Events Added)
    function checkDarkMarket() {
        let randomEvent = Math.random();
        if (randomEvent < 0.3) {
            showPopup("🕵️ You found a shady deal but decided to walk away...");
        } else if (randomEvent < 0.5) {
            let lostBTC = bitcoinAmount * 0.05; // Lose 5% of BTC
            bitcoinAmount -= lostBTC;
            updateUSD();
            showPopup(`⚠️ You got scammed! Lost ${lostBTC.toFixed(4)} BTC.`);
        } else if (randomEvent < 0.7) {
            let gainedBTC = Math.random() * 0.1; // Gain up to 0.1 BTC
            bitcoinAmount += gainedBTC;
            updateUSD();
            showPopup(`💰 You made a risky trade and earned ${gainedBTC.toFixed(4)} BTC!`);
        } else if (randomEvent < 0.85) {
            let minerBoost = Math.random() * 0.05; // Increase hash rate
            hashRate += minerBoost;
            darkWebRisk += 5; // Increase hacker risk
            showPopup(`🛠️ You bought illegal miners! Hash rate +${minerBoost.toFixed(4)}, but hacker risk increased.`);
        } else {
            let lostBTC = bitcoinAmount * 0.1; // Lose 10% of BTC
            securityLevel = Math.max(0, securityLevel - 1); // Reduce security
            bitcoinAmount -= lostBTC;
            updateUSD();
            showPopup(`🚨 Government raid! Lost ${lostBTC.toFixed(4)} BTC and security level dropped.`);
        }
    }

    // Upgrade Security
    function upgradeSecurity() {
        if (bitcoinAmount >= securityUpgradeCost) {
            bitcoinAmount -= securityUpgradeCost;
            securityLevel++;
            updateUSD();
            showPopup(`🛡️ Security upgraded! Level ${securityLevel}`);
        } else {
            showPopup("❌ Not enough Bitcoin to upgrade security!");
        }
    }

    // Initialize USD
    updateUSD();
});
