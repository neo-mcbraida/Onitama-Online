"use strict";
class Grid {
    constructor(container, pawn, connection, roomId) {
        this.container = container
        this.board = [-200, -100, 0, 100, 200]
        this.roomId = roomId
        this.connection = connection
        this.pawn = pawn

        //put these methods in the constructor, so that event listeners can add and remove them
        this.DragStart = function(e) {
            pawn.dragStart(e);
        }
        this.Drag = function(e) {
            pawn.drag(e, roomId);
        }
        this.DragEnd = function(e) {
            pawn.dragEnd(e, [-200, -100, 0, 100, 200]);
        }
    }


    Move(canMove) {

        //if it is players turn
        if (canMove === true) {
            //for mouse
            this.container.addEventListener("mousedown", this.DragStart, false);
            this.container.addEventListener("mouseup", this.DragEnd, false);
            this.container.addEventListener("mousemove", this.Drag, false);
            //for touchscreen
            this.container.addEventListener("touchstart", this.DragStart, false);
            this.container.addEventListener("touchend", this.DragEnd, false);
            this.container.addEventListener("touchmove", this.Drag, false);

        //if it is not players turn
        } else if (canMove === false) {

            this.container.removeEventListener("mousedown", this.DragStart, false);
            this.container.removeEventListener("mouseup", this.DragEnd, false);
            this.container.removeEventListener("mousemove", this.Drag, false);

            this.container.removeEventListener("touchstart", this.DragStart, false);
            this.container.removeEventListener("touchend", this.DragEnd, false);
            this.container.removeEventListener("touchmove", this.Drag, false);
            
        }
    }

    MovePiece(_pawn) {
        //moving pawn to coordinates that other player has moved it to
        this.pawn.setTranslate(_pawn.currentX, _pawn.currentY, this.pawn.domElement);
        //updating pawn info to that of the other player
        this.pawn.currentX = _pawn.currentX;
        this.pawn.currentY = _pawn.currentY;
        this.pawn.xOffset = _pawn.xOffset;;
        this.pawn.yOffset = _pawn.yOffset;
        this.pawn.xIndexCur = _pawn.xIndexCur;
        this.pawn.yIndexCur = _pawn.yIndexCur;
        this.pawn.xIndexPrev = _pawn.xIndexPrev;
        this.pawn.yIndexPrev = _pawn.yIndexPrev;
    }
}