/// <reference path="grid.js" />
class Pawn {
    constructor(_item) {
        console.log(this.domPawn);
        this.domElement = _item;
        this.active = false;
        this.currentX;
        this.currentY;
        this.xOffset = 0;
        this.yOffset = 0;
    }



    setTranslate(xPos, yPos, el) {
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }//put this back in but idk why its not working


    drag(e) {
        if (this.active) {

            e.preventDefault();

            if (e.type === "touchmove") {
                this.currentX = e.touches[0].clientX - this.initialX;
                this.currentY = e.touches[0].clientY - this.initialY;
            } else {
                this.currentX = e.clientX - this.initialX;
                this.currentY = e.clientY - this.initialY;

                console.log(this.currentX, this.currentY);
            }

            //this.xOffset = this.currentX;
            //this.yOffset = this.currentY;


            this.setTranslate(this.currentX, this.currentY, this.domElement);
            //this.DOMelement.style.transform = "translate3d(" + this.currentX + "px, " + this.currentY + "px, 0)";
        }

    }

    dragStart(e) {


        console.log(this.domElement);
        if (e.type === "touchstart") {
            this.initialX = e.touches[0].clientX - this.xOffset;
            this.initialY = e.touches[0].clientY - this.yOffset;
        } else {
            this.initialX = e.clientX - this.xOffset;//client is mouse pos
            this.initialY = e.clientY - this.yOffset;
        }

        if (e.target === this.domElement) {
            this.active = true;
        }
    }



    dragEnd(e, board) {
        //this.xOffset = 0;
        //this.yOffset = 0;


        this.xIndex = this.GetClosest(board, this.currentX);
        this.yIndex = this.GetClosest(board, (this.currentY));

        this.currentX = board[this.xIndex];
        this.currentY = board[this.yIndex];

        this.setTranslate(this.currentX, this.currentY, this.domElement);

        this.initialX = this.currentX;
        this.initialY = this.currentY;
        this.xOffset = this.currentX;
        this.yOffset = this.currentY;
        //if (this.start == 1) {

        //    var x = this.initialX.GetClosest(this.board, this.initialX)
        //    var y = this.initialY.GetClosest(this.board, this.initialY)
        //    this.DOMelement.style.transform = "translate3d(" + this.boardx[x] + "px, " + this.board[y] + "px, 0)";
        //}

        this.active = false;
    }



    GetClosest(positions, pos) {//can use this for x and y coordinates
        var closest;
        var index = -1;

        positions.forEach((e) => {
            var dif = Math.abs(pos - e);
            if (dif < closest || closest == null) {
                closest = dif;
                index++;
            }
        })
        return index;
    }

}

