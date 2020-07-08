class Game {
    constructor(_container, _item, _userName) {
        this.userName = _userName;
        this.board = new Grid(_container, true, _item);
     //   this.pawn = new Pawn();
        this.playerMove = _userName;//enumeration of which players move it is
        //this.domElement = new DOMElement(_item);
    }

    start() {
        this.board.move(this.pawn);
            //this.pawn.move();
        
    }  



}
