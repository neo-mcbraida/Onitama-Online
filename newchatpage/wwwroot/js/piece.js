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
        this.xPrev;
        this.yPrev;
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
        this.yIndexCur = this.yIndexPrev;
        this.xIndexCur = this.xIndexPrev;
    }

    setTranslate(xPos, yPos) {
        //moves dom element to coordinates specified
        this.domElement.style.left = (xPos.toString() + "px");
        this.domElement.style.top = (yPos.toString() + "px");
    }


    dragStart(e, container, xIndex, yIndex, players) {
        if (this.canMove) {

            if (xIndex != null && yIndex != null) {
                this.xIndex = xIndex;
                this.yIndex = yIndex;
                this.highlightPos(players);
                console.log(xIndex);
                console.log(yIndex);

            }
            this.Move(roomId, true);

            this.xPrev = parseInt(this.domElement.style.left, 10);
            this.yPrev = parseInt(this.domElement.style.top, 10);

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
                this.top = (e.pageY - (this.yOffset + offset.top));
                this.left = (e.pageX - (this.xOffset + offset.left));
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
        this.possiblePos = [];
        //this.possibleX = [];
        //this.possibleY = [];
        this.xIndex;
        this.yIndex;
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

    highlightPos(players) {
        var grid = [0, 100, 200, 300, 400];
        for (var i = 0; i < this.xIndex.length; i++) {

            var xIn = this.xIndexPrev + this.xIndex[i];
            var yIn = this.yIndexPrev + this.yIndex[i]
            if (this.PosFree(players, xIn, yIn)) {// if index is out of range of positions on board
                var div = document.createElement('div');
                document.querySelector(this.container).appendChild(div);
                div.style.left = grid[xIn].toString() + "px";
                div.style.top = grid[yIn].toString() + "px";
                div.className = 'placeHolder';
                var pos = new Position(div, xIn, yIn);
                this.possiblePos.push(pos);
            }
        }
    }

    PosFree(players, xIn, yIn) {
        if (xIn > -1 && yIn > -1 && xIn < 5 && yIn < 5) {
            for (var i = 0; i < players.length; i++) {// foreach pos iterate through player, not for each player iterate throgh each pos.
                if (players[i].xIndexCur !== xIn && players[i].yIndex !== yIn) {
                    return true;
                } else { return false;}
            }

        } else { return false;}
    }

    RemoveHighlight() {
        var container = document.querySelector(this.container);//more efficient as it does not have to redefine container for each pos
        this.possiblePos.forEach(function (i) {
            container.removeChild(i.domElement);
        });
        this.possiblePos = [];
    }

    CanMove() {
        var possible = false
        for (var i = 0; i < this.possiblePos.length; i++) {
            if (this.possiblePos[i].xIndex === this.xIndexCur && this.possiblePos[i].yIndex === this.yIndexCur) {
                possible = true;
                break;
            }
        }
        return possible;
    }

    dragEnd(e, board) {

        //board is array of x/y coordinates
        if (this.active) {// i removed board !== null because i forgot what it did, itll probably be fine.


            this.xIndexCur = this.GetClosest(board, this.left);
            this.yIndexCur = this.GetClosest(board, this.top);

            

            //if position of pawn has changed, then player has made a move, so;
            if (this.CanMove()/*this.xIndexCur != this.xIndexPrev || this.yIndexCur != this.yIndexPrev*/) {
                this.xIndexPrev = this.xIndexCur;
                this.yIndexPrev = this.yIndexCur;
                //swap player turns
                this.SwapMove(roomId);
            } else {
                this.xIndexCur = this.xIndexPrev;
                this.yIndexCur = this.yIndexPrev;
            }

            //sets current x and y to positions to coordinates of space on board that pawn is closest to
            this.left = board[this.xIndexCur];
            this.top = board[this.yIndexCur];



            this.setTranslate(this.left, this.top, this.domElement);

            this.RemoveHighlight();
            //runs method that moves pawn to closest space on board
            //sends coordinate of new position
            this.Move(roomId, false);
            this.active = false;

        }
    }

}

class Card extends Piece{
    //this.deck = [100, 250, 400];
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

    dragEnd(cardSpace) {

        if (this.active) {// i removed board !== null because i forgot what it did, itll probably be fine.

            var deck = [100, 250, 400];//deck is array of y coordinates for card spaces
            this.yIndexCur = this.GetClosest(deck, this.top);
            

            if (cardSpace === this.yIndexCur) {
                //sets current x and y to positions to coordinates of space on board that pawn is closest to
                this.top = deck[this.yIndexCur];
                cardSpace = this.GetClosest(deck, this.yPrev);
                this.yPrev = this.top;

            } else {
                this.yIndexCur = this.GetClosest(deck, this.yPrev);
                this.top = this.yPrev

            }
            this.left = 0;
            this.setTranslate(this.left, this.top, this.domElement);

            //if position of pawn has changed, then player has made a move, so;
            if (this.yIndexCur != this.yIndexPrev) {
                this.yIndexPrev = this.yIndexCur;

            }


            //runs method that moves pawn to closest space on board
            //sends coordinate of new position
            this.Move(roomId, false);
            this.active = false;

            return (cardSpace);

        }

    }

}
