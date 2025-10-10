import Globals from "./globals.js";
import Game from "./game.js";
import GridManager from "./gird.js";

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const restartButton = document.getElementById('restartButton');
const settingApplyButton = document.getElementById('applyButton');

const globals = new Globals();
const game = new Game();

let gridManager;
let canvasSize;

function applySettings() {
    const gameSettings = getGameSettings();
    globals.rows = parseInt(gameSettings.row) || globals.rows;
    globals.columns = parseInt(gameSettings.row) || globals.columns;
    globals.winnerStackCount = parseInt(gameSettings.winCount) || globals.winnerStackCount;
}

function updateCanvas() {
    canvasSize = Math.min(window.innerWidth / 1.5, window.innerHeight / 1.5)
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    globals.cellSize = canvasSize / globals.rows
}

function createGrid() {
    gridManager = new GridManager();
    gridManager.initGrid();
    game.maxMoveCount = gridManager.row * gridManager.colm;
}

function getGameSettings() {
    return {
        row: document.getElementById('gridWidth').value,
        winCount: document.getElementById('winCount').value
    }
}

applySettings();
updateCanvas();
createGrid();

document.getElementById("body").style.backgroundColor = globals.colors.bodyBg;
canvas.style.backgroundColor = globals.colors.canvasBg;

game.displayScore();

restartButton.addEventListener('click', () => {
    applySettings();
    updateCanvas();
    createGrid();
    game.restart(gridManager);
})

settingApplyButton.addEventListener('click', () => {
    applySettings();
    updateCanvas();
    createGrid();
    game.restart(gridManager);
})

window.addEventListener('resize', () => {
    updateCanvas();
    gridManager.resizeGrid();
})

canvas.addEventListener("click", (event) => {
    if (game.isOver) return;

    let mousePos = {
        x: Math.floor(event.offsetX / globals.cellSize),
        y: Math.floor(event.offsetY / globals.cellSize)
    }
    gridManager.playTurn(game.turnX, mousePos);
    if (game.turnPlayed) {
        game.turnX = !game.turnX;
    }
});


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    gridManager.draw();
    window.requestAnimationFrame(gameLoop)
}

gameLoop();
export {
    ctx,
    globals,
    game
}