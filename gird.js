import { globals , game } from "./app.js";
import Cell from "./cell.js";

export default class GridManager {
    constructor() {
        this.grid = new Array(this.colm);
        this.row = globals.rows;
        this.colm = globals.columns;
        this.winnerCount = 0;
        this.winnerStackCount = globals.winnerStackCount;
        this.winnerCellStack = [];
    }

    initGrid() {
        for (let i = 0; i < this.colm; i++) {
            this.grid[i] = new Array(this.row);
            for (let j = 0; j < this.row; j++) {
                this.grid[i][j] = new Cell(i, j);
            }
        }
    }

    resizeGrid(){
        for (let i = 0; i < this.colm; i++) {
            for (let j = 0; j < this.row; j++) {
                this.grid[i][j].resizeCell(i,j)
            }
        }
    }

    draw() {
        this.grid.forEach(colm => {
            colm.forEach(cell => {
                cell.draw();
            })
        })
    }

    isInBounds(nx, ny) {
        return nx >= 0 && ny >= 0 && nx < globals.rows && ny < globals.columns
    }

    celebrateTheWinnerCells(){
        console.log("win")
        game.isOver = true;
        this.winnerCellStack.forEach(cellInfo=>{
            this.grid[cellInfo.i][cellInfo.j].color = globals.colors.winnerCellColor
        })
    }

    checkWin(i,j){
        let currentCell = this.grid[i][j];
        for (let index = 0; index < globals.dx.length; index++) {
            this.winnerCount = 0;
            let dx = globals.dx[index];
            let dy = globals.dy[index];
            
            
            let nx = i + dx;
            let ny = j + dy;
            
      
            if(this.isInBounds(nx,ny)){
                let neighbor = this.grid[nx][ny]
                //reset stack 
                this.winnerCellStack = [];
                if(neighbor.x === currentCell.x && neighbor.clicked){
                    for (let index = -1 * this.winnerStackCount; index < this.winnerStackCount; index++) {

                        if(this.winnerCount === this.winnerStackCount){
                            this.celebrateTheWinnerCells();
                            return;
                        }

                        let newDx = dx * index;
                        let newDy = dy * index;

                        let newNx = nx + newDx;
                        let newNy = ny + newDy;

                        if(this.isInBounds(newNx,newNy)){
                            let _neighbor = this.grid[newNx][newNy]
                            if(_neighbor.x === currentCell.x && _neighbor.clicked){
                                //push the winner cell info
                                this.winnerCellStack.push({i : _neighbor.i , j : _neighbor.j})
                                this.winnerCount++;
                                continue;
                            } 
                        }
                    }

                }
            }
        }

    }

    playTurn(turnX, mousePos) {
        let i = mousePos.x;
        let j = mousePos.y;
        
        game.turnPlayed = false;
        if (this.grid[i][j].clicked) return;
        if (turnX) {
            this.grid[i][j].playX(); // X playing
            game.turnPlayed = true;  //switching X - O 
            this.winnerCount = 0;    //didnt like this code
            this.checkWin(i,j);      
        }
        else {
            this.grid[i][j].playO();  // O playing
            game.turnPlayed = true;   //switching X - O 
            this.winnerCount = 0;
            this.checkWin(i,j);
        }
        game.totalMove++;

        //Checking tie
        if(game.totalMove === game.maxMoveCount && !game.isOver){
            console.log("Tie")
            game.isOver = true;
        }
    }
}