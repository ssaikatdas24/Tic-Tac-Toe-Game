// fetch needed things
const gameInfo = document.querySelector('.game-info');
const boxes = document.querySelectorAll('.box');
const newGameBtn = document.querySelector('.btn');

// winning positions
const winpos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
// needed variables for code
let currentPlayer;
let gameGrid;
// initialization
function initialize(){
    // set current player to X
    currentPlayer = 'X';
    // set it in the UI
    gameInfo.textContent = `Current Player - ${currentPlayer}`;

    // Empty the boxes in the code
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    // empty the boxes in UI 
    boxes.forEach((box,index) =>
    {
        box.textContent = "";
        // remove color
        box.classList.remove('win');
        // add pointer events
        box.style.pointerEvents = "all";

    }
    );
    // remove active class from new game btn
    newGameBtn.classList.remove("active");

}
// function call
initialize();
// Handle the clicks after initialization
function handleClick(index){
    if(gameGrid[index] === ""){
        // change on UI
        boxes[index].textContent = currentPlayer;
        // change on code
        gameGrid[index] = currentPlayer;
        // stop curson pointer
        boxes[index].style.pointerEvents = "none";
        // swap the turn to the next player
        swapTurns();
        // update game-info in UI
        gameInfo.textContent = `Current Player - ${currentPlayer}`;
        checkGameOver();
    }
}
// swapping turns
function swapTurns(){
    if(currentPlayer === 'X')
        currentPlayer = 'O';
    else
        currentPlayer = 'X';
}
// check game is over or not
function checkGameOver(){
    let winner="";
    winpos.forEach((position)=>
    {
        if((gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "")
        && (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[0]] === gameGrid[position[2]])){
            
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            // win
            winner = gameGrid[position[0]] === "X"? "X" : "0";
            // add colors 
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    if (winner !== "") {
        gameInfo.textContent = `Winner is - ${winner}`;
        newGameBtn.classList.add("active");
        return;
    }
    // check for a tie
    let fillcount = 0;
    gameGrid.forEach((box) =>{
        if(box !== ""){
            fillcount++;
        }
    });
    if((fillcount === 9)){
        gameInfo.textContent = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}


// add event listner to all boxes to get player input
boxes.forEach((box,index)=>{
    box.addEventListener('click',() =>{
        handleClick(index);
    });
});
// add event listner to new game btn
newGameBtn.addEventListener('click',initialize);