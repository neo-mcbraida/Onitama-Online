class Game {
    constructor(container, userId, connection, roomId) {

        //this.pawn = new Pawn(item, connection);
        this.userId = userId;
        this.canMove = true;
        this.board = new Grid(container, connection, roomId, this.canMove);
        this.roomId = roomId;
        this.players = [userId];
        this.connection = connection;
    }

    start() {
        //runs Move method in board, if player was first to join
        
        var _players = this.players;
        var _userId = this.userId;
        if (_players[0] !== _userId) {
            this.SwapTurn();
            //this.board.canMove = false;
            //this.board.
        }
        this.board.Move();
    }  


    SwapTurn() {
        //swaps canMove around and then runs Move method in board
        //with new canMove value
        var canMove = !this.canMove;
        this.canMove = canMove;
        //this.board.canMove = canMove;
        //this.board.p1.canMove = true;
        //this.board.pawns.canMove = this.canMove;
        //this.board.Move(this.canMove);
        var u = this.board.pawns;
        u.forEach(function (i) {
            i.canMove = canMove;
        });
    }
    

}
