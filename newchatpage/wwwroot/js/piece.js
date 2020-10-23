class Piece {
    constructor(connection, id, _item) {
        this.id = id;
        this.domElement = _item;
        this.active = false;
        this.connection = connection;
        this.container = '#board';
    }
    
}

class Pawn extends Piece {
    constructor(domElement, connection, id, colour, type) {

        super(connection, id, domElement);
        this.colour = colour;//1 for red, 0 for blue
        this.type = type;//0 for normal, 1 for master
        this.xIndex;
        this.yIndex;
        this.top;
        this.left;           
        this.xIndexCur;//store index instead of coordinate
        this.yIndexCur;//so if window is reshaped, xpos in terms of pixels doesnt affect pos
        this.canMove = true; 
        //this.opDoor = opponentDoor;
    }

    setTranslate(xPos, yPos) {
        //moves dom element to coordinates specified
        this.domElement.style.left = (xPos.toString() + "px");
        this.domElement.style.top = (yPos.toString() + "px");
    }

}

class PlayerPawn extends Pawn{
    constructor(domElement, connection, id, colour, type) {
        super(domElement, connection, id, colour, type)
        this.xIndexPrev;
        this.yIndexPrev;
        this.xPrev;
        this.yPrev;
        this.yOffset;
        this.xOffset;
        this.possiblePos = [];
    }

    Move(roomId, dStart) {
        //invokes method that sends information about pawn being moved to other client
        this.connection.invoke("Move", this, roomId, dStart);
    }

    SwapMove(roomId, pawnId, cardId, player) {
        //invokes method  that swaps player turn between players
        var won = this.WinningMove(pawnId);
        if (won) {
            this.connection.invoke("EndGame", roomId, pawnId, player)
        } else {
            this.connection.invoke("SwapMove", roomId, pawnId, cardId, null);
        }
    }

    SetActive(domElement, id) {
        this.domElement = domElement;
        this.id = id;
    }

    SetCoordinate(board) {
        this.top = parseInt(this.domElement.style.top, 10);//remove "px" from top and converts to int
        this.left = parseInt(this.domElement.style.left, 10);
        this.yIndexPrev = this.GetClosest(board, this.top);
        this.xIndexPrev = this.GetClosest(board, this.left);
        this.yIndexCur = this.yIndexPrev;
        this.xIndexCur = this.xIndexPrev;

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

    highlightPos(players) {
        var grid = [0, 70, 140, 210, 280];
        for (var i = 0; i < this.xIndex.length; i++) {

            var xIn = this.xIndexPrev + this.xIndex[i];
            var yIn = this.yIndexPrev + this.yIndex[i];
            if (this.TileFree(players, xIn, yIn) === null) {// if index is out of range of positions on board
                var div = document.createElement('div');//add highlighted square of possible position to board
                document.querySelector(this.container).appendChild(div);
                div.style.left = grid[xIn].toString() + "px";
                div.style.top = grid[yIn].toString() + "px";
                div.className = 'placeHolder';
                var pos = new Position(div, xIn, yIn);//instantiates instance of position class for possible position
                this.possiblePos.push(pos);
            }
        }
    }

    PosFree(pawns, xIn, yIn) {
        var canMove = false;
        for (let i = 0; i < xIn.length; i++) {//for each position, is that position available, 
            var xIndex = xIn[i];//if available, break and return true
            var yIndex = yIn[i];
            if (this.TileFree(pawns, xIndex, yIndex) === null) {
                canMove = true;
                break;
            }
        }
        return canMove;
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

    dragStart(e, container, xIndex, yIndex, players) {
        if (this.canMove) {

            this.domElement.style.zIndex = 2;

            if (xIndex != null && yIndex != null) {
                this.xIndex = xIndex;
                this.yIndex = yIndex;
                this.highlightPos(players);//highlights possible moves for selected pawn and card
            }
            this.Move(roomId, true);

            this.xPrev = parseInt(this.domElement.style.left, 10);
            this.yPrev = parseInt(this.domElement.style.top, 10);

            e.preventDefault();

            var deckOffset = $(container).offset();
            var _Yoffset = parseInt(this.domElement.style.top, 10)//finds offset of pawn before it is moved
            var _Xoffset = parseInt(this.domElement.style.left, 10)
            //finds starting coordinates of pawn before it is moved
            if (e.type === "touchstart") {//for touchscreen
                this.yOffset = e.touches[0].pageY - (_Yoffset + deckOffset.top);
                this.xOffset = e.touches[0].pageX - (_Xoffset + deckOffset.left);
            } else {//for mouse
                this.yOffset = e.pageY - (_Yoffset + deckOffset.top);
                this.xOffset = e.pageX - (_Xoffset + deckOffset.left);
            }

            //if object clicked on is this pawn
            if (e.target === this.domElement) {
                this.active = true;
            }
        }
    }

    WinningMove(pawnId) {
        //goes through all parameters required for game to be won, if any are met, return true
        if (this.xIndexCur === 4 && this.yIndexCur === 2) {
            if (this.id === 3) {
                return true;
            }
        } else if (this.xIndexCur === 0 && this.yIndexCur === 2) {
            if (this.id === 8) {
                return true;
            }
        } else if (pawnId === 3 || pawnId === 8) {
            return true;
        } else { return false; }
    }

    TileFree(pawns, xIn, yIn) {
        var free = true;
        var pawnId;
        if (xIn > -1 && yIn > -1 && xIn < 5 && yIn < 5) {
            for (var i = 0; i < pawns.length; i++) {// foreach pos iterate through pawn, not for each pawn iterate throgh each pos.
                if (pawns[i].xIndexCur === xIn && pawns[i].yIndexCur === yIn) {
                    free = false
                    pawnId = pawns[i].id;
                    break;
                }
            }
        } else { free = false; }

        if (free) { return null; } else { return pawnId; }

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

    dragEnd(board, opponent, card, player) {

        //board is array of x/y coordinates
        if (this.active) {// i removed board !== null because i forgot what it did, itll probably be fine.

            this.xIndexCur = this.GetClosest(board, this.left);
            this.yIndexCur = this.GetClosest(board, this.top);

            //if position of pawn has changed, then player has made a move, so;
            if (this.CanMove()) {
                this.xIndexPrev = this.xIndexCur;
                this.yIndexPrev = this.yIndexCur;
                //returns Id of opponent pawn, if it is getting taken
                var pawnId = this.TileFree(opponent, this.xIndexCur, this.yIndexCur);
                //swap player turns
                this.SwapMove(roomId, pawnId, card.id, player);
                card.RemoveHighlight();
            } else {
                this.xIndexCur = this.xIndexPrev;
                this.yIndexCur = this.yIndexPrev;
            }

            //sets current x and y to positions to coordinates of space on board that pawn is closest to
            this.left = board[this.xIndexCur];
            this.top = board[this.yIndexCur];

            this.setTranslate(this.left, this.top, this.domElement);
            this.domElement.style.zIndex = 1;

            this.RemoveHighlight();
            //runs method that moves pawn to closest space on board
            //sends coordinate of new position
            this.Move(roomId, false);
            this.active = false;

        }
    }

}

class Card extends Piece{
    constructor(xIndex, yIndex, colour, source, connection, id) {
        super(connection, id)
        this.xIndex = xIndex;
        this.yIndex = yIndex;
        this.colour = colour;//1 for red, 0 for blue
        this.source = source;
        this.highlight;
    }

    RotateCard() {
        //rotates indexes of the card instance
        for (var i = 0; i < this.xIndex.length; i++) {
            this.xIndex[i] = this.xIndex[i] * -1;
            this.yIndex[i] = this.yIndex[i] * -1;
        }
    }

    SetContent() {
        //sets image to card div
        this.domElement.style.content = this.source;
    }


    SetActive(active) {
        //sets card as active
        console.log(active);
        active = this;
    }

    Highlight() {
        //gives border to card when selected
        this.domElement.style.border = "thick solid #ffe667";
    }

    RemoveHighlight() {
        //removes border of card
        this.domElement.style.border = "none";
    }

}
