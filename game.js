document.getElementById("playButton").addEventListener("click", function() {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("gamePage").style.display = "block";
});

let bitcoin = 10;
let bitcoinValue = 50000;
let usdAmount = bitcoin * bitcoinValue;
let hashRate = 0.01;
let autoMineRate = 0;
let powerUsage = 10;
let rigCost = 0.05;
let securityLevel = 0;
let hackerCount = 0;
let fakeWallets = 0;

function updateDisplay() {
    document.getElementById("bitcoinAmount").innerText = bitcoin.toFixed(2);
    document.getElementById("usdAmount").innerText = (bitcoin * bitcoinValue).toFixed(2);
    document.getElementById("hashRate").innerText = hashRate.toFixed(2);
    document.getElementById("autoMineRate").innerText = autoMineRate.toFixed(2);
    document.getElementById("powerUsage").innerText = powerUsage;
    document.getElementById("rigCost").innerText = rigCost.toFixed(2);
    document.getElementById("securityLevel").innerText = securityLevel;
    document.getElementById("hackerCount").innerText = hackerCount;
}

document.getElementById("mineButton").addEventListener("click", function() {
    bitcoin += hashRate;
    updateDisplay();
});

document.getElementById("buyRigButton").addEventListener("click", function() {
    if (bitcoin >= rigCost) {
        bitcoin -= rigCost;
        hashRate *= 1.5;
        autoMineRate += hashRate / 10;
        rigCost *= 1.8;
        powerUsage += 5;
        updateDisplay();
    }
});

document.getElementById("buyHackerButton").addEventListener("click", function() {
    let hackerCost = 90;
    if (bitcoin >= hackerCost) {
        bitcoin -= hackerCost;
        hackerCount++;
        autoMineRate += 0.05;
        updateDisplay();
    }
});

document.getElementById("upgradeSecurityButton").addEventListener("click", function() {
    let securityCost = 100;
    if (bitcoin >= securityCost) {
        bitcoin -= securityCost;
        securityLevel++;
        updateDisplay();
    }
});

function autoMine() {
    bitcoin += autoMineRate;
    updateDisplay();
}
setInterval(autoMine, 1000);

function fluctuateMarket() {
    if (Math.random() < 0.1) {
        bitcoinValue *= 0.5;
        document.getElementById("marketCrashAlert").style.display = "block";
        setTimeout(() => {
            document.getElementById("marketCrashAlert").style.display = "none";
        }, 5000);
    } else {
        bitcoinValue *= 0.9 + Math.random() * 0.2;
    }
    updateDisplay();
}
setInterval(fluctuateMarket, 10000);

function hackerAttack() {
    if (Math.random() < 0.2 - securityLevel * 0.05) {
        let stolen = bitcoin * (0.05 + Math.random() * 0.1);
        bitcoin -= stolen;
        alert("Hackers stole " + stolen.toFixed(2) + " BTC!");
        updateDisplay();
    }
}
setInterval(hackerAttack, 15000);

updateDisplay();
