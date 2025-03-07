// Game Variables
let bitcoinAmount = 0;
let hashRate = 1;
let powerUsage = 10;
let rigCost = 100;
let securityLevel = 0;
let poolBonus = 0;
let bitcoinValue = 50000;
let poolCost = 200;
let darkWebRisk = 0;
let prestigeCost = 200000000000000;
let marketFluctuationInterval = 2500; // Market updates every 5 seconds

// DOM Elements
const mineButton = document.getElementById("mineButton");
const bitcoinAmountElement = document.getElementById("bitcoinAmount");
const hashRateElement = document.getElementById("hashRate");
const powerUsageElement = document.getElementById("powerUsage");
const rigCostElement = document.getElementById("rigCost");
const securityLevelElement = document.getElementById("securityLevel");
const poolBonusElement = document.getElementById("poolBonus");
const bitcoinValueElement = document.getElementById("bitcoinValue");
const buyRigButton = document.getElementById("buyRigButton");
const buySecurityButton = document.getElementById("buySecurityButton");
const joinPoolButton = document.getElementById("joinPoolButton");
const darkWebButton = document.getElementById("darkWebButton");
const prestigeButton = document.getElementById("prestigeButton");

// Event Listeners
mineButton.addEventListener("click", mineBitcoin);
buyRigButton.addEventListener("click", upgradeRig);
buySecurityButton.addEventListener("click", buySecurity);
joinPoolButton.addEventListener("click", joinPool);
darkWebButton.addEventListener("click", checkDarkWeb);
prestigeButton.addEventListener("click", prestige);

// Mining Logic
function mineBitcoin() {
    if (bitcoinAmount < powerUsage) {
        alert("Not enough Bitcoin to run all rigs due to power consumption!");
        return;
    }
    bitcoinAmount += (hashRate * (1 + poolBonus / 100));
    bitcoinAmountElement.textContent = bitcoinAmount.toFixed(2);
}

// Upgrade Rig Logic
function upgradeRig() {
    if (bitcoinAmount >= rigCost) {
        bitcoinAmount -= rigCost;
        hashRate += 2; // Increase hash rate by 2
        powerUsage += 5; // Increase power usage with each upgrade
        rigCost *= 1.5; // Increase cost for the next upgrade
        hashRateElement.textContent = hashRate;
        powerUsageElement.textContent = powerUsage;
        rigCostElement.textContent = rigCost.toFixed(2);
        bitcoinAmountElement.textContent = bitcoinAmount.toFixed(2);
    } else {
        alert("Not enough Bitcoin to upgrade!");
    }
}

// Buy Security Logic
function buySecurity() {
    if (bitcoinAmount >= 50) {
        bitcoinAmount -= 50;
        securityLevel += 1;
        securityLevelElement.textContent = securityLevel;
        bitcoinAmountElement.textContent = bitcoinAmount.toFixed(2);
    } else {
        alert("Not enough Bitcoin for security upgrade!");
    }
}

// Join Mining Pool Logic
function joinPool() {
    if (bitcoinAmount >= poolCost) {
        bitcoinAmount -= poolCost;
        poolBonus += 10; // Increase pool bonus by 10%
        poolBonusElement.textContent = poolBonus;
        bitcoinAmountElement.textContent = bitcoinAmount.toFixed(2);
    } else {
        alert("Not enough Bitcoin to join the pool!");
    }
}

// Dark Web Market Logic
function checkDarkWeb() {
    const riskChance = Math.random();
    if (riskChance < 0.5) {
        // Successful dark web deal
        bitcoinAmount += 100; // Boost bitcoin by 100
        alert("You successfully bought a boost from the Dark Web!");
    } else {
        // Risk of losing money
        bitcoinAmount -= 50; // Lose 50 BTC
        alert("The Dark Web deal was a scam! You lost some Bitcoin.");
    }
    bitcoinAmountElement.textContent = bitcoinAmount.toFixed(2);
}

// Prestige System
function prestige() {
    if (bitcoinAmount >= prestigeCost) {
        bitcoinAmount -= prestigeCost;
        hashRate = 1; // Reset hash rate
        powerUsage = 10; // Reset power usage
        securityLevel = 0; // Reset security
        poolBonus = 0; // Reset pool bonus
        rigCost = 100; // Reset rig cost
        prestigeCost *= 2; // Increase prestige cost for next time
        alert("You have forked a new project! You start with new bonuses.");
        bitcoinAmountElement.textContent = bitcoinAmount.toFixed(2);
    } else {
        alert("Not enough Bitcoin for prestige!");
    }
}

// Market Fluctuation
function fluctuateMarket() {
    bitcoinValue = Math.floor(Math.random() * 100000) + 20000; // Bitcoin value fluctuates between 20,000 and 120,000 USD
    bitcoinValueElement.textContent = bitcoinValue;
}

// Start market fluctuation
setInterval(fluctuateMarket, marketFluctuationInterval);
