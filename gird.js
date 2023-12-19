import { globals } from "./app.js";
import Cell from "./cell.js";

export default class GridManager{
    constructor(){
        this.grid = new Array(this.colm);
        this.row = 3;
        this.colm = 3;
        this.turnPlayed = false;
        this.winnerCount = 0;
    }

    initGrid(){
        for (let i = 0; i < this.colm; i++) {
            this.grid[i] = new Array(this.row);
            for (let j = 0; j < this.row; j++) {
                this.grid[i][j] = new Cell(i, j);
            }
        }
    }

    draw(){
        this.grid.forEach(colm=>{
            colm.forEach(cell=>{
                cell.draw();
            })
        })
    }

    checkWin(i,j){
        for (let index = 0; index < globals.dx.length; index++) {
            let nx = i + globals.dy[index];
            let ny = j + globals.dx[index];

            if(nx >= 0 && ny >= 0 && nx < globals.rows && ny < globals.columns){
                console.log(nx,ny)
                if (nx != i && ny != j) {
                 
                    // if(this.winnerCount < 9){

                    //     this.checkWin(nx, ny);
                    // }
                    this.grid[nx][ny].clicked = true;
                    this.grid[nx][ny].x = true;
                    this.winnerCount++;
                }
            }

            
        }
    }

    playTurn(turnX,mousePos){
        let i = mousePos.x;
        let j = mousePos.y;
        this.turnPlayed = false;
        if(this.grid[i][j].clicked) return;
        if(turnX){
            this.grid[i][j].playX();
            this.turnPlayed = true;
            this.checkWin(i,j);
        }
        else{
            this.grid[i][j].playO();
            this.turnPlayed = true;
        }
    }

}