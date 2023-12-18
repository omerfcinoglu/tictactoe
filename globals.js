export default class Globals{
    constructor(){

        this.cellSize = 300,

        this.colors = {
            xo : "#DCD7C9",
            gridBorder : "#A27B5C",
            canvasBg : '#3F4E4F',
            bodyBg : '#2C3639',
        }

        this.rows = 3;
        this.columns = 3;

        this.dx = [ 1, -1, 0,  0, 1,  1, -1, -1  ]
        this.dy = [ 0,  0, 1, -1, 1, -1, -1,  1  ]

    }
}