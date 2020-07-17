"use strict";
class Grid {
    constructor(container, pawn, connection, roomId) {
        this.container = container
        this.board = [-200, -100, 0, 100, 200]
        this.roomId = roomId
        this.connection = connection
        this.pawn = pawn
        this.DragStart = function(e) {
            pawn.dragStart(e);
        }
        this.Drag = function(e) {
            pawn.drag(e, roomId);
        }
        this.DragEnd = function(e) {
            pawn.dragEnd(e, [-200, -100, 0, 100, 200]);
        }

        //this.pawn.onDrag = new function (e) {

        //}

    }// procedurally populate array

    //EndMove() {
    //    var board = this.board;
    //    var _pawn = this.pawn;
    //    var roomId = this.roomId

    //    function DragStart(e) {
    //        _pawn.dragStart(e);
    //    }

    //    function Drag(e) {
    //        _pawn.drag(e, roomId);
    //    }

    //    function DragEnd(e) {
    //        _pawn.dragEnd(e, board);
    //    }



    //}

    Move(canMove) {
        var board = this.board;
        var _pawn = this.pawn;
        var roomId = this.roomId

        //function DragStart(e){
        //    _pawn.dragStart(e);
        //}

        //function Drag(e) {
        //    _pawn.drag(e, roomId);
        //}

        //function DragEnd(e) {
        //    _pawn.dragEnd(e, board);
        //}

        if (canMove === true) {
            this.container.addEventListener("mousedown", this.DragStart, false);
            this.container.addEventListener("mouseup", this.DragEnd, false);
            this.container.addEventListener("mousemove", this.Drag, false);

            this.container.addEventListener("touchstart", this.DragStart, false);
            this.container.addEventListener("touchend", this.DragEnd, false);
            this.container.addEventListener("touchmove", this.Drag, false);
        } else if (canMove === false) {
            //this.container.removeEventListener("mousedown", DragStart, false);
            //this.EndMove();


            this.container.removeEventListener("mousedown", this.DragStart, false);
            this.container.removeEventListener("mouseup", this.DragEnd, false);
            this.container.removeEventListener("mousemove", this.Drag, false);

            this.container.removeEventListener("touchstart", this.DragStart, false);
            this.container.removeEventListener("touchend", this.DragEnd, false);
            this.container.removeEventListener("touchmove", this.Drag, false);
            
        }
    }

    MovePiece(_pawn) {
        this.pawn.setTranslate(_pawn.currentX, _pawn.currentY, this.pawn.domElement);
        var i = this.pawn.domElement;
        this.pawn.currentX = _pawn.currentX;
        this.pawn.currentY = _pawn.currentY;
        this.pawn.xOffset = _pawn.xOffset;;
        this.pawn.yOffset = _pawn.yOffset;
        this.pawn.xIndexCur = _pawn.xIndexCur;
        this.pawn.yIndexCur = _pawn.yIndexCur;
        this.pawn.xIndexPrev = _pawn.xIndexPrev;
        this.pawn.yIndexPrev = _pawn.yIndexPrev;
        //this.pawn.domElement = i;
        //this.pawn = _pawn;
    }
}