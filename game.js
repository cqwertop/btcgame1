document.addEventListener("DOMContentLoaded", function () {
    // Play button event listener
    document.getElementById("playButton").addEventListener("click", function () {
        document.getElementById("homePage").style.display = "none";  // Hide home page
        document.getElementById("gamePage").style.display = "block"; // Show game page
    });

    // Game variables
    let bitcoin = 10;
    let bitcoinPrice = 50000;
    let usd = bitcoin * bitcoinPrice;
    let hashRate = 0.01;
    let autoMineRate = 0;
    let powerUsage = 10;
    let rigCost = 0.05;
    let securityLevel = 0;
    let hackerCount = 0;
    let poolBonus = 0;

    // Update UI
    function updateUI() {
        document.getElementById("bitcoinAmount").innerText = bitcoin.toFixed(2);
        document.getElementById("usdAmount").innerText = usd.toFixed(2);
        document.getElementById("bitcoinValue").innerText = bitcoinPrice.toFixed(2);
        document.getElementById("hashRate").innerText = hashRate.toFixed(2);
        document.getElementById("autoMineRate").innerText = autoMineRate.toFixed(2);
        document.getElementById("powerUsage").innerText = powerUsage.toFixed(2);
        document.getElementById("rigCost").innerText = rigCost.toFixed(2);
        document.getElementById("securityLevel").innerText = securityLevel;
        document.getElementById("hackerCount").innerText = hackerCount;
        document.getElementById("poolBonus").innerText = poolBonus;
    }

    // Mining Button
    document.getElementById("mineButton").addEventListener("click", function () {
        bitcoin += hashRate;
        usd = bitcoin * bitcoinPrice;
        updateUI();
    });

    // Upgrade Rig
    document.getElementById("buyRigButton").addEventListener("click", function () {
        if (bitcoin >= rigCost) {
            bitcoin -= rigCost;
            hashRate *= 1.5;
            rigCost *= 2;
            updateUI();
        }
    });

    // Auto-Mining (Passive Income)
    setInterval(function () {
        bitcoin += autoMineRate;
        usd = bitcoin * bitcoinPrice;
        updateUI();
    }, 1000);

    // Market Crash Event
    setInterval(function () {
        if (Math.random() < 0.1) { // 10% chance of crash
            bitcoinPrice *= 0.7; // Drops by 30%
            usd = bitcoin * bitcoinPrice;
            document.getElementById("marketCrashAlert").style.display = "block";
            setTimeout(() => {
                document.getElementById("marketCrashAlert").style.display = "none";
            }, 5000);
            updateUI();
        }
    }, 20000);

    updateUI();
});
