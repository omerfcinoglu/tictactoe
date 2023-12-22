export default class Globals{
    constructor(){
        
        this.rows = 3;
        this.columns = 3;
        this.winnerStackCount = 3;
        
        this.cellSize = 300, //setting this after page load 

        this.colors = {
            // xo : "#DCD7C9",
            xo: 'hsla(100,20%,50%,1)',
            gridBorder : "#A27B5C",
            canvasBg : '#3F4E4F',
            bodyBg : '#2C3639',
            winnerCellColor : '#FFA500' 
        }

        this.dx = [ 1, -1, 0,  0, 1,  1, -1, -1  ]
        this.dy = [ 0,  0, 1, -1, 1, -1, -1,  1  ]
    }
}