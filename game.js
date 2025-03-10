document.addEventListener("DOMContentLoaded", function () {
    // Game Variables
    let bitcoinAmount = 10; // Starting with 10 BTC
    let usdAmount = 0;
    let hashRate = 0.01;
    let powerUsage = 10;
    let rigCost = 0.05;
    let securityLevel = 0;
    let poolBonus = 0;
    let bitcoinValue = 50000; // Initial Bitcoin Value
    let poolCost = 120; // Cost to join pool
    let darkWebRisk = 0;
    let prestigeCost = 2000;
    let hackerCount = 0;
    let hackerCost = 90;
    let securityUpgradeCost = 100;

    // DOM Elements
    const mineButton = document.getElementById("mineButton");
    const bitcoinAmountElement = document.getElementById("bitcoinAmount");
    const usdAmountElement = document.getElementById("usdAmount");
    const bitcoinValueElement = document.getElementById("bitcoinValue"); // New element to display Bitcoin value
    const securityLevelElement = document.getElementById("securityLevel");
    const hackerCountElement = document.getElementById("hackerCount");
    const buyHackerButton = document.getElementById("buyHackerButton");
    const darkWebButton = document.getElementById("darkWebButton");
    const upgradeSecurityButton = document.getElementById("upgradeSecurityButton");
    const playButton = document.getElementById("playButton");
    const homePage = document.getElementById("homePage");
    const gamePage = document.getElementById("gamePage");
    const joinPoolButton = document.getElementById("joinPoolButton");

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
    darkWebButton.addEventListener("click", checkDarkMarket);
    upgradeSecurityButton.addEventListener("click", upgradeSecurity);
    joinPoolButton.addEventListener("click", joinMiningPool);

    // Play Button (Page Transition)
    playButton.addEventListener("click", function () {
        homePage.style.display = "none";
        gamePage.style.display = "block";
    });

    // Update USD amount
    function updateUSD() {
        usdAmount = bitcoinAmount * bitcoinValue;
        usdAmountElement.textContent = usdAmount.toFixed(2);
        bitcoinAmountElement.textContent = bitcoinAmount.toFixed(2);
        bitcoinValueElement.textContent = bitcoinValue.toFixed(2); // Update Bitcoin value on the page
        securityLevelElement.textContent = securityLevel;
    }

    // Bitcoin Value Fluctuation (Randomize Bitcoin Value every few seconds)
    function fluctuateBitcoinValue() {
        const fluctuation = (Math.random() - 0.5) * 0.1; // Random fluctuation between -5% and +5%
        bitcoinValue += bitcoinValue * fluctuation;
        bitcoinValue = Math.max(1, bitcoinValue); // Ensure the Bitcoin value doesn't drop below 1
        updateUSD();
    }

    // Call the fluctuate function every 5 seconds
    setInterval(fluctuateBitcoinValue, 5000);

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
        popupLog.innerHTML = ''; // Clear previous messages
        popupLog.innerHTML = `<p>${message}</p>`;
        popupLog.style.display = "block";
        setTimeout(() => {
            popupLog.style.display = "none";
        }, 4000); // Hide after 4 seconds
    }

    // Random Hacker Theft Event
    function hackerSteal() {
        if (bitcoinAmount > 0 && Math.random() < 0.3) {
            let maxSteal = bitcoinAmount * 0.09;
            let stolenAmount = Math.random() * maxSteal;
            stolenAmount *= (1 - securityLevel * 0.1); // Security reduces theft
            stolenAmount = Math.max(stolenAmount, 0);

            bitcoinAmount -= stolenAmount;
            updateUSD();
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
            let lostBTC = bitcoinAmount * 0.05; 
            bitcoinAmount -= lostBTC;
            updateUSD();
            showPopup(`⚠️ You got scammed! Lost ${lostBTC.toFixed(4)} BTC.`);
        } else if (randomEvent < 0.7) {
            let gainedBTC = Math.random() * 0.1;
            bitcoinAmount += gainedBTC;
            updateUSD();
            showPopup(`💰 You made a risky trade and earned ${gainedBTC.toFixed(4)} BTC!`);
        } else if (randomEvent < 0.85) {
            let minerBoost = Math.random() * 0.05;
            hashRate += minerBoost;
            darkWebRisk += 5; 
            showPopup(`🛠️ You bought illegal miners! Hash rate +${minerBoost.toFixed(4)}, but hacker risk increased.`);
        } else {
            let lostBTC = bitcoinAmount * 0.1;
            securityLevel = Math.max(0, securityLevel - 1); 
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

    // Join Mining Pool
    function joinMiningPool() {
        if (bitcoinAmount >= poolCost) {
            bitcoinAmount -= poolCost;
            poolBonus += 5;  // Example pool bonus increase
            updateUSD();
            showPopup(`You joined a mining pool! Pool bonus increased by 5%`);
        } else {
            showPopup("❌ Not enough Bitcoin to join a pool!");
        }
    }

    // Initialize USD
    updateUSD();
});
