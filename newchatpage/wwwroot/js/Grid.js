class Grid {
    constructor(container) {
        this.container = container;
        this.board = [50, 150, 250, 350, 450];
    }// procedurally populate array


    move(piece) {
        this.container.addEventListener("mousedown", function (e) {//for if mouse is being used
            piece.dragStart(e); }, false);
        this.container.addEventListener("mouseup", function (e) {
            piece.dragEnd(e); }, false);
        this.container.addEventListener("mousemove", function (e) {
            piece.drag(e); }, false);

        this.container.addEventListener("touchstart", function (e) {//for if touchscreen is being used
            piece.dragStart(e); }, false);
        this.container.addEventListener("touchend", function (e) {
            piece.dragEnd(e); }, false);
        this.container.addEventListener("touchmove", function (e) {
            piece.drag(e); }, false);
    }



    

}