class Game {
    constructor(container, userId, connection, roomId) {
        this.player = 0;
        this.userId = userId;
        this.canMove = true;
        this.board = new Grid(container, connection, roomId, this.canMove);
        this.roomId = roomId;
        this.players = [userId];
        this.connection = connection;
        this.cont = container;
    }

    AlertWinner(player) {
        //makes div visible stating the winner of the game
        var myDiv = document.getElementById("Alert");
        myDiv.innerHTML = (player + " Wins");
        myDiv.style.zIndex = 2;//puts it 'on top' of all other elements
    }

    GenerateCards() {
        //invokes method in grid.js that selects cards randomly
        this.board.PopulateCards();
    }

    EndGame(pawnId, player) {
        //sets both players moves to false, so no one can play
        if (this.canMove) {
            this.canMove = false;
            this.board.canMove = false;
            this.board.SwapTurn(pawnId);
        }
        //give pop up of player that won the game
        this.AlertWinner(player);
    }

    start() {
        //runs Move method in board, if player was first to join
        var _players = this.players;
        var _userId = this.userId;

        var startIndex = this.board.GetStartColour();
        
        if (_players[0] !== _userId) {//player 2 will always be the second player in the array, so go to index 1
            //sets variables of player 2
            this.board.playerDeck = document.querySelector("#deck2");
            this.board.opponentDeck = document.querySelector("#deck1");
            var playerCard = this.board.playerCards;
            this.board.playerCards = this.board.opponentCard;
            this.board.opponentCard = playerCard;
            var pHolder = this.board.player;
            this.board.player = this.board.opponent;
            this.board.opponent = pHolder;
        } else {//if _player is player 1
            this.board.playerDeck = document.querySelector("#deck1");
            this.board.opponentDeck = document.querySelector("#deck2");
        }

        if (_players[startIndex] !== _userId) {//if userId != userId of starting player you can't move
            this.board.playerTurn = false;
            this.SetTurn(null);
        }

        this.board.activeItem = null
        this.board.Start();
    }  


    SwapTurn(pawnId, cardId) {
        //swaps canMove around and then runs Move method in board
        //with new canMove value
        if (cardId !== null) {
            this.board.SwapCard(cardId);
        }
        if (pawnId !== null) {
            this.board.RemovePawn(pawnId);
        }
        this.SetTurn();
    }
        
    SetTurn() {

        var canMove = !this.canMove;//toggles (bool)canMove, swapping players turn
        this.canMove = canMove;
        this.board.canMove = canMove;

        var u = this.board.player;
        u.forEach(function (i) {//toggles canMove for each pawn on the board
            i.canMove = canMove;
        });

        this.board.SwapTurn();

    }
    

}
