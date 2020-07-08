"use strict";

var dragItem = document.querySelector("#item");
var container = document.querySelector("#container");



var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
//starts connection between browser and server

window.onload = function () {
    var game = new Game(container, dragItem);
    game.start();

};



const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('roomId');
const userName = urlParams.get('userName');
//these two lines get the roomId query that is in the URL
//Disable send button until connection is established
//document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (userName, message) {//this adds any new message revieved to ordered list for each client
    //converts specific symbols into format that html can output, and protects from script Injection
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = userName + ": " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {//this runs the function in ChatHub called join room after the connection is established
    connection.invoke("joinRoom", roomId).catch(function (err) {//and passes roomId as an argument
    return console.error(err.toString());
    });
    event.preventDefault();
});

//wire up event handler to send message to hub when send button clicked
document.getElementById("sendButton").addEventListener("click", function (event) {
    var message = document.getElementById("messageInput").value;
    //runs function 'SendMessage' with given aguments
    connection.invoke("SendMessage", userName, message, roomId).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});


