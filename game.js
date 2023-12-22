export default class Game{
    constructor(){
        this.turnPlayed =false;
        this.turnX = true;

        this.maxMoveCount = 0;
        this.totalMove = 0;

        this.isOver = false;

        this.xScore = 0;
        this.oScore = 0;
        this.tieScore = 0;
        
        this.info = {
            x: document.getElementById("leftBox"),
            tie: document.getElementById("centerBox"),
            o: document.getElementById("rightBox")

        }
    }

    displayScore(){
        this.info.x.textContent = `X : ${this.xScore}`;
        this.info.o.textContent = `O : ${this.oScore}`;
        this.info.tie.textContent = `Tie : ${this.tieScore}`;

    }

    restart(gridManager){
        gridManager.resetGrid();

        this.maxMoveCount = gridManager.row * gridManager.colm;
        this.totalMove = 0;
        this.isOver = false;
        this.turnPlayed = false;
        this.turnX = true;
    }
}