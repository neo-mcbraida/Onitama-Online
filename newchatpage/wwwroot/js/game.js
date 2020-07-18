class Game {
    constructor(container, canMove, item, userId, connection, roomId) {

        this.pawn = new Pawn(item, connection);
        this.userId = userId;
        this.canMove = canMove;
        this.board = new Grid(container, this.pawn, connection, roomId);
        this.roomId = roomId;
        this.players = [userId];
        this.connection = connection;
    }

    start() {
        //runs Move method in board, if player was first to join
        var _players = this.players;
        var _userId = this.userId;
        if (_players[0] === _userId) {
            this.canMove = true;
            this.board.Move(this.canMove);
        } else {
            this.canMove = false;
        }
      
    }  


    SwapTurn() {
        //swaps canMove around and then runs Move method in board
        //with new canMove value
        this.canMove = !this.canMove;
        this.board.Move(this.canMove);
    }

}
