import Globals from "./globals.js";
import Game from "./game.js";
import Cell from "./cell.js";
import GridManager from "./gird.js";

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const restartButton = document.getElementById('restartButton');


let globals = new Globals();
let game = new Game();
let gridManager = new GridManager();


game.maxMoveCount = gridManager.row  * gridManager.colm;
    
let canvasSize = Math.min(window.innerWidth / 1.5,window.innerHeight /1.5)

canvas.width = canvasSize;
canvas.height = canvasSize;

globals.cellSize = canvasSize / globals.rows


document.getElementById("body").style.backgroundColor = globals.colors.bodyBg;
canvas.style.backgroundColor = globals.colors.canvasBg;
// canvas.style.border = `15px solid ${globals.colors.gridBorder}`; 





gridManager.initGrid();
game.displayScore();


restartButton.addEventListener('click' ,  ()=>{
    game.restart(gridManager);
})

window.addEventListener('resize', ()=>{
    canvasSize  = Math.min(window.innerWidth / 1.5,window.innerHeight /1.5)
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    globals.cellSize = canvasSize / globals.rows
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