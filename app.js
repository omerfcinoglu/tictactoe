import Cell from "./cell.js";
import GridManager from "./gird.js";
import Globals from "./globals.js";

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')


let globals = new Globals();
let gridManager = new GridManager();
let j = 0; let i = 0;

canvas.width = 910;
canvas.height = 910;

document.getElementById("body").style.backgroundColor = globals.colors.bodyBg;
canvas.style.backgroundColor = globals.colors.canvasBg;
// canvas.style.border = `15px solid ${globals.colors.gridBorder}`; 

gridManager.initGrid();


let turnX = true;
canvas.addEventListener("click", (event) => {

    let mousePos = { 
        x :Math.floor(event.offsetX / globals.cellSize),
        y :Math.floor(event.offsetY / globals.cellSize)
    }
    gridManager.playTurn(turnX , mousePos);
    if(gridManager.turnPlayed){
        turnX ? turnX =  false : turnX = true;
    }
});


function gameLoop(){
    gridManager.draw();
    window.requestAnimationFrame(gameLoop)
}

gameLoop();
export {
    ctx,
    globals
}