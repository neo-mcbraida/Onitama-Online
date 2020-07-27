class Pawn {
    constructor(_item, connection, id) {
        this.id = id;
        this.domElement = _item;
        this.active = false;
        this.currentX;// this is what is causing issues with relative pos
        this.currentY;// procedurally instantiate these at start
        this.connection = connection;
        this.xOffset = 0;
        this.yOffset = 0;
        this.top = 0;
        this.left = 0;
        this.xIndexCur = 2;//store index instead of coordinate
        this.yIndexCur = 2;//so if window is reshaped, xpos in terms of pixels doesnt affect pos
        this.xIndexPrev = 2;
        this.yIndexPrev = 2;
        this.canMove = true;
    }



    setTranslate(xPos, yPos) {
        //moves dom element to coordinates specified
        this.domElement.style.left = (xPos.toString() + "px");
        this.domElement.style.top = (yPos.toString() + "px");
        //this.domElement.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }


    dragStart(e) {
        if (this.canMove === true) {
            //if event is touchscreen
            //var i = container.offset().left;
            var offset = $('#container').offset();
            //console.log(i);
            this.Move(roomId, true);
            if (e.type === "touchstart") {
                this.initialX = e.touches[0].clientX - offset.top;
                this.initialY = e.touches[0].clientY - offset.left;
                //if event is mouseclick
            } else {
                this.top = (e.clientY - offset.top) - 50;
                this.left = (e.clientX - offset.left) - 50;
                //this.initialX = e.clientX - this.xOffset;//e.clientx/y is mouse pos
                //this.initialY = e.clientY - this.yOffset;
            }

            //if object clicked on is this pawn
            if (e.target === this.domElement) {
                this.active = true;
            }
        }
    }


    drag(e, roomId) {

        //active = true if this pawn is the one being dragged
        if (this.active) {
            e.preventDefault();

            var offset = $('#container').offset();
            //touchscreen
            if (e.type === "touchmove") {
                this.currentX = e.touches[0].clientX - this.initialX;
                this.currentY = e.touches[0].clientY - this.initialY;
                //mouse
            } else {
                this.top = (e.pageY - offset.top) - 50;
                this.left = (e.pageX - offset.left) - 50;
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
        if (this.active) {

            //runs method that gets index of pawns closest x and y positions of the board
            this.xIndexCur = this.GetClosest(board, this.left);
            this.yIndexCur = this.GetClosest(board, this.top);

            //sets current x and y to positions to coordinates of space on board that pawn is closest to
            this.left = board[this.xIndexCur];
            this.top = board[this.yIndexCur];

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
