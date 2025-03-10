document.addEventListener("DOMContentLoaded", function () {
    // Game Variables
    let bitcoinAmount = 10; // Starting with 10 BTC
    let usdAmount = 0;
    let hashRate = 0.01;
    let powerUsage = 10;
    let rigCost = 0.05;
    let securityLevel = 0;
    let poolBonus = 0;
    let bitcoinValue = 50000;
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
   
