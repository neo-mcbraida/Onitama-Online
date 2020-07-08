class Game {
    constructor(_container, _item) {
        this.board = new Grid(_container);
        this.pawn = new Pawn(_item);
        this.playerMove = 0;//enumeration of which players move it is
        //this.domElement = new DOMElement(_item);
    }

    start() {
        this.board.move(this.pawn);
        //this.pawn.move();
    }  

}
