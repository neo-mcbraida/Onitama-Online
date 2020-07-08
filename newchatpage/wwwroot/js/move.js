"use strict"
 

var dragItem = document.querySelector("#item");
var this.domElement = document.querySelector("#this.domElement");






this.domElement.addEventListener("mousedown", dragStart, false);//for if mouse is being used
this.domElement.addEventListener("mouseup", dragEnd, false);
this.domElement.addEventListener("mousemove", drag, false);

this.domElement.addEventListener("touchstart", dragStart, false);//for if touchscreen is being used
this.domElement.addEventListener("touchend", dragEnd, false);
this.domElement.addEventListener("touchmove", drag, false);









//window.onload = function() {
//    var grid = new Image();
//    grid.src = '/assets/grid.png'
//    grid.onload = function () {
//        var canvas = document.getElementById("board");
//        var ctx = canvas.getContext('2d');
//        ctx.drawImage(grid, 20, 20);
//    }
//};