class Game {
    constructor(container, userId, connection, roomId) {

        //this.pawn = new Pawn(item, connection);
        this.player = 0;
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

            var pHolder = this.board.player;
            this.board.player = this.board.opponent;
            this.board.opponent = pHolder;
            //this.player = 1;
       
            //this.board.player = 1;
            //this.board.opponent = 0;
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
        //this.board.pawns1.canMove = this.canMove;
        //this.board.Move(this.canMove);
        var u = this.board.player;
        u.forEach(function (i) {
            i.canMove = canMove;
        });
    }
    

}
