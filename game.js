console.log("game.js is loaded!");

document.addEventListener("DOMContentLoaded", function () {
    let bitcoin = 10;
    let bitcoinPrice = 50000;
    let usd = bitcoin * bitcoinPrice;
    let hashRate = 0.01; // BTC per click
    let autoMineRate = 0; // BTC per second
    let powerUsage = 10; // kWh
    let rigCost = 0.05; // BTC

    const bitcoinAmountEl = document.getElementById("bitcoinAmount");
    const usdAmountEl = document.getElementById("usdAmount");
    const bitcoinValueEl = document.getElementById("bitcoinValue");
    const mineButton = document.getElementById("mineButton");
    const buyRigButton = document.getElementById("buyRigButton");
    const hashRateEl = document.getElementById("hashRate");
    const autoMineRateEl = document.getElementById("autoMineRate");
    const powerUsageEl = document.getElementById("powerUsage");
    const rigCostEl = document.getElementById("rigCost");

    function updateUI() {
        bitcoinAmountEl.textContent = bitcoin.toFixed(2);
        usdAmountEl.textContent = (bitcoin * bitcoinPrice).toFixed(2);
        bitcoinValueEl.textContent = bitcoinPrice.toFixed(2);
        hashRateEl.textContent = hashRate.toFixed(2);
        autoMineRateEl.textContent = autoMineRate.toFixed(2);
        powerUsageEl.textContent = powerUsage.toFixed(0);
        rigCostEl.textContent = rigCost.toFixed(2);
    }

    mineButton.addEventListener("click", function () {
        bitcoin += hashRate;
        updateUI();
    });

    buyRigButton.addEventListener("click", function () {
        if (bitcoin >= rigCost) {
            bitcoin -= rigCost;
            hashRate += 0.01; // Increase mining efficiency
            autoMineRate += 0.005; // Increase auto-mining rate
            powerUsage += 5; // Increase power consumption
            rigCost *= 1.5; // Increase rig upgrade cost
            updateUI();
        } else {
            alert("Not enough BTC to upgrade rig!");
        }
    });

    // Auto-Mining Feature
    setInterval(function () {
        bitcoin += autoMineRate;
        updateUI();
    }, 1000);

    updateUI();
});
