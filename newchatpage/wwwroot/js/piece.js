class Piece {
    constructor(_item, connection, id) {
        this.id = id;
        this.domElement = _item;
        this.active = false;
        this.connection = connection;
        this.top;
        this.left;           
        this.xIndexCur;//store index instead of coordinate
        this.yIndexCur;//so if window is reshaped, xpos in terms of pixels doesnt affect pos
        this.xIndexPrev;
        this.yIndexPrev;
        this.yOffset;
        this.xOffset;
        this.canMove = true; 
        this.container = '#board';
        
    }

    SetCoordinate(board) {
        this.top = parseInt(this.domElement.style.top, 10);//remove "px" from top and converts to int
        this.left = parseInt(this.domElement.style.left, 10);
        this.yIndexPrev = this.GetClosest(board, this.top);
        this.xIndexPrev = this.GetClosest(board, this.left);
    }

    setTranslate(xPos, yPos) {
        //moves dom element to coordinates specified
        this.domElement.style.left = (xPos.toString() + "px");
        this.domElement.style.top = (yPos.toString() + "px");
    }


    dragStart(e, container) {
        if (this.canMove) {
            this.Move(roomId, true);


            e.preventDefault();

            var deckOffset = $(container).offset();
            var _Yoffset = parseInt(this.domElement.style.top, 10)
            var _Xoffset = parseInt(this.domElement.style.left, 10)

            if (e.type === "touchstart") {
                this.yOffset = e.touches[0].pageY - (_Yoffset + deckOffset.top);
                this.xOffset = e.touches[0].pageX - (_Xoffset + deckOffset.left);
            } else {
                this.yOffset = e.pageY - (_Yoffset + deckOffset.top);
                this.xOffset = e.pageX - (_Xoffset + deckOffset.left);
            }

            console.log(this.yOffset);
            console.log(this.xOffset);
            //if object clicked on is this pawn
            if (e.target === this.domElement) {
                this.active = true;
            }
        }
    }


    drag(e, roomId, container) {
        //active = true if this pawn is the one being dragged
        if (this.active) {
            e.preventDefault();


            var offset = $(container).offset();

            if (e.type === "touchmove") {
                this.top = (e.touches[0].pageY - (this.yOffset + offset.top));
                this.left = (e.touches[0].pageX - (this.xOffset + offset.left));
                //mouse
            } else {
                this.top = (e.pageY - (this.yOffset + offset.top));// - 50;
                this.left = (e.pageX - (this.xOffset + offset.left));// - 50;
                //this.currentX = e.clientX - this.initialX;
                //this.currentY = e.clientY - this.initialY;

            }

            //runs method that sends coordinate of pawn to other clients
            this.Move(roomId, false);

            //moves the pawn across the screen to where mouse is
            this.setTranslate(this.left, this.top);
            //this.setTranslate(this.currentX, this.currentY, this.domElement);
        }


    }


    dragEnd(e, board) {

        //board is array of x/y coordinates
        if (this.active && board !== null) {

            //runs method that gets index of pawns closest x and y positions of the board
            this.xIndexCur = this.GetClosest(board, this.left);
            this.yIndexCur = this.GetClosest(board, this.top);

            //sets current x and y to positions to coordinates of space on board that pawn is closest to
            this.left = board[this.xIndexCur];
            this.top = board[this.yIndexCur];


            //if position of pawn has changed, then player has made a move, so;
            if (this.xIndexCur != this.xIndexPrev || this.yIndexCur != this.yIndexPrev) {
                this.xIndexPrev = this.xIndexCur;
                this.yIndexPrev = this.yIndexCur;
                //swap player turns
                this.SwapMove(roomId);
            }


            //runs method that moves pawn to closest space on board
            this.setTranslate(this.left, this.top, this.domElement);
            //sends coordinate of new position
            this.Move(roomId, false);
            this.active = false;

        }
    }



    GetClosest(positions, pos) {//find index of closest space on board 
        var closest;
        var index = -1;

        positions.forEach((e) => {
            var dif = Math.abs(e - pos);//makes result positive
            // if distance between current space is smaller
            //than previous closest space
            if (dif < closest || closest == null) {
                //update information about closest space
                closest = dif;
                index++;
            }
        })
        return index;
    }

    Move(roomId, dStart) {
        //invokes method that sends information about pawn being moved to other client
        this.connection.invoke("Move", this, roomId, dStart);
    }

    SwapMove(roomId) {
        //invokes method  that swaps player turn between players
        this.connection.invoke("SwapMove", roomId);
    }

    SetActive(domElement, id) {
        this.domElement = domElement;
        this.id = id;
    }
}

class Pawn extends Piece {
    constructor(domElement, connection, id, colour, type) {

        super(domElement, connection, id);
        this.colour = colour;//0 for red, 1 for blue
        this.type = type;//0 for normal, 1 for master
        //this.id = id;
        //this.domElement = _item;
        //this.active = false;
        //this.connection = connection;
        //this.top;
        //this.left;
        //this.xIndexCur;//store index instead of coordinate
        //this.yIndexCur;//so if window is reshaped, xpos in terms of pixels doesnt affect pos
        //this.xIndexPrev;
        //this.yIndexPrev;
        //this.canMove = true;
    }

    ShowSelf() {
        console.log(this);
    }

}

class Card extends Piece{
    constructor(xIndex, yIndex, colour, source, domElement, connection, id) {
        super(domElement, connection, id)
        this.xIndex = xIndex;
        this.yIndex = yIndex;
        this.colour = colour;//add colour attribute to Piece rather as cards and pawns have a colour
        this.source = source;
    }

    SetContent(domElement) {
        domElement.style.content = this.source;
    }

    SetActive(active) {
        console.log(active);
        active = this;
    }
}
