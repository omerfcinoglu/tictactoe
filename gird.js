import { globals } from "./app.js";
import Cell from "./cell.js";

export default class GridManager {
    constructor() {
        this.grid = new Array(this.colm);
        this.row = globals.rows;
        this.colm = globals.columns;
        this.turnPlayed = false;
        this.winnerCount = 0;
        this.winnerStackCount = globals.winnerStackCount;
        console.log(this.winnerStackCount);
        this.stack = [];
    }

    initGrid() {
        for (let i = 0; i < this.colm; i++) {
            this.grid[i] = new Array(this.row);
            for (let j = 0; j < this.row; j++) {
                this.grid[i][j] = new Cell(i, j);
            }
        }
    }

    update() {

    }

    draw() {
        this.grid.forEach(colm => {
            colm.forEach(cell => {
                cell.draw();
            })
        })
    }

    //todo rename a and b methods !!
    a(i, j) {
        let uppppi = i;
        let uppppj = j;

        for (let index = 0; index < globals.dx.length; index++) {
            let dx = globals.dx[index];
            let dy = globals.dy[index];

            let nx = i + dx;
            let ny = j + dy;

            let currentCell = this.grid[i][j];


            if (this.isInBounds(nx, ny)) {
                let neighbor = this.grid[nx][ny];
                if (currentCell.x === neighbor.x) {
                    this.winnerCount++;
                    this.stack.push(
                        {
                            "current_i": uppppi,
                            "current_j": uppppj,
                            "neighbor_i": nx,
                            "neighbor_j": ny,
                            "dx": dx,
                            "dy": dy
                        }
                    )

                    this.b(this.stack.pop())

                }
            }

        }
    }

    isInBounds(nx, ny) {
        return nx >= 0 && ny >= 0 && nx < globals.rows && ny < globals.columns
    }

    b(stackInfo) {
        for (let index = -1 * this.winnerStackCount; index < this.winnerStackCount ; index++) {
            let newDx = stackInfo.dx * index;
            let newDy = stackInfo.dy * index;
            if(this.isInBounds(newDx,newDy)){
                let currentCell = this.grid[stackInfo.current_i][stackInfo.current_j];
                if(this.grid[newDx][newDy].x === currentCell.x){
                    this.winnerCount++;
                    if(this.winnerCount === this.winnerStackCount){
                        console.log("WON");
                    }
                }
            }
        }

        //     let newNx = stackInfo.current_i + newDx;
        //     let newNy = stackInfo.current_j + newDy;
        //     let current = this.grid[stackInfo.current_i][stackInfo.current_j]

        //     if(this.isInBounds(newNx,newNy)){
        //           let newNeigbor = this.grid[newNx][newNy]
        //           if(current.x === newNeigbor.x){
        //             this.winnerCount++;
        //             this.stack.push(
        //                 {
        //                     "current_i": stackInfo.current_i,
        //                     "current_j": stackInfo.current_j,
        //                     "neighbor_i": newNx,
        //                     "neighbor_j": newNy,
        //                     "dx": newDx,
        //                     "dy": newDy
        //                  }
        //             )
        //           }   

        //     }
        // }
        // if(this.stack.length>0){
        //     this.b(this.stack.pop());
        // }
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
                
                if(neighbor.x === currentCell.x){
                    neighbor.color = "orange";
                    for (let index = -1 * this.winnerStackCount; index < this.winnerStackCount; index++) {
                        if(this.winnerCount === this.winnerStackCount){
                            console.log("win")
                            return;
                        }

                        let newDx = dx * index;
                        let newDy = dy * index;

                        let newNx = nx + newDx;
                        let newNy = ny + newDy;


                        if(this.isInBounds(newNx,newNy)){
                            let _neighbor = this.grid[newNx][newNy]
                            if(_neighbor.x === currentCell.x){
                                neighbor.color = "orange";
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
        this.turnPlayed = false;
        if (this.grid[i][j].clicked) return;
        if (turnX) {
            this.grid[i][j].playX();
            this.turnPlayed = true;
            this.checkWin(i,j);
        }
        else {
            this.grid[i][j].playO();
            this.turnPlayed = true;
        }       
    }



}