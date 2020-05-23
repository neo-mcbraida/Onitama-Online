"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

const urlParams = new URLSearchParams(window.location.search);
const gameid = urlParams.get('myquery');
var joined = true;
//Disable send button until connection is established
//document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {
    connection.invoke("joinRoom", gameid).catch(function (err) {
    return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message, gameid).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});


