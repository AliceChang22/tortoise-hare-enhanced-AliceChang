
const TRACK_LENGTH = 70; // Sometimes constant variables are all CAPS

const startBtn = document.getElementById("startBtn");
const messageEl = document.getElementById("message");
const trackEl = document.getElementById("track");
const tortoiseScore = document.getElementById("tortoiseScore")
const hareScore = document.getElementById("hareScore")

let tortoisePosition = 1
let harePosition = 1
let raceIntervalId = null
let stepCount = 0

// score counter variables
let tortoiseWins = 0
let hareWins = 0

startBtn.addEventListener("click", startRace)

// start the race with a button click
// trigger the move every second (setInterval())
function startRace(){
    tortoisePosition = 1
    harePosition = 1
    stepCount = 0
    messageEl.textContent = "BANG!!! AND THEY ARE OFF!!!!"

    // every dom element is an object with a "disabled" property
    startBtn.disabled = true

    // avoid double tracks
    if (raceIntervalId !== null){
        clearInterval(raceIntervalId)
    }
    raceIntervalId = setInterval(raceStep, 1000)
}

function raceStep(){
    stepCount++
    // move the tortoise randomly (Match.random())
    moveTortoise()
    // move the hare randomly
    moveHare()
    // fix position if they go below the range (0-70)
    clampPositions()
    // when one of the animals reach 70+, show result message
    if (tortoisePosition >= TRACK_LENGTH || harePosition >= TRACK_LENGTH) {
        clearInterval(raceIntervalId)
        raceIntervalId = null
        showResult()
        startBtn.disabled = false
    }
    // render the track with the new positions
    renderTrack()
}

function moveTortoise(){
    let roll = Math.floor(Math.random()*10) + 1

    if(roll >= 1 && roll <= 5) {
        // 1-5 fast plod
        tortoisePosition += 3
    } else if(roll >= 6 && roll <= 7){
        // 6-7 slip
        tortoisePosition -= 2
    } else {
        // 8-10 slow plod
        tortoisePosition += 1
    }
}

function moveHare(){
    let roll = Math.floor(Math.random()*10) + 1

    if(roll >= 1 && roll <= 3) {
        harePosition += 1
    } else if(roll >= 4 && roll <= 6){
        harePosition += 8
    } else if(roll === 7){
        harePosition -= 6;
    } else if(roll >= 8 && roll <= 9){
        
    } else {
        harePosition -= 4
    }
}

function clampPositions(){
    tortoisePosition = Math.min(TRACK_LENGTH, Math.max(1, tortoisePosition))
    harePosition = Math.min(TRACK_LENGTH, Math.max(1, harePosition))
}

function renderTrack(){
    trackEl.innerHTML = ''

    for(let i = 1; i <= TRACK_LENGTH; i++){
        let cell = document.createElement('div')
        cell.classList.add('cell')

        let isTortoiseHere = tortoisePosition === i
        let isHareHere = harePosition === i

        if (isTortoiseHere && isHareHere){
            cell.classList.add('both')
            cell.textContent = '🔥'
        } else if (isTortoiseHere) {
            cell.classList.add('tortoise')
            cell.textContent = '🐢' 
        } else if (isHareHere) {
            cell.classList.add('hare')
            cell.textContent = '🐰'
        }

        trackEl.appendChild(cell)
    }
}

function showResult(){
    if (tortoisePosition >= TRACK_LENGTH && harePosition >= TRACK_LENGTH){
        messageEl.textContent = "It's a tie!"
    } else if (tortoisePosition >= TRACK_LENGTH) {
        tortoiseWins++
        messageEl.textContent = "Tortoise wins!! Yay!!"
    } else if (harePosition >= TRACK_LENGTH) {
        hareWins++
        messageEl.textContent = "Hare wins!"
    } else {
        messageEl.textContent = "Race stopped..."
    }

    // update the scoreboard
    tortoiseScore.textContent = `Tortoise: ${tortoiseWins} wins`
    hareScore.textContent = `Hare: ${hareWins} wins`
}

// initial render of the empty track
renderTrack()