class Grid {
    constructor(container, connection, roomId, canMove) {
        this.container = container;
        this.opponentDeck;
        this.playerDeck;
        this.board = [0, 100, 200, 300, 400];

        this.cardSpace = 0;

        this.roomId = roomId;
        this.connection = connection;
        this.canMove = true;
        this.p1 = new Pawn(document.querySelector("#item1"), connection, 1, 0, 0);
        this.p2 = new Pawn(document.querySelector("#item2"), connection, 2, 0, 0);
        this.p3 = new Pawn(document.querySelector("#item3"), connection, 3, 0, 1);
        this.p4 = new Pawn(document.querySelector("#item4"), connection, 4, 0, 0);
        this.p5 = new Pawn(document.querySelector("#item5"), connection, 5, 0, 0);
        
        this.p6 = new Pawn(document.querySelector("#item6"), connection, 6, 1, 0);
        this.p7 = new Pawn(document.querySelector("#item7"), connection, 7, 1, 0);
        this.p8 = new Pawn(document.querySelector("#item8"), connection, 8, 1, 1);
        this.p9 = new Pawn(document.querySelector("#item9"), connection, 9, 1, 0);
        this.p10 = new Pawn(document.querySelector("#item10"), connection, 10, 1, 0);


        this.c1 = new Card([-1, 1, 0], [-1, 1, 2], 0, 'url("/assets/rabbit.jpg")', connection, 11);
        this.c2 = new Card([1, -1, -1, 1], [-2, -1, 1, 2], 1, 'url("/assets/dragon.jpg")', connection, 12);
        this.c3 = new Card([-1, 1, 0], [0, 0, 1], 0, 'url("/assets/ox.jpg")', connection, 13);
        this.c4 = new Card([0, 1, 0], [-2, 0, 2], 1, 'url("/assets/crab.jpg")', connection, 14);
        this.c5 = new Card([0, 1, 0], [-1, 0, 1], 1, 'url("/assets/boar.jpg")', connection, 15);

        this.c6 = new Card([0, 1, -1], [-1, 1, 1], 0, 'url("/assets/cobra.jpg")', connection, 16);
        this.c7 = new Card([2, -1], [0, 0], 1, 'url("/assets/tiger.jpg")', connection, 17);
        this.c8 = new Card([-1, -1, 1], [-1, 1, 0], 1, 'url("/assets/crane.jpg")', connection, 18);
        this.c9 = new Card([0, 1, 0, -1], [-1, -1, 1, 1], 3, 'url("/assets/goose.jpg")', connection, 19);
        this.c10 = new Card([0, 1, 0, 1], [-1, -1, 1, 1], 1, 'url("/assets/elephant.jpg")', connection, 20);

        this.c11 = new Card([-1, 1, -1, 1], [-1, -1, 1, 1], 1, 'url("/assets/monkey.jpg")', connection, 21);
        this.c12 = new Card([-1, 1, 1], [0, -1, 1], 1, 'url("/assets/mantis.jpg")', connection, 22);
        this.c13 = new Card([-1, 0, 1], [-1, 1, -1], 3, 'url("/assets/eel.jpg")', connection, 23);
        this.c14 = new Card([-1, 0, 0, 1], [-1, -1, 1, 1], 0, 'url("/assets/rooster.jpg")', connection, 24);
        this.c15 = new Card([-1, 1, 0], [0, 0, -1], 3, 'url("/assets/horse.jpg")', connection, 25);

        this.c16 = new Card([-1, 1, 0], [1, -2, -1], 3, 'url("/assets/frog.jpg")', connection, 26);

        this.allCards = [this.c1, this.c2, this.c3, this.c4, this.c5, this.c6, this.c7, this.c8, this.c9, this.c10, this.c11, this.c12, this.c13, this.c14, this.c15, this.c16];

        this.centreCard = this.c3;

        this.selectedCardId = new Card();

        this.playerCards = [];
        this.opponentCard = [];

        this.cards = [this.playerCards, this.opponentCard];

        this.playerTurn = true;


        this.player = [this.p1, this.p2, this.p3, this.p4, this.p5];
        this.opponent = [this.p6, this.p7, this.p8, this.p9, this.p10];
        this.canMove = true;

        this.pieces = [];//using only array of opponent pieces, as do not need to set active for clients side pieces

        this.activeItem = new Piece(null, connection, 0);
        this.pIndex1 = 0;
        this.pIndex2 = 0;
        this.domElement;

        this.activeItem;

    }


    AddCards(cards, centreCard) {

        for (var i = 0; i < cards.length; i++) {

            this.playerCards.push(this.FindActiveCard(cards[0][i].id, this.allCards));
            this.opponentCard.push(this.FindActiveCard(cards[1][i].id, this.allCards));
        }

        this.centreCard = this.FindActiveCard(centreCard.id, this.allCards);

        this.ClearCards(this.allCards);
        this.SetDiv();
    }

    SetDiv() {
        this.playerCards[0].domElement = document.querySelector("#card1");
        this.playerCards[1].domElement = document.querySelector("#card2");
        this.centreCard.domElement = document.querySelector("#card3");
        this.opponentCard[0].domElement = document.querySelector("#card4");
        this.opponentCard[1].domElement = document.querySelector("#card5");
    }

    GetCard(item) {
        
        var index = Math.floor((Math.random() * this.allCards.length) + 1) - 1;
        

        //this.cards.push(this.allCards[index]);
        if (Array.isArray(item)) {
            item.push(this.allCards[index]);
        } else { item = this.allCards[index]; }
        this.allCards = this.ListRemove(this.allCards, this.allCards[index]);
    }

    PopulateCards() {
        
        this.GetCard(this.playerCards);

        this.GetCard(this.opponentCard);
        this.GetCard(this.playerCards);
        this.GetCard(this.opponentCard);
        
        this.GetCard(this.centreCard);

        this.SetDiv();

        this.ClearCards(this.allCards);

    }

    ClearCards(cards) {
        for (var i = 0; i < cards.length; i++) {
            delete (cards[i]);
        };

        //delete (cards);
    }


    Start() {



        //if it is players turn
        this.pieces.push(this.opponentCard);//push cards 1st as it is the shorter array
        this.pieces.push(this.opponent);

        for (var i = 0; i < 2; i++) {
            var playcard = this.playerCards[i];
            playcard.SetContent();
            playcard.container = "#" + this.playerDeck.id;
            var opcard = this.opponentCard[i];
            opcard.SetContent();
            opcard.container = "#" + this.opponentDeck.id;
        }
        this.centreCard.SetContent();
        for (var i = 0; i < 5; i++) {
            this.player[i].SetCoordinate(this.board);
            this.opponent[i].SetCoordinate(this.board);
        }

        if (this.playerTurn === true) {
            this.StartMove();
        }
        
    }

    SwapTurn() {

        if (this.canMove) {
            this.StartMove();
        } else {
            this.EndMove();
        }
    }

    StartMove() {


        var selectedCardId = this.selectedCardId;
        var cards = this.playerCards;
        var opponent = this.opponent;
        var player = this.player;
        var board = this.board;
        var activeItem = this.activeItem;
        var roomId = this.roomId;
        var container = this.container;
        var deck = this.playerDeck;
        var cardSpace = 0;
        var yIndex = [];
        var xIndex = [];


        this.DragStart = function (e) {
            player.forEach(function (i) {
                if (e.target == i.domElement) {
                    activeItem = i;
                    activeItem.dragStart(e, container, xIndex, yIndex, player);
                    console.log(player);
                }
            });
        };
        this.Drag = function (e) {
            if (e != null) {
                if (activeItem != null) {
                    activeItem.drag(e, roomId, container);
                }
            }
        };
        this.DragEnd = function (e) {
            if (activeItem != null) {
                activeItem.dragEnd(board, opponent, selectedCardId);
                activeItem = null;
            }
        };

        //for mouse
        this.container.addEventListener("mousedown", this.DragStart, false);
        this.container.addEventListener("mouseup", this.DragEnd, false);
        this.container.addEventListener("mousemove", this.Drag, false);
        //for touchscreen
        this.container.addEventListener("touchstart", this.DragStart, false);
        this.container.addEventListener("touchend", this.DragEnd, false);
        this.container.addEventListener("touchmove", this.Drag, false);

        this.CardSelect = function (e) {

            console.log(cards);
            cards.forEach(function (i) {

                if (e.target == i.domElement) {
                    selectedCardId = i.id;
                    i.dragEnd(cardSpace);
                    xIndex = i.xIndex;
                    yIndex = i.yIndex;
                }
            });

        };

     
        this.playerDeck.addEventListener("click", this.CardSelect, false);
    }

    EndMove() {

        //for mouse
        this.container.removeEventListener("mousedown", this.DragStart, false);
        this.container.removeEventListener("mouseup", this.DragEnd, false);
        this.container.removeEventListener("mousemove", this.Drag, false);
        //for touchscreen
        this.container.removeEventListener("touchstart", this.DragStart, false);
        this.container.removeEventListener("touchend", this.DragEnd, false);
        this.container.removeEventListener("touchmove", this.Drag, false);

        this.playerDeck.removeEventListener("click", this.CardSelect, false);
    }

 
    ListRemove(list, item) {
        var pHolder = [];
        list.forEach(function (i) {
            if (i !== item) {
                pHolder.push(i);
            }
        });
        return pHolder;
    }

    RemovePawn(pawnId) {

        var removed = false;
        for (var i = 0; i < this.player.length; i++) {
            if (this.player[i].id === pawnId) {
                this.container.removeChild(this.player[i].domElement);
                var removed = this.player[i];
                removed = null;
                this.player = this.ListRemove(this.player, this.player[i]);
                removed = true;
                break;
            }
        }
        if (removed === false) {
            for (var i = 0; i < this.opponent.length; i++) {
                if (this.opponent[i].id === pawnId) {
                    this.container.removeChild(this.opponent[i].domElement);
                    var removed = this.opponent[i];
                    removed = null;
                    this.opponent = this.ListRemove(this.opponent, this.opponent[i]);
                    break;
                }
            }
        }
        
    }
    

    SetActive(piece) {
        var pieces = this.pieces;

        outer: for (var i = 0; i < pieces.length; i++) {
            for (var u = 0; u < pieces[i].length; u++) {
                if (pieces[i][u].id === piece.id) {
                    this.pIndex1 = i;
                    this.pIndex2 = u;
                    break outer; 
                }
            }
        }
    }

    MovePiece(_piece) {
        //moving pawn to coordinates that other player has moved it to

        var piece = this.pieces[this.pIndex1][this.pIndex2];
        piece.setTranslate(_piece.left, _piece.top);
        //updating pawn info to that of the other player
        piece.xIndexCur = _piece.xIndexCur;
        piece.yIndexCur = _piece.yIndexCur;
        piece.left = _piece.left;
        piece.top = _piece.top;



        //!only change pos of dom element untile move is complete dont bother with the other pawn objects
    }

    FindActiveCard(cardId, cards) {

            for (var i = 0; i < cards.length; i++) {
                if (cards[i].id === cardId) {
                    return cards[i];
                    break;
                }
            }
    }

    SetCards(cardId, playerCards) {
        var playerCard = this.FindActiveCard(cardId, playerCards);
        var playerDom;
        var centreDom;

 
        playerCards = this.ListRemove(playerCards, playerCard);
        playerCards.push(this.centreCard);
        playerDom = playerCard.domElement;
        centreDom = this.centreCard.domElement;
        this.centreCard = playerCard;
        this.centreCard.domElement = centreDom;
        this.centreCard.SetContent();
        playerCards[1].domElement = playerDom;
        playerCards[1].SetContent();

        return playerCards;

    }

    SwapCard(cardId) {

        if (this.canMove) {//so that it knows which list to go through to find swapped cards
            this.playerCards = this.SetCards(cardId, this.playerCards);
        } else {
            this.opponentCard = this.SetCards(cardId, this.opponentCard);
        }

        this.centreCard.RotateCard();
    }

}//make an piece class with object dragging, then add either pawn or card to the piece class, write about it alot in CW