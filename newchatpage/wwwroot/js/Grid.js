class Grid {
    constructor(container, connection, roomId, canMove) {
        this.container = container;
        this.board = [0, 100, 200, 300, 400];
        this.roomId = roomId;
        this.connection = connection;
        this.p1 = new Pawn(document.querySelector("#item1"), connection, 1);
        this.p2 = new Pawn(document.querySelector("#item2"), connection, 2);
        this.p3 = new Pawn(document.querySelector("#item3"), connection, 3);
        this.p4 = new Pawn(document.querySelector("#item4"), connection, 4);
        this.p5 = new Pawn(document.querySelector("#item5"), connection, 5);

        this.p6 = new Pawn(document.querySelector("#item6"), connection, 6);
        this.p7 = new Pawn(document.querySelector("#item7"), connection, 7);
        this.p8 = new Pawn(document.querySelector("#item8"), connection, 8);
        this.p9 = new Pawn(document.querySelector("#item9"), connection, 9);
        this.p10 = new Pawn(document.querySelector("#item10"), connection, 10);

        this.player = [this.p1, this.p2, this.p3, this.p4, this.p5]


        this.opponent = [this.p6, this.p7, this.p8, this.p9, this.p10]

        this.activeItem = new Pawn(null, connection, 0);
        this.pIndex = 0;
        this.domElement;
    }

    SetPos() {
        for (var i = 0; i < this.board.length; i++) {
            this.player[i].initialX = this.board[i];
            this.player[i].initialY = -200;

            this.opponent[i].initialX = this.board[i];
            this.opponent[i].initialY = 200;
        }
    }

    Move() {
        //var a = this.active;
        //if it is players turn
        var pawns = this.player;
        var board = this.board;
        var activeItem = this.activeItem;
        var roomId = this.roomId;

        function DragStart(e) {
            pawns.forEach(function (i) {
                if (e.target == i.domElement) {
                    activeItem = i;
                    activeItem.domElement = i.domElement;
                }
            });
            activeItem.dragStart(e);
        };
        function Drag(e) {
            if (activeItem != null) {
                activeItem.drag(e, roomId);
            }
        };
        function DragEnd(e) {
            activeItem.dragEnd(e, board);
            activeItem = null;
        };

        //if (canMove === true) {
        //for mouse
        this.container.addEventListener("mousedown", DragStart, false);
        this.container.addEventListener("mouseup", DragEnd, false);
        this.container.addEventListener("mousemove", Drag, false);
        //for touchscreen
        this.container.addEventListener("touchstart", DragStart, false);
        this.container.addEventListener("touchend", DragEnd, false);
        this.container.addEventListener("touchmove", Drag, false);

        //if it is not players turn
        //} else if (canMove === false) {

        //    this.container.removeEventListener("mousedown", this.DragStart, false);
        //    this.container.removeEventListener("mouseup", this.DragEnd, false);
        //    this.container.removeEventListener("mousemove", this.Drag, false);

        //    this.container.removeEventListener("touchstart", this.DragStart, false);
        //    this.container.removeEventListener("touchend", this.DragEnd, false);
        //    this.container.removeEventListener("touchmove", this.Drag, false);

        //}
    }

    SetActive(_pawn) {
        var pawns = this.opponent;
        var i;
        for (i = 0; i < pawns.length; i++) {
            if (_pawn.id == pawns[i].id) {
                this.pIndex = i;
                break;
                // a.domElement = i.domElement;
            }

        }

        //player.forEach(function (i) {
        //});
    }

    MovePiece(_pawn) {
        //moving pawn to coordinates that other player has moved it to
        //  var i = this.pIndex;
        //var x = this.player;
        var pawn = this.opponent[this.pIndex];
        pawn.setTranslate(_pawn.left, _pawn.top);
        //updating pawn info to that of the other player
        pawn.currentX = _pawn.currentX;
        pawn.currentY = _pawn.currentY;
        pawn.xOffset = _pawn.xOffset;;
        pawn.yOffset = _pawn.yOffset;
        pawn.xIndexCur = _pawn.xIndexCur;
        pawn.yIndexCur = _pawn.yIndexCur;
        pawn.xIndexPrev = _pawn.xIndexPrev;
        pawn.yIndexPrev = _pawn.yIndexPrev;
        pawn.left = _pawn.left;
        pawn.top = _pawn.top;



        //!only change pos of dom element untile move is complete dont bother with the other pawn objects
    }
}