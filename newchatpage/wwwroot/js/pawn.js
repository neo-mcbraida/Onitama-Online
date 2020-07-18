class Pawn {
    constructor(_item, connection) {
        this.domElement = _item;
        this.active = false;
        this.currentX;
        this.currentY;
        this.connection = connection;
        this.xOffset = 0;
        this.yOffset = 0;
        this.xIndexCur = 2;//store index instead of coordinate
        this.yIndexCur = 2;//so if window is reshaped, xpos in terms of pixels doesnt affect pos
        this.xIndexPrev = 2;
        this.yIndexPrev = 2;
    }



    setTranslate(xPos, yPos, el) {
        //moves dom element to coordinates specified
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }


    dragStart(e) {

        //if event is touchscreen
        if (e.type === "touchstart") {
            this.initialX = e.touches[0].clientX - this.xOffset;
            this.initialY = e.touches[0].clientY - this.yOffset;
        //if event is mouseclick
        } else {
            this.initialX = e.clientX - this.xOffset;//e.clientx/y is mouse pos
            this.initialY = e.clientY - this.yOffset;
        }

        //if object clicked on is this pawn
        if (e.target === this.domElement) {
            this.active = true;
        }

    }


    drag(e, roomId) {

        //active = true if this pawn is the one being dragged
        if (this.active) {
            e.preventDefault();
            //touchscreen
            if (e.type === "touchmove") {
                this.currentX = e.touches[0].clientX - this.initialX;
                this.currentY = e.touches[0].clientY - this.initialY;
            //mouse
            } else {
                this.currentX = e.clientX - this.initialX;
                this.currentY = e.clientY - this.initialY;

            }

            //runs method that sends coordinate of pawn to other clients
            this.SendCoordinate(roomId);

            //moves the pawn across the screen to where mouse is
            this.setTranslate(this.currentX, this.currentY, this.domElement);
        }


    }


    dragEnd(e, board) {

        //board is array of x/y coordinates
        if (this.active) {

            //runs method that gets index of pawns closest x and y positions of the board
            this.xIndexCur = this.GetClosest(board, this.currentX);
            this.yIndexCur = this.GetClosest(board, (this.currentY));

            //sets current x and y to positions to coordinates of space on board that pawn is closest to
            this.currentX = board[this.xIndexCur];
            this.currentY = board[this.yIndexCur];

            
            //runs method that moves pawn to closest space on board
            this.setTranslate(this.currentX, this.currentY, this.domElement);


            this.initialX = this.currentX;
            this.initialY = this.currentY;
            this.xOffset = this.currentX;
            this.yOffset = this.currentY;

            //if position of pawn has changed, then player has made a move, so;
            if (this.xIndexCur != this.xIndexPrev || this.yIndexCur != this.yIndexPrev) {
                this.xIndexPrev = this.xIndexCur;
                this.yIndexPrev = this.yIndexCur;
                //swap player turns
                this.SwapMove(roomId);
            }

            //sends coordinate of new position
            this.SendCoordinate(roomId);
            this.active = false;
            
        }
    }



    GetClosest(positions, pos) {//find index of closest space on board 
        var closest;
        var index = -1;

        positions.forEach((e) => {
            var dif = Math.abs(pos - e);//makes result positive
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

    SendCoordinate(roomId) {
        //invokes method that sends information about pawn being moved to other client
        this.connection.invoke("SendCoordinate", this, roomId);
    }

    SwapMove(roomId) {
        //invokes method  that swaps player turn between players
        this.connection.invoke("SwapMove", roomId);
    }
}

