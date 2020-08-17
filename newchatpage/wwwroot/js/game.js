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


    GenerateCards() {
        this.board.PopulateCards();
    }

    start() {
        //runs Move method in board, if player was first to join
        var _players = this.players;
        var _userId = this.userId;


        if (_players[0] !== _userId) {
            this.board.playerDeck = document.querySelector("#deck2");
            this.board.opponentDeck = document.querySelector("#deck1");
            var playerCard = this.board.playerCards;
            this.board.playerCards = this.board.opponentCard;
            this.board.opponentCard = playerCard;
            var pHolder = this.board.player;
            this.board.player = this.board.opponent;
            this.board.opponent = pHolder;
            this.board.playerTurn = false;    
            this.SetTurn(null);
            this.board.playerCards.forEach(function (i) {//times by -1 all the possible positions for a card
                for (var u = 0; u < i.xIndex.length; u++) {
                    i.xIndex[u] = i.xIndex[u] * -1;
                    i.yIndex[u] = i.yIndex[u] * -1;
                }
            });
        } else {
            this.board.playerDeck = document.querySelector("#deck1");
            this.board.opponentDeck = document.querySelector("#deck2");
        }

        

        this.board.activeItem = null
        this.board.Start();
    }  


    SwapTurn(pawnId, cardId) {
        //swaps canMove around and then runs Move method in board
        //with new canMove value
        this.board.SwapCard(cardId);

        if (pawnId !== null) {
            this.board.RemovePawn(pawnId);
            
        }

        this.SetTurn();
    }
        
    SetTurn() {

        var canMove = !this.canMove;
        this.canMove = canMove;
        this.board.canMove = canMove;

        var u = this.board.player;
        u.forEach(function (i) {
            i.canMove = canMove;
        });

        this.board.SwapTurn();

    }
    

}
