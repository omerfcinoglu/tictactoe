import Globals from "./globals.js";
import Game from "./game.js";
import Cell from "./cell.js";
import GridManager from "./gird.js";

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const restartButton = document.getElementById('restartButton');
const widthInput = document.getElementById('gridWidth');
const heightInput = document.getElementById('gridHeight');
const winInput = document.getElementById('winCount');


let globals = new Globals();
let game = new Game();
let gridManager;

function applySettings(){
    globals.rows = parseInt(widthInput.value) || globals.rows;
    globals.columns = parseInt(heightInput.value) || globals.columns;
    globals.winnerStackCount = parseInt(winInput.value) || globals.winnerStackCount;
}

let canvasSize;

function updateCanvas(){
    canvasSize = Math.min(window.innerWidth / 1.5,window.innerHeight /1.5)
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    globals.cellSize = canvasSize / globals.rows
}

function createGrid(){
    gridManager = new GridManager();
    gridManager.initGrid();
    game.maxMoveCount = gridManager.row  * gridManager.colm;
}

applySettings();
updateCanvas();
createGrid();

document.getElementById("body").style.backgroundColor = globals.colors.bodyBg;
canvas.style.backgroundColor = globals.colors.canvasBg;
// canvas.style.border = `15px solid ${globals.colors.gridBorder}`;

game.displayScore();

restartButton.addEventListener('click' ,  ()=>{
    applySettings();
    updateCanvas();
    createGrid();
    game.restart(gridManager);
})

window.addEventListener('resize', ()=>{
    updateCanvas();
    gridManager.resizeGrid();

})

canvas.addEventListener("click", (event) => {
    if(game.isOver) return;
    
    let mousePos = { 
        x :Math.floor(event.offsetX / globals.cellSize),
        y :Math.floor(event.offsetY / globals.cellSize)
    }
    gridManager.playTurn(game.turnX , mousePos);
    if(game.turnPlayed){
        game.turnX ? game.turnX = false : game.turnX = true;
    }
});


function gameLoop(){
    ctx.clearRect(0,0 ,canvas.width ,canvas.height)
    gridManager.draw();
    window.requestAnimationFrame(gameLoop)
}

gameLoop();
export {
    ctx,
    globals,
    game
}