import { globals } from "./app.js";
import Cell from "./cell.js";

export default class GridManager{
    constructor(){
        this.grid = new Array(this.colm);
        this.row = 3;
        this.colm = 3;
        this.turnPlayed = false;
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


    playTurn(turnX,mousePos){
        let i = mousePos.x;
        let j = mousePos.y;
        this.turnPlayed = false;
        if(this.grid[i][j].clicked) return;
        if(turnX){
            this.grid[i][j].playX();
            this.turnPlayed = true;
        }
        else{
            this.grid[i][j].playO();
            this.turnPlayed = true;
        }
    }

}