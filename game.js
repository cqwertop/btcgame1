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
    let prestigeCost = 1000;
    let hackerCount = 0;
    let hackerCost = 90;
    let securityUpgradeCost = 5;
    let fakeWallets = 0;
    let ransomwareEnabled = false;
    let ddosProtectionActive = false;

    // DOM Elements
    const mineButton = document.getElementById("mineButton");
    const bitcoinAmountElement = document.getElementById("bitcoinAmount");
    const usdAmountElement = document.getElementById("usdAmount");
    const securityLevelElement = document.getElementById("securityLevel");
    const hackerCountElement = document.getElementById("hackerCount");
    const buyHackerButton = document.getElementById("buyHackerButton");
    const joinPoolButton = document.getElementById("joinPoolButton");
    const buyFakeWalletButton = document.getElementById("buyFakeWalletButton");
    const enableRansomwareButton = document.getElementById("enableRansomwareButton");
    const enableDDoSProtectionButton = document.getElementById("enableDDoSProtectionButton");
    const prestigeButton = document.getElementById("prestigeButton");
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
    joinPoolButton.addEventListener("click", joinMiningPool);
    buyFakeWalletButton.addEventListener("click", buyFakeWallet);
    enableRansomwareButton.addEventListener("click", enableRansomware);
    enableDDoSProtectionButton.addEventListener("click", enableDDoSProtection);
    prestigeButton.addEventListener("click", prestige);

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

    // Join Mining Pool
    function joinMiningPool() {
        if (bitcoinAmount >= poolCost) {
            bitcoinAmount -= poolCost;
            poolBonus += 5; // Increase pool bonus by 5%
            updateUSD();
            showPopup("💎 You joined a mining pool! Pool bonus increased.");
        } else {
            showPopup("❌ Not enough Bitcoin to join a mining pool!");
        }
    }

    // Buy Fake Wallet
    function buyFakeWallet() {
        if (bitcoinAmount >= 50) {
            bitcoinAmount -= 50;
            fakeWallets++;
            updateUSD();
            showPopup(`🛡️ You bought a fake wallet! Fake wallets: ${fakeWallets}`);
        } else {
            showPopup("❌ Not enough Bitcoin to buy a fake wallet!");
        }
    }

    // Enable Ransomware
    function enableRansomware() {
        if (bitcoinAmount >= 200) {
            bitcoinAmount -= 200;
            ransomwareEnabled = true;
            showPopup("💣 Ransomware enabled! Your risk of losing Bitcoin is now higher.");
        } else {
            showPopup("❌ Not enough Bitcoin to enable ransomware!");
        }
    }

    // Enable DDoS Protection
    function enableDDoSProtection() {
        if (bitcoinAmount >= 150) {
            bitcoinAmount -= 150;
            ddosProtectionActive = true;
            showPopup("🛡️ DDoS protection activated! Your mining rate is safe.");
        } else {
            showPopup("❌ Not enough Bitcoin to enable DDoS protection!");
        }
    }

    // Prestige
    function prestige() {
        if (bitcoinAmount >= prestigeCost) {
            bitcoinAmount = 0;
            poolBonus = 0;
            securityLevel = 0;
            hackerCount = 0;
            fakeWallets = 0;
            ransomwareEnabled = false;
            ddosProtectionActive = false;
            updateUSD();
            showPopup("🎉 You've prestiged! All your progress has reset for permanent bonuses.");
        } else {
            showPopup("❌ Not enough Bitcoin to prestige!");
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

    // Initialize USD
    updateUSD();
});
