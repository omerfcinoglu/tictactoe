import Globals from "./globals.js";
import Game from "./game.js";
import Cell from "./cell.js";
import GridManager from "./gird.js";

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')


let globals = new Globals();
let game = new Game();
let gridManager = new GridManager();

game.maxMoveCount = gridManager.row  * gridManager.colm;
    
let canvasSize = Math.min(window.innerWidth,window.innerHeight)

canvas.width = canvasSize;
canvas.height = canvasSize;

globals.cellSize = canvasSize / globals.rows

console.log(canvasSize)

document.getElementById("body").style.backgroundColor = globals.colors.bodyBg;
canvas.style.backgroundColor = globals.colors.canvasBg;
// canvas.style.border = `15px solid ${globals.colors.gridBorder}`; 

gridManager.initGrid();


window.addEventListener('resize', ()=>{
    canvasSize = Math.min(window.innerWidth,window.innerHeight)
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    globals.cellSize = canvasSize / globals.rows
    gridManager.resizeGrid();

})

canvas.addEventListener("click", (event) => {
    if(game.isOver) return;
    console.log(event.x,event.y);
    
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
    gridManager.draw();
    window.requestAnimationFrame(gameLoop)
}

gameLoop();
export {
    ctx,
    globals,
    game
}