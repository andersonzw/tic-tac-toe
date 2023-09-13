const resetBtn = document.querySelector("#reset")
resetBtn.addEventListener("click", () => location.reload())




const winCondition = [
    ['1','2','3'],
    ['4','5','6'],
    ['7','8','9'],
    ['1','4','7'],
    ['2','5','8'],
    ['3','6','9'],
    ['1','5','9'],
    ['3','5','7']
]
const beginGame = document.querySelector(".begin-game")
const container = document.querySelector(".container")
const turnText = document.querySelector(".turn-p")
const turnIndicator = document.querySelector(".turn-indicator")


//Player 1 is blue, 
//Player 2 is green
let winner = ''
// Initialise Game
document.querySelectorAll(".player-button").forEach(button =>{
    button.addEventListener("click", ()=>{
        let currentTurnName =  button.textContent
        beginGame.style.display = "none"
        container.style.display = "grid"
        turnText.style.display = "block"
        turnIndicator.textContent = currentTurnName
        
    })
} ) 

//Update  turn name
function updateTurnName() {
    if (this.getAttribute("class").includes("selected")){
        return
    }


    else if (turnIndicator.textContent === 'Player A') {
        currentTurnName = 'Player B'
        turnIndicator.textContent = currentTurnName
    }
    else if (turnIndicator.textContent === 'Player B'){
        currentTurnName = 'Player A'
        turnIndicator.textContent = currentTurnName
    }
}

//Update Cell
function selectCell() {
    if (this.getAttribute("class").includes("selected")){
        return
    }
    else if  (currentTurn === "cross")
        {this.classList.add("cross")
        currentTurn = 'circle'
    }
    else if (currentTurn === "circle")
        {this.classList.add("circle")
        currentTurn = 'cross'

    }


    console.log({currentTurn});
}

let moveSet = []
//Player
function Player(name, selected){
    this.name = name.textContent
    this.selected = selected.dataset.value  
}
function playMove(){
    if (this.getAttribute("class").includes("selected")){
        return
    }
    const move = new Player(turnIndicator, this)
    console.log(move);
    moveSet.push(move)
    
}

function winCheck() {
    if (this.getAttribute("class").includes("selected")){
        return console.log("wincheckfail");
    }
    else if (moveSet.length > 3){ 
        let player1 = {
            name: moveSet[0]['name'],
            moves: []
        }
        let player2 = {
            name: moveSet[1]['name'],
            moves: []
        }


        for (let i=0; i<moveSet.length; i++){
            if (i % 2 === 1){
                player2.moves.push(moveSet[i]['selected'])
            }
            
            else if (i % 2 !== 1){
                player1.moves.push(moveSet[i]['selected'])
            }
        };
        console.log([player1['moves'],player2['moves']]);


        // check if array is subsetted
        let checkSubset = (parentArray, subsetArray) => {
            return subsetArray.every((el) => {
                return parentArray.includes(el)
            })
        }
        if (player1['moves'].length >= 3){
            winCondition.forEach(win => {
               if (checkSubset(player1['moves'], win)){
                    winner = player1.name; 
                    return

               };
            })
        }
        if (player2['moves'].length >= 3){
            winCondition.forEach(win => {
                if (checkSubset(player2['moves'], win)){
                     winner = player2.name;
                     return
                    
                     
                }
        })
    }

    }
    console.log({winner});

    this.classList.add("selected")

    return


}
     
function winnerCheck(){
    if (winner !== ''){
        container.style.display = "none"
        const winnerText = document.createElement("div")
        winnerText.classList.add("winner-div")
        winnerText.textContent = `${winner} wins!`
        document.querySelector("body").appendChild(winnerText)
        turnText.style.display = "none"

    }
    return
}




let currentTurn = 'cross'
document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", playMove))
document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", selectCell))
document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", updateTurnName))
document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", winCheck));
document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", winnerCheck));


// document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", function(){
//     selectCell
//     updateTurnName
// }));






