document.addEventListener("DOMContentLoaded", function () {
    // Game Variables
    let bitcoinAmount = 10;
    let usdAmount = 0;
    let hashRate = 0.01;
    let bitcoinValue = 50000;
    let securityLevel = 0;
    let hackerCount = 0;
    let poolBonus = 0;
    let achievements = [];

    // DOM Elements
    const mineButton = document.getElementById("mineButton");
    const bitcoinAmountElement = document.getElementById("bitcoinAmount");
    const usdAmountElement = document.getElementById("usdAmount");
    const bitcoinValueElement = document.getElementById("bitcoinValue");
    const securityLevelElement = document.getElementById("securityLevel");
    const hackerCountElement = document.getElementById("hackerCount");
    const achievementsList = document.getElementById("achievementsList");
    const playButton = document.getElementById("playButton");
    const homePage = document.getElementById("homePage");
    const gamePage = document.getElementById("gamePage");

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
        bitcoinValueElement.textContent = bitcoinValue.toFixed(2);
        securityLevelElement.textContent = securityLevel;
        hackerCountElement.textContent = hackerCount;
        checkAchievements();
    }

    // Mining Logic
    function mineBitcoin() {
        bitcoinAmount += (hashRate * (0.01 + poolBonus / 100));
        updateUSD();
    }

    // Add Achievement
    function addAchievement(name) {
        if (!achievements.includes(name)) {
            achievements.push(name);
            const listItem = document.createElement("li");
            listItem.textContent = `🏆 ${name}`;
            achievementsList.appendChild(listItem);
        }
    }

    // Check Achievements
    function checkAchievements() {
        if (bitcoinAmount >= 10) addAchievement("First 10 BTC Mined!");
        if (bitcoinAmount >= 100) addAchievement("Bitcoin Millionaire!");
        if (hackerCount >= 1) addAchievement("Hacker Acquired!");
        if (securityLevel >= 5) addAchievement("Cybersecurity Expert!");
    }

    // Bitcoin Value Fluctuation
    function fluctuateBitcoinValue() {
        const fluctuation = (Math.random() - 0.5) * 0.1;
        bitcoinValue += bitcoinValue * fluctuation;
        bitcoinValue = Math.max(1, bitcoinValue);
        updateUSD();
    }
    setInterval(fluctuateBitcoinValue, 5000);

    // Event Listeners
    mineButton.addEventListener("click", mineBitcoin);

    // Initialize
    updateUSD();
});
