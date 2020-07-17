class Game {
    constructor(_container, canMove, _item, _userId, connection, roomId) {

        this.pawn = new Pawn(_item, connection);
        this.userId = _userId;
        this.canMove = canMove;
        this.board = new Grid(_container, this.pawn, connection, roomId);
        this.roomId = roomId;
        this.players = [_userId];
        this.playerTurn;
        this.started = false;
        this.connection = connection;
        //this.playerMove = _userName;//enumeration of which players move it is
        //this.domElement = new DOMElement(_item);
    }

    start() {
        var _players = this.players;
        var _userId = this.userId;
        if (_players[0] === _userId) {
            //this.playerTurn = this.userId;
            this.canMove = true;
            this.board.Move(this.canMove);
            //this.board.EndMove();
        } else {
            this.canMove = false;
        }
      
            //this.pawn.move();
        
    }  


    SwapTurn() {

        this.canMove = !this.canMove;
        this.board.Move(this.canMove);
    }

    //start(connection) {
    //    this.players.Add(connection);
    //    this.setTurn();
    //    this.started = true;
    //}


}
