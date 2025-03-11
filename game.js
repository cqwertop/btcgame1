document.addEventListener("DOMContentLoaded", function () {
    // Game Variables
    let bitcoinAmount = 10;
    let usdAmount = 0;
    let hashRate = 0.01;
    let autoMineRate = 0;
    let bitcoinValue = 50000;
    let securityLevel = 0;
    let hackerCount = 0;
    let poolBonus = 0;
    let powerUsage = 10;
    let rigLevel = 1;
    let rigCost = 0.05;
    let achievements = [];

    // DOM Elements
    const mineButton = document.getElementById("mineButton");
    const bitcoinAmountElement = document.getElementById("bitcoinAmount");
    const usdAmountElement = document.getElementById("usdAmount");
    const bitcoinValueElement = document.getElementById("bitcoinValue");
    const securityLevelElement = document.getElementById("securityLevel");
    const hackerCountElement = document.getElementById("hackerCount");
    const autoMineRateElement = document.getElementById("autoMineRate");
    const hashRateElement = document.getElementById("hashRate");
    const powerUsageElement = document.getElementById("powerUsage");
    const rigCostElement = document.getElementById("rigCost");
    const buyRigButton = document.getElementById("buyRigButton");
    const achievementsList = document.getElementById("achievementsList");
    const marketCrashAlert = document.getElementById("marketCrashAlert");

    // Update USD amount
    function updateUSD() {
        usdAmount = bitcoinAmount * bitcoinValue;
        usdAmountElement.textContent = usdAmount.toFixed(2);
        bitcoinAmountElement.textContent = bitcoinAmount.toFixed(2);
        bitcoinValueElement.textContent = bitcoinValue.toFixed(2);
        securityLevelElement.textContent = securityLevel;
        hackerCountElement.textContent = hackerCount;
        autoMineRateElement.textContent = autoMineRate.toFixed(3);
        hashRateElement.textContent = hashRate.toFixed(3);
        powerUsageElement.textContent = powerUsage.toFixed(1);
        rigCostElement.textContent = rigCost.toFixed(3);
        checkAchievements();
    }

    // Mining Logic
    function mineBitcoin() {
        let efficiency = 1 - powerUsage / 1000;
        if (efficiency < 0.1) efficiency = 0.1;
        bitcoinAmount += hashRate * efficiency;
        updateUSD();
    }

    // Auto-Mining (Passive Income)
    function autoMineBitcoin() {
        let efficiency = 1 - powerUsage / 1000;
        if (efficiency < 0.1) efficiency = 0.1;
        bitcoinAmount += autoMineRate * efficiency;
        updateUSD();
    }
    setInterval(autoMineBitcoin, 1000);

    // Upgrade Mining Rig
    function upgradeRig() {
        if (bitcoinAmount >= rigCost) {
            bitcoinAmount -= rigCost;
            rigLevel++;
            hashRate *= 1.5; // Increase mining speed
            autoMineRate += 0.005 * rigLevel; // Increase passive income
            powerUsage += 5; // More power consumption
            rigCost *= 1.8; // Increase cost exponentially
            updateUSD();
        }
    }
    buyRigButton.addEventListener("click", upgradeRig);

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
        if (autoMineRate > 0.1) addAchievement("Automated Mining!");
        if (rigLevel >= 5) addAchievement("Mining Tycoon!");
    }

    // Bitcoin Value Fluctuation
    function fluctuateBitcoinValue() {
        const fluctuation = (Math.random() - 0.5) * 0.1;
        bitcoinValue += bitcoinValue * fluctuation;
        bitcoinValue = Math.max(1, bitcoinValue);
        updateUSD();
    }
    setInterval(fluctuateBitcoinValue, 5000);

    // Random Market Crash
    function marketCrash() {
        if (Math.random() < 0.1) {
            bitcoinValue *= 0.6;  // 40% drop
            marketCrashAlert.style.display = "block";
            setTimeout(() => { marketCrashAlert.style.display = "none"; }, 5000);
            updateUSD();
        }
    }
    setInterval(marketCrash, 20000);

    // Event Listeners
    mineButton.addEventListener("click", mineBitcoin);

    // Initialize
    updateUSD();
});
