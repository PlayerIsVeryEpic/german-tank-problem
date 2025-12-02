const freq = document.getElementById('freq')
const baye = document.getElementById('baye')
const count = document.getElementById('total')

const freqFormTop = document.getElementById('freqFormTop')
const freqFormBot = document.getElementById('freqFormBot')
const bayeFormTop = document.getElementById('bayeFormTop')
const bayeFormBot = document.getElementById('bayeFormBot')

const freqConst = document.getElementById('freqConst')
const bayeConst = document.getElementById('bayeConst')
const observedList = document.getElementById('list')


var numTanks = 0
var tankArray = []
var observedArray = []
var tankNumber = 0
var highestNumber = 0
var frequentialTotal = 0
var bayesianTotal = 0
var observedTankCount = 0
var observedString = ""

function generate() { // generates a random serial number
    if (tankArray.length == 0) {
        return
    }
    var num = Math.floor(tankArray.length * Math.random())
    tankNumber = tankArray[num]
    observedArray.push(tankNumber)
    if (observedArray.length == 1) {
        observedString += tankNumber
    } else {
        observedString += ", " + tankNumber
    }
    tankArray.splice(num, 1)
    update()
}

function tankCount() { // bootup code
    numTanks = Math.floor(100 + (101 * Math.random()));
    count.textContent = numTanks;
    while (numTanks > 0) {
        tankArray.push(numTanks)
        numTanks -= 1
    };
    console.log(tankArray)
}

function update() { // updates all labels
    if (tankNumber > highestNumber) {
        highestNumber = tankNumber
    }
    console.log(highestNumber)
    calculations()
    labelUpdate()
}

function labelUpdate() {
    // final answers
    freq.textContent = Math.round(frequentialTotal);
    baye.innerText = Math.round(bayesianTotal);
    observedList.textContent = observedString

    // formula updates
    freqFormTop.textContent = highestNumber + " - " + observedTankCount
    freqFormBot.textContent = observedTankCount
    freqConst.textContent = highestNumber + " + "
    
    if ((observedTankCount - 2) > 0) {
        bayeFormTop.textContent = observedTankCount + " - " + 1
        bayeFormBot.textContent = observedTankCount + " - " + 2
        bayeConst.textContent = "(" + highestNumber + " - " + " 1 " + ")" + " * "
    }
}

function calculations() { // calculations for final answer
    observedTankCount = observedArray.length
    frequentialTotal = highestNumber + (highestNumber - observedTankCount) / observedTankCount

    if ((observedTankCount - 2) > 0) {
        bayesianTotal = (highestNumber - 1) * ((observedTankCount - 1) / (observedTankCount - 2))
    } else {
        bayesianTotal = "not enough data"
    }
}

function reset() {
    numTanks = 0
    tankArray = []
    observedArray = []
    tankNumber = 0
    highestNumber = 0
    frequentialTotal = 0
    bayesianTotal = 0
    observedTankCount = 0
    observedString = ""
    tankCount()

    freqFormBot.textContent = "N/A"
    freqConst.textContent = "N/A"
    freq.textContent = "N/A"
    freqFormTop.textContent = "N/A"

    baye.textContent = "N/A"
    bayeConst.textContent = "N/A"
    bayeFormBot.textContent = "N/A"
    bayeFormTop.textContent = "N/A"

    observedList.textContent = "{}"
}

tankCount();