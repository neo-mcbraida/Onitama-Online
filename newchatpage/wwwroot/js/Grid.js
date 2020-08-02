class Grid {
    constructor(container, connection, roomId, canMove) {
        this.container = container;
        this.opponentDeck;
        this.playerDeck;
        this.board = [0, 100, 200, 300, 400];

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

        this.c1 = new Card([-1, 1, 0], [-1, 1, 2], 0, 'url("/assets/bat.jpg")', document.querySelector("#card1"), connection, 1);
        this.c2 = new Card([1, -1, -1, 1], [-2, -1, 1, 2], 1, 'url("/assets/bison.jpg")', document.querySelector("#card2"), connection, 2);
        this.c3 = new Card([-1, 1, 0], [0, 0, 1], 0, 'url("/assets/bear.jpg")', document.querySelector("#card3"), connection, 3);
        this.c4 = new Card([0, 1, 0], [-2, 0, 2], 1, 'url("/assets/crawler.jpg")', document.querySelector("#card4"), connection, 4);
        this.c5 = new Card([0, 1, 0], [-1, 0, 1], 1, 'url("/assets/cow.jpg")', document.querySelector("#card5"), connection, 5);

        //this.c1 = new Card([-1, 1, 0], [-1, 1, 2], document.querySelector("#card1"), 0, 'url("/assets/bat.jpg")');//0 = red, 1 = blue
        //this.c2 = new Card([1, -1, -1, 1], [-2, -1, 1, 2], document.querySelector("#card2"), 1, 'url("/assets/bison.jpg")');
        //this.c3 = new Card([-1, 1, 0], [0, 0, 1], document.querySelector("#card3"), 0, 'url("/assets/bear.jpg")');
        //this.c4 = new Card([0, 1, 0], [-2, 0, 2], document.querySelector("#card4"), 1, 'url("/assets/crawler.jpg")');
        //this.c5 = new Card([0, 1, 0], [-1, 0, 1], document.querySelector("#card5"), 1, 'url("/assets/cow.jpg")');

        this.centreCard = this.c3;

        this.selectedCard = new Card();
        
        this.playerCard = [this.c1, this.c2];
        this.opponentCard = [this.c4, this.c5];

        this.player = [this.p1, this.p2, this.p3, this.p4, this.p5]
        this.opponent = [this.p6, this.p7, this.p8, this.p9, this.p10]
        this.canMove = true;

        this.activeItem = new Piece(null, connection, 0);
        this.pIndex = 0;
        this.domElement;
    }

    //PopulatePawns() {
    //    for (var i = 0; i < 5; i++) {
    //        if (i != 2) {
    //            this.player[i].piece = new Pawn(0, 0);
    //            this.opponent[i].piece = new Pawn(1, 0);
    //        } else {

    //            this.player[i].piece = new Pawn(0, 1);
    //            this.opponent[i].piece = new Pawn(1, 1);
    //        }
    //    }
    //}

    //PopulateCards() {
    //    this.c1.piece = new Card([-1, 1, 0], [-1, 1, 2],  0, 'url("/assets/bat.jpg")');// = new Card([-1, 1, 0], [-1, 1, 2], document.querySelector("#card1"), 0, 'url("/assets/bat.jpg")');//0 = red, 1 = blue
    //    this.c2.piece = new Card([1, -1, -1, 1], [-2, -1, 1, 2],  1, 'url("/assets/bison.jpg")');
    //    this.c3.piece = new Card([-1, 1, 0], [0, 0, 1], 0, 'url("/assets/bear.jpg")');
    //    this.c4.piece = new Card([0, 1, 0], [-2, 0, 2], 1, 'url("/assets/crawler.jpg")');
    //    this.c5.piece = new Card([0, 1, 0], [-1, 0, 1], 1, 'url("/assets/cow.jpg")');

    //}


    Start() {



        //if it is players turn
        var cards = this.playerCard;
        var pawns = this.player;
        var board = this.board;
        var activeItem = this.activeItem;
        var roomId = this.roomId;
        var container = this.container;
        var deck = this.playerDeck;

        for (var i = 0; i < 2; i++) {
            var playcard = this.playerCard[i];
            playcard.SetContent(playcard.domElement);
            playcard.container = "#" + this.playerDeck.id;
            //this.playerCard[i].addEventListener("click", function (e) { this.playerCard[i].SetActive(this.selectedCard);}, false);
            var opcard = this.opponentCard[i];
            opcard.SetContent(opcard.domElement);
            opcard.container = "#" + this.opponentDeck.id;
            //this.opponentCard[i].addEventListener("click", function (e) { this.playerCard[i].SetActive(this.opponentCard); }, false);
        }


        //this.centreCard[i].addEventListener("click", function (e) { this.playerCard[i].SetActive(this.centreCard); }, false);

        for (var i = 0; i < 5; i++) {
            pawns[i].SetCoordinate(board);
            this.opponent[i].SetCoordinate(board);
        }

        function DragStart(e) {
            pawns.forEach(function (i) {
                if (e.target == i.domElement) {
                    activeItem = i;
                    activeItem.dragStart(e, container);
                }
            });
        };
        function Drag(e) {
            if (e != null) {
                if (activeItem != null) {
                    activeItem.drag(e, roomId, container);
                }
            }
        };
        function DragEnd(e) {
            if (activeItem != null) {
                activeItem.dragEnd(e, board);
                activeItem = null;
            }
        };

        //for mouse
        this.container.addEventListener("mousedown", DragStart, false);
        this.container.addEventListener("mouseup", DragEnd, false);
        this.container.addEventListener("mousemove", Drag, false);
        //for touchscreen
        this.container.addEventListener("touchstart", DragStart, false);
        this.container.addEventListener("touchend", DragEnd, false);
        this.container.addEventListener("touchmove", Drag, false);

        function CardStart(e) {
            cards.forEach(function (i) {
                if (e.target == i.domElement) {
                    activeItem = i;
                    activeItem.dragStart(e, deck);
                }
            });
        };
        function CardDrag(e) {
            if (e != null) {
                if (activeItem != null) {
                    activeItem.drag(e, roomId, deck);
                }
            }
        };
        function CardEnd(e) {
            if (activeItem != null) {
                activeItem.dragEnd(e, null);
                activeItem = null;
            }
        };



        //for mouse
        this.playerDeck.addEventListener("mousedown", CardStart, false);
        this.playerDeck.addEventListener("mouseup", CardEnd, false);
        this.playerDeck.addEventListener("mousemove", CardDrag, false);
        //for touchscreen
        this.playerDeck.addEventListener("touchstart", CardStart, false);
        this.playerDeck.addEventListener("touchend", CardEnd, false);
        this.playerDeck.addEventListener("touchmove", CardDrag, false);


    }

    SetActive(_pawn) {
        var pawns = this.opponent;
        var i;
        for (i = 0; i < pawns.length; i++) {
            if (_pawn.id == pawns[i].id) {
                this.pIndex = i;
                break;
            }

        }
    }

    MovePiece(_pawn) {
        //moving pawn to coordinates that other player has moved it to
        //  var i = this.pIndex;
        //var x = this.player;
        var pawn = this.opponent[this.pIndex];
        pawn.setTranslate(_pawn.left, _pawn.top);
        //updating pawn info to that of the other player
        pawn.xIndexCur = _pawn.xIndexCur;
        pawn.yIndexCur = _pawn.yIndexCur;
        pawn.left = _pawn.left;
        pawn.top = _pawn.top;



        //!only change pos of dom element untile move is complete dont bother with the other pawn objects
    }
}//make an piece class with object dragging, then add either pawn or card to the piece class, write about it alot in CW