class Grid {
    constructor(container, canMove, item) {
        this.container = container;
        this.board = [-200, -100, 0, 100, 200];
        this.canMove = true;
        this.pawn = new Pawn(item);
    }// procedurally populate array


    move() {
        var board = this.board;
        var _pawn = this.pawn;
        var _canMove = this.canMove;


        this.container.addEventListener("mousedown", function (e) { _pawn.dragStart(e, _canMove); }, false);
        this.container.addEventListener("mouseup", function (e) { _pawn.dragEnd(e, board); }, false);
        this.container.addEventListener("mousemove", function (e) { _pawn.drag(e); }, false);

        this.container.addEventListener("touchstart", function (e) { _pawn.dragStart(e, _canMove); }, false);
        this.container.addEventListener("touchend", function (e) { _pawn.dragEnd(e, board); }, false);
        this.container.addEventListener("touchmove", function (e) { _pawn.drag(e); }, false);

    }

    

}